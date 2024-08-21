package mk.frizer.domain;

import jakarta.persistence.*;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
public class ImageEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Lob
    @Column(name = "image", nullable = false)
    private byte[] image;

    private Long salonId;
    private boolean isBackgroundImage;

    public ImageEntity(byte[] image, Long salonId, boolean isBackgroundImage) {
        this.image = image;
        this.salonId = salonId;
        this.isBackgroundImage = isBackgroundImage;
    }

    public ImageEntity(byte[] image, Long salonId) {
        this.image = image;
        this.salonId = salonId;
        this.isBackgroundImage = false;
    }
}



