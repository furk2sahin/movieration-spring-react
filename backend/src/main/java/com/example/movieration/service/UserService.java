package com.example.movieration.service;

import com.example.movieration.dto.UserDto;

import java.util.List;

public interface UserService{
    UserDto addNewUser(UserDto userDto);
    List<UserDto> listAllUsers();
    String deleteUserById(long id);
    boolean existsById(long id);
    boolean existsByUsername(String username);
    String banUser(long id);
    String unbanUser(long id);
    String banUserByUsername(String username);
    String unbanUserByUsername(String username);
    String changePassword(long id, String password);
}
