package mk.frizer.web.rest;

import mk.frizer.domain.Salon;
import mk.frizer.domain.dto.SalonAddDTO;
import mk.frizer.domain.dto.SalonUpdateDTO;
import mk.frizer.domain.dto.TagAddDTO;
import mk.frizer.domain.dto.simple.SalonSimpleDTO;
import mk.frizer.domain.exceptions.SalonNotFoundException;
import mk.frizer.service.SalonService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping({"/api/salons", "/api/salon"})
@CrossOrigin(origins = {"localhost:3000","localhost:3001"})
public class SalonRestController {
    private final SalonService salonService;
    private static final String UPLOAD_DIR = "src/main/resources/static/salons/";

    public SalonRestController(SalonService salonService) {
        this.salonService = salonService;
    }

    @GetMapping()
    public List<SalonSimpleDTO> getAllSalons(){
        return salonService.getSalons().stream().map(Salon::toDto).toList();
    }

    @GetMapping("/{id}")
    public ResponseEntity<SalonSimpleDTO> getSalon(@PathVariable Long id){
        return this.salonService.getSalonById(id)
                .map(salon -> ResponseEntity.ok().body(salon.toDto()))
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping("/add")
    public ResponseEntity<SalonSimpleDTO> createSalon(@RequestBody SalonAddDTO salonAddDTO) {
        return this.salonService.createSalon(salonAddDTO)
                .map(salon -> ResponseEntity.ok().body(salon.toDto()))
                .orElseGet(() -> ResponseEntity.badRequest().build());
    }

    @PostMapping("/add-tag")
    public ResponseEntity<SalonSimpleDTO> addTagToSalon(@RequestBody TagAddDTO tagAddDTO) {
        return this.salonService.addTagToSalon(tagAddDTO)
                .map(salon -> ResponseEntity.ok().body(salon.toDto()))
                .orElseGet(() -> ResponseEntity.badRequest().build());
    }

    @PostMapping("/edit/{id}")
    public ResponseEntity<SalonSimpleDTO> updateSalon(@PathVariable Long id, @RequestBody SalonUpdateDTO salonUpdateDTO) {
        return this.salonService.updateSalon(id, salonUpdateDTO)
                .map(salon -> ResponseEntity.ok().body(salon.toDto()))
                .orElseGet(() -> ResponseEntity.badRequest().build());
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<SalonSimpleDTO> deleteSalonById(@PathVariable Long id) {
        Optional<Salon> salon = this.salonService.deleteSalonById(id);
        try{
            this.salonService.getSalonById(id);
            return ResponseEntity.badRequest().build();
        }
        catch(SalonNotFoundException exception){
            return ResponseEntity.ok().body(salon.get().toDto());
        }
    }

//    @PostMapping("/{id}/uploadImage")
//    public ResponseEntity<Salon> uploadImage(@PathVariable Long id, @RequestParam("image") MultipartFile image)  {
//        try{
//            Optional<Salon> salon = salonService.saveImage(id, image);
//            return ResponseEntity.ok().body(salon.get());
//        }
//        catch (IOException exception){
//            return ResponseEntity.badRequest().build();
//        }
//    }

//    @GetMapping("/images/{id}")
//    public List<> getImages(@PathVariable Long id){
//        return salonService.getSalons();
//    }
//    public ResponseEntity<Salon> getImages(@PathVariable Long id){
//        salonService.getImagesForSalon(id)
//    }
}
