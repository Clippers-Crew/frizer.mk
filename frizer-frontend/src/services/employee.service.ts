import { Employee } from '../interfaces/Employee.interface';
import axios from './config/axios';

const EmployeeService = {
    getEmployees: () => {
        return axios.get<Employee[]>("/employees");
    },
    getEmployee: (id: number) => {
        return axios.get<Employee>(`/employees/${id}`);
    },
    getEmployeesByIds: (ids: number[]) => {
        const params = new URLSearchParams();
        ids.forEach(id => params.append('ids', id.toString()));
        
        return axios.get<Employee[]>('/employees/ids', { params });
      },
  
};

export default EmployeeService;

