package mk.frizer.service;

import mk.frizer.domain.*;
import mk.frizer.domain.dto.AppointmentAddDTO;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

public interface AppointmentService {
    List<Appointment> getAppointments();
    Optional<Appointment> getAppointmentById(Long id);
    Optional<Appointment> createAppointment(AppointmentAddDTO appointmentAddDTO);
    Optional<Appointment> updateAppointment(Long id, LocalDateTime from, LocalDateTime to, Long treatment, Long salon, Long employee, Long customer);
    Optional<Appointment> deleteAppointmentById(Long id);
    Optional<Appointment> changeUserAttendanceAppointment(Long id);
}
