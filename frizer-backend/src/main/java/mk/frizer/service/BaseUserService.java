package mk.frizer.service;

import mk.frizer.domain.*;
import mk.frizer.domain.dto.BaseUserAddDTO;
import mk.frizer.domain.dto.BaseUserUpdateDTO;

import java.util.List;
import java.util.Optional;

public interface BaseUserService {
    List<BaseUser> getBaseUsers();
    Optional<BaseUser> getBaseUserById(Long id);
    Optional<BaseUser> getBaseUserByEmail(String email);
    Optional<BaseUser> createBaseUser(BaseUserAddDTO baseUserAddDTO);
    Optional<BaseUser> updateBaseUser(Long id, BaseUserUpdateDTO baseUserUpdateDTO);
    Optional<BaseUser> changeBaseUserPassword(Long id, String password);
    Optional<BaseUser> deleteBaseUserById(Long id);
}