package mk.frizer.domain.dto;

import lombok.Data;

@Data
public class ReviewUpdateDTO {
    private Double rating;
    private String comment;
}
