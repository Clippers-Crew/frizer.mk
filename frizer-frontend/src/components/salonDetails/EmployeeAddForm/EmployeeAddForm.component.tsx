import React, { useEffect, useState } from "react";
import styles from "./EmployeeAddForm.module.scss";
import { Salon } from "../../../interfaces/Salon.interface";
import BaseUserService from "../../../services/baseUser.service";
import { BaseUser } from "../../../interfaces/BaseUser.interface";
import UserService from "../../../services/user.service";
import EmployeeService from "../../../services/employee.service";
import { EmployeeCreate } from "../../../interfaces/EmployeeCreateRequest.interface";
import { User } from "../../../context/Context";
import { Employee } from "../../../interfaces/Employee.interface";
interface EmployeeAddFormProps {
  salon?: Salon;
  onEmployeeAdd: (employee: Employee) => void;
}

function EmployeeAddForm({ salon, onEmployeeAdd }: EmployeeAddFormProps) {
  const [selectedUserId, setSelectedUserId] = useState("");
  const [users, setUsers] = useState<BaseUser[]>([]);
  const [user, setUser] = useState<User>();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await BaseUserService.getAvailableUsers();
        setUsers(response.data);
      } catch (error) {}
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    const response = UserService.getCurrentUser();
    if (response) {
      setUser(response);
    }
  }, []);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    try {
      const employee: EmployeeCreate = {
        userId: +selectedUserId,
        salonId: salon?.id,
      };
      const response = await EmployeeService.createEmployee(employee);
      onEmployeeAdd(response);
      setUsers((prevUsers) =>
        prevUsers.filter((user) => user.id !== +selectedUserId)
      );
      window.scrollTo(0, 0);
    } catch (error) {}
  }

  return (
    <>
      {user?.id === salon?.ownerId && (
        <form
          method="post"
          onSubmit={handleSubmit}
          className={styles.employeeAddForm}
        >
          <h2>Додади вработен</h2>
          <input type="hidden" name="salonId" value={salon?.id} />
          <label htmlFor="userId">Корисник</label>
          <select
            name="userId"
            id="userId"
            value={selectedUserId}
            onChange={(e) => setSelectedUserId(e.target.value)}
          >
            <option value="">Корисник</option>
            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.firstName} {user.lastName}
              </option>
            ))}
          </select>
          <button
            type="submit"
            className={`${styles.primaryButton} primaryButton`}
          >
            Додади вработен
          </button>
        </form>
      )}
    </>
  );
}

export default EmployeeAddForm;
