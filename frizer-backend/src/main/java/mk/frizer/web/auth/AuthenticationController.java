package mk.frizer.web.auth;

import lombok.RequiredArgsConstructor;
import mk.frizer.domain.exceptions.UserCannotBeCreatedException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthenticationController {
    private final AuthenticationService authenticationService;

    @PostMapping("/register")
    public ResponseEntity<RegisterResponse> register(
            @RequestBody RegisterRequest request
    ){
        try {
             RegisterResponse registerResponse = authenticationService.register(request);
             return ResponseEntity.ok(registerResponse);
        }
        catch (UserCannotBeCreatedException e){
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body(RegisterResponse
                            .builder()
                            .message("User cannot be created")
                            .build());
        }
    }

    @PostMapping("/login")
    public ResponseEntity<AuthenticationResponse> register(
            @RequestBody AuthenticationRequest request
    ){
        try {
            AuthenticationResponse response = authenticationService.authenticate(request);
            return ResponseEntity.ok(response);
        }
        catch (AuthenticationException e){
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }
}
