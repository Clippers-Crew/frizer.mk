package mk.frizer.web.rest;

import mk.frizer.domain.BaseUser;
import mk.frizer.domain.dto.BaseUserAddDTO;
import mk.frizer.domain.dto.BaseUserUpdateDTO;
import mk.frizer.domain.dto.simple.BaseUserSimpleDTO;
import mk.frizer.domain.exceptions.UserNotFoundException;
import mk.frizer.service.BaseUserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping({"/api/users", "/api/user"})
@CrossOrigin(origins = {"localhost:3000","localhost:3001"})
public class UserController {
    private final BaseUserService baseUserService;

    public UserController(BaseUserService baseUserService) {
        this.baseUserService = baseUserService;
    }

    @GetMapping()
    public List<BaseUserSimpleDTO> getUsers(){
        return baseUserService.getBaseUsers().stream().map(BaseUser::toDto).toList();
    }

    @GetMapping("/{id}")
    public ResponseEntity<BaseUserSimpleDTO> getUser(@PathVariable Long id){
        return this.baseUserService.getBaseUserById(id)
                .map(user -> ResponseEntity.ok().body(user.toDto()))
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping("/add")
    public ResponseEntity<BaseUserSimpleDTO> createUser(@RequestBody BaseUserAddDTO baseUserAddDTO) {
        return this.baseUserService.createBaseUser(baseUserAddDTO)
                .map(user -> ResponseEntity.ok().body(user.toDto()))
                .orElseGet(() -> ResponseEntity.badRequest().build());
    }

    @PutMapping("/edit/{id}")
    public ResponseEntity<BaseUserSimpleDTO> updateUser(@PathVariable Long id, @RequestBody BaseUserUpdateDTO baseUserUpdateDTO) {
        return this.baseUserService.updateBaseUser(id, baseUserUpdateDTO)
                .map(user -> ResponseEntity.ok().body(user.toDto()))
                .orElseGet(() -> ResponseEntity.badRequest().build());
    }

    //TODO send encrypted password from frontend, and decrypt it here with same key...
    @PostMapping("/edit-password/{id}")
    public ResponseEntity<BaseUserSimpleDTO> updatePasswordForUser(@PathVariable Long id, @RequestParam String password){
        return this.baseUserService.changeBaseUserPassword(id, password)
                .map(user -> ResponseEntity.ok().body(user.toDto()))
                .orElseGet(() -> ResponseEntity.badRequest().build());
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<BaseUserSimpleDTO> deleteUserById(@PathVariable Long id) {
        Optional<BaseUser> user = this.baseUserService.deleteBaseUserById(id);
        try{
            this.baseUserService.getBaseUserById(id);
            return ResponseEntity.badRequest().build();
        }
        catch(UserNotFoundException exception){
            return ResponseEntity.ok().body(user.get().toDto());
        }
    }
}
