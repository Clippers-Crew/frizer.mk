import { jwtDecode } from "jwt-decode";
import { DecodedToken, User } from "../context/Context";
import axios from "./config/axios";
import { UserEditRequest } from "../interfaces/UserEditRequest";

const UserService = {
  setUser(user: User): void {
    localStorage.setItem("currentUser", JSON.stringify(user));
  },
  removeUser(): void {
    localStorage.removeItem("currentUser");
  },
  setUserWithToken: async (): Promise<User | null> => {
    try {
      console.log("Before axios call");
      const response = await axios.get<User>("/users/me");
      console.log("After axios call: ", response.data);
      const user = response.data;
      UserService.setUser(user);
      console.log("The user is ", user);
      return user;
    } catch (error) {
      console.error(
        "An error occurred while trying to fetch user's details: ",
        error
      );
      return null;
    }
  },
  getCurrentUser: async (): Promise<User | null> => {
    const userJson: string | null = localStorage.getItem("currentUser");
    let user: User | null = userJson ? JSON.parse(userJson) : null;

    if (user) {
      return user;
    } else {
      return await UserService.setUserWithToken();
    }
  },
  updateUserDetails: async (
    id: number,
    data: UserEditRequest
  ): Promise<User | null> => {
    try {
      console.log("Before axios call");
      const response = await axios.put<User>(`/users/edit/${id}`, data);

      console.log("After axios call: ", response.data);
      const updatedUser = response.data;
      UserService.setUser(updatedUser);
      console.log("The updated user is ", updatedUser);
      UserService.setUser(updatedUser);
      return updatedUser;
    } catch (error) {
      console.error(
        "An error occurred while trying to update user's details: ",
        error
      );
      return null;
    }
  },
};
export default UserService;
