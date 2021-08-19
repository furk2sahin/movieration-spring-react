package com.example.movieration.service.impl;

import com.example.movieration.dto.UserDto;
import com.example.movieration.mapper.UserMapper;
import com.example.movieration.model.User;
import com.example.movieration.repository.UserRepository;
import com.example.movieration.service.AuthenticationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthenticationServiceImpl implements AuthenticationService {

    private final UserRepository userRepository;
    private final UserMapper userMapper;

    @Autowired
    public AuthenticationServiceImpl(UserRepository userRepository, UserMapper userMapper) {
        this.userRepository = userRepository;
        this.userMapper = userMapper;
    }

    @Override
    public UserDto login(String username, String password) {
        User user = userRepository.findByUsername(username).orElse(null);
        if(user == null){
            return null;
        }
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
        if(!encoder.matches(password, user.getPassword())){
            return null;
        } else {
            return userMapper.userToUserDto(user);
        }
    }

    @Override
    public boolean checkIfUserBanned(User user) {
        return user.isEnabled();
    }
}
