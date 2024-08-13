package mk.frizer.service;

import mk.frizer.domain.Appointment;
import mk.frizer.domain.Employee;
import mk.frizer.domain.dto.EmployeeAddDTO;

import java.util.List;
import java.util.Optional;

public interface EmployeeService {
    List<Employee> getEmployees();

    Optional<Employee> getEmployeeById(Long id);
    Optional<Employee> getEmployeeByBaseUserId(Long id);
    List<Employee> getEmployeesForSalon(Long id);
    Optional<Employee> createEmployee(EmployeeAddDTO employeeAddDTO);
    Optional<Employee> deleteEmployeeById(Long id);
    Optional<Employee> deleteEmployeeByIdFromSalon(Long id, Long salonId);
    Optional<Employee> addActiveAppointmentForEmployee(Appointment appointment);
    Optional<Employee> addHistoryAppointmentForEmployee(Appointment appointment);
}
