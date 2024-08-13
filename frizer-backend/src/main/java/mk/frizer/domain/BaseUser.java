package mk.frizer.domain;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import mk.frizer.domain.dto.simple.BaseUserSimpleDTO;
import mk.frizer.domain.enums.Role;

import java.util.*;


@Data
@Entity
@NoArgsConstructor
public class BaseUser{// implements UserDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(unique = true)
    private String email;
    private String password;
    private String firstName;
    private String lastName;
    @Column(unique = true)
    private String phoneNumber;
    @Enumerated(EnumType.STRING)
    @ElementCollection(fetch = FetchType.EAGER)
    private Set<Role> roles;
    private boolean isAccountNonExpired = true;
    private boolean isAccountNonLocked = true;
    private boolean isCredentialsNonExpired =  true;
    private boolean isEnabled = true;

    public BaseUser(String email, String password, String firstName, String lastName, String phoneNumber) {
        this.email = email;
        this.password = password;
        this.firstName = firstName;
        this.lastName = lastName;
        this.phoneNumber = phoneNumber;
        this.roles = Set.of(Role.ROLE_USER);
    }

    public BaseUser(String email, String password, String firstName, String lastName, String phoneNumber, Role role) {
        this.email = email;
        this.password = password;
        this.firstName = firstName;
        this.lastName = lastName;
        this.phoneNumber = phoneNumber;
        this.roles.add(role);

    }

//    @Override
//    public Collection<? extends GrantedAuthority> getAuthorities() {
//        return roles;
//    }
//
//    @Override
//    public String getUsername() {
//        return email;
//    }
//
//
//    @Override
//    public boolean isAccountNonExpired() {
//        return isAccountNonExpired;
//    }
//
//    @Override
//    public boolean isAccountNonLocked() {
//        return isAccountNonLocked;
//    }
//
//    @Override
//    public boolean isCredentialsNonExpired() {
//        return isCredentialsNonExpired;
//    }
//
//    @Override
//    public boolean isEnabled() {
//        return isEnabled;
//    }

    public BaseUserSimpleDTO toDto(){
        return BaseUserSimpleDTO.builder()
                .id(this.id)
                .email(this.email)
                .firstName(this.firstName)
                .lastName(this.lastName)
                .phoneNumber(this.phoneNumber)
                .roles(roles.stream().map(Enum::name).toList())
                .build();
    }
}
