package mk.frizer.domain.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class EmployeeAddDTO {
    private Long userId;
    private Long salonId;
}
