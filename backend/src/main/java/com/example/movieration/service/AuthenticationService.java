package com.example.movieration.service;

import com.example.movieration.dto.UserDto;
import com.example.movieration.model.User;

public interface AuthenticationService {
    UserDto login(String username, String password);
    boolean checkIfUserBanned(User user);
}
