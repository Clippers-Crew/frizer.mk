package mk.frizer.domain;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import mk.frizer.domain.dto.simple.EmployeeSimpleDTO;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import java.util.ArrayList;
import java.util.List;

@Data
@Entity
@NoArgsConstructor
public class Employee {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @OneToMany(fetch = FetchType.EAGER, orphanRemoval = true)
    @OnDelete(action = OnDeleteAction.NO_ACTION)
    @JoinColumn(name = "appointment_employee_active_id")
    private List<Appointment> appointmentsActive;
    @OneToMany(fetch = FetchType.EAGER, orphanRemoval = true)
    @OnDelete(action = OnDeleteAction.NO_ACTION)
    @JoinColumn(name = "appointment_employee_history_id")
    private List<Appointment> appointmentsHistory;

    @ManyToOne
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Salon salon;

    @OneToOne
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn(name = "base_user_id")
    private BaseUser baseUser;

    public Employee(BaseUser baseUser, Salon salon) {
        this.baseUser = baseUser;
        this.appointmentsActive = new ArrayList<>();
        this.appointmentsHistory = new ArrayList<>();
        this.salon = salon;
    }

    public String getFullName(){
        return String.format("%s %s", baseUser.getFirstName(), baseUser.getLastName());
    }

    public EmployeeSimpleDTO toDto(){
        return EmployeeSimpleDTO.builder()
                .id(this.id)
                .appointmentsActiveIds(appointmentsActive.stream().map(Appointment::getId).toList())
                .appointmentsHistoryIds(appointmentsHistory.stream().map(Appointment::getId).toList())
                .salonId(this.salon.getId())
                .baseUserId(this.baseUser.getId())
                .email(this.baseUser.getEmail())
                .firstName(this.baseUser.getFirstName())
                .lastName(this.baseUser.getLastName())
                .phoneNumber(this.baseUser.getPhoneNumber())
                .roles(this.baseUser.getRoles().stream().map(Enum::name).toList())
                .build();
    }
}