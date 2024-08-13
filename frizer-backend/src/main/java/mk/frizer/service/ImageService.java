package mk.frizer.service;

import jakarta.transaction.Transactional;
import mk.frizer.domain.ImageEntity;
import mk.frizer.domain.Salon;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Optional;

public interface ImageService {
    public Optional<Salon> saveImage(Long id, MultipartFile file) throws IOException;
    public Optional<Salon> saveBackgroundImage(Long id, MultipartFile file) throws IOException;
    public byte[] getImage(Long id, Long imageId);
}
