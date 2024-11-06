import React, { useState, useEffect, useRef } from "react";
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";
import axios from "axios";
import { User } from "../../../context/Context";
import { BaseUser } from "../../../interfaces/BaseUser.interface";
import UserService from "../../../services/user.service";
import MessageService from "../../../services/message.service";
import { MessageSimpleDTO } from "../../../interfaces/Message.interface";
import { MessageDetails } from "../../../interfaces/MessageDetails.interface";
import styles from "./Chat.module.scss";
import { FaPaperPlane } from "react-icons/fa6";

interface ChatProps {
  user: User | null;
}

function Chat({ user }: ChatProps) {
  const [receiverId, setReceiverId] = useState<number | null>(null);
  const [message, setMessage] = useState<string>("");
  const [messages, setMessages] = useState<MessageDetails[]>([]);
  const stompClient = useRef<Client | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<BaseUser[]>([]);

  const [messagesDictionary, setMessagesDictionary] = useState<{
    [key: number]: { message: MessageSimpleDTO; user: BaseUser }[];
  }>({});

  useEffect(() => {
    if (searchQuery.trim()) {
      const timeoutId = setTimeout(() => {
        UserService.searchUsers(searchQuery)
          .then((data) => setSearchResults(data))
          .catch((error) =>
            console.error("Error fetching search results:", error)
          );
      }, 300); 

      return () => clearTimeout(timeoutId);
    } else {
      setSearchResults([]);
    }
  }, [searchQuery]);

  const getConversations = async () => {
    try {
      const userId = user?.id;
      const response = await MessageService.getAllConversation(user?.id ?? -1);
      const messages = response.data; 

      const messagesDictionary: {
        [key: number]: { message: MessageSimpleDTO; user: BaseUser }[];
      } = {};

      for (const message of messages) {
        const otherUserId =
          message.senderId === userId ? message.receiverId : message.senderId;

          if (otherUserId !== userId) {
          if (!messagesDictionary[otherUserId]) {
            messagesDictionary[otherUserId] = [];
          }

          const user = await UserService.getUserById(otherUserId);
          if (user) {
            messagesDictionary[otherUserId].push({ message, user });
          }
        }
      }
      Object.keys(messagesDictionary).forEach((key) => {
        messagesDictionary[Number(key)].sort(
          (a, b) =>
            new Date(b.message.timestamp).getTime() -
            new Date(a.message.timestamp).getTime()
        );
      });
      setMessagesDictionary(messagesDictionary);
    } catch (error) {
      console.error("error", error);
    }
  };
  useEffect(() => {
    if (user?.id) {
      getConversations();
    }
  }, [user]);

  useEffect(() => {
    const socket = new SockJS("http://localhost:8080/ws");
    const client = new Client({
      webSocketFactory: () => socket as any,
      debug: (str) => {
        console.log(str);
      },

      onConnect: () => {
        stompClient.current = client;
        if (user?.id) {
          stompClient.current.subscribe(
            `/user/${user?.id}/queue/messages`,
            (message) => {
              const newMessage = JSON.parse(message.body) as MessageDetails;
              getConversations();
              if(receiverId && receiverId === newMessage.senderId) {
                openConversation(newMessage.senderId)
              }
              
            }
          );
        }
      },
      onStompError: (frame) => {
        console.error("STOMP error: ", frame.headers["message"]);
      },
    });

    stompClient.current = client;
    stompClient.current.activate();

    return () => {
      if (stompClient.current) {
        stompClient.current.deactivate();
      }
    };
  }, [user]);

  const openConversation = (userId: number) => {
    setReceiverId(userId);
    const response = MessageService.getAllConversationBetween(
      userId,
      user?.id ?? -1
    );
    response.then((data) => setMessages(data.data));
    const updatedMessagesWithReadStatus = messages.map((msg) => {
      if (msg.senderId === user?.id && !msg.read) {
        msg.read = true; 
      }
      return msg;
    });

    setMessages(updatedMessagesWithReadStatus);

    MessageService.markMessagesAsRead(userId, user?.id ?? -1)
      .then(() => {
        getConversations();
      })
      .catch((error) => {
        console.error("Error marking messages as read:", error);
      });
  };

  const sendMessage = async () => {
    if (message.trim() && stompClient.current) {
      const userMessage: MessageDetails = {
        timestamp: new Date(),
        content: message,
        receiverId: receiverId ?? -1,
        senderId: user?.id ?? -1,
        read: false,
      };

      stompClient.current.publish({
        destination: "/app/chat", 
        body: JSON.stringify(userMessage),
      });

      try {
        await axios.post(
          "http://localhost:8080/api/messages/publish",
          userMessage
        );
        setMessage("");
        openConversation(userMessage.receiverId);
      } catch (error) {
        console.error("Error sending message", error);
      }
    }
  };

  return (
    <div className={styles.chatContainer}>
      <div className={styles.sidebar}>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search..."
          className={styles.searchInput}
        />
        <div className={styles.searchResults}>
          {searchQuery !== "" &&
            searchResults.map((sender) => (
              <div
                key={sender.id}
                onClick={() => openConversation(sender.id)}
                className={styles.searchResultItem}
              >
                <h3>{sender.email}</h3>
                <p>
                  {sender.firstName} {sender.lastName}
                </p>
              </div>
            ))}
        </div>
        <div>
          {searchQuery === "" &&
            Object.entries(messagesDictionary).map(
              ([userId, messagesWithUser]) => (
                <div key={userId} className={styles.messageListItem}>
                  <div onClick={() => openConversation(Number(userId))}>
                    {messagesWithUser[0]?.user && (
                      <h3>{messagesWithUser[0].user.email}</h3>
                    )}
                    {messagesWithUser[0]?.message && (
                      <p
                        className={
                          messagesWithUser[0].message.senderId ===
                            Number(userId) &&
                          messagesWithUser[0].message.read === false
                            ? styles.boldMessage
                            : ""
                        }
                      >
                        {messagesWithUser[0].message.senderId === Number(userId)
                          ? `${messagesWithUser[0].user.firstName} ${messagesWithUser[0].user.lastName}: ${messagesWithUser[0].message.content}`
                          : `You: ${messagesWithUser[0].message.content}`}
                      </p>
                    )}
                  </div>
                </div>
              )
            )}
        </div>
      </div>

      <div className={styles.chatWindow}>
        <div className={styles.messages}>
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`${styles.messageItem} ${
                msg.senderId === user?.id ? styles.sent : styles.received
              }`}
            >
              <strong>
                {msg.senderId === user?.id
                  ? "You"
                  : `${
                      messagesDictionary[msg.senderId]?.[0]?.user?.firstName
                    } ${
                      messagesDictionary[msg.senderId]?.[0]?.user?.lastName
                    }` || "User"}
              </strong>
              : {msg.content}
            </div>
          ))}
        </div>
        <div className={styles.messageInput}>
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Enter your message"
            className={styles.inputText}
          />
            <button
    onClick={sendMessage}
    disabled={!receiverId}
    className={styles.sendButton}
  >
    <FaPaperPlane size={20} /> {/* Use the send icon */}
  </button>
        </div>
      </div>
    </div>
  );
}

export default Chat;
