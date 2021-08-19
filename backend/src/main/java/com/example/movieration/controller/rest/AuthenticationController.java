package com.example.movieration.controller.rest;

import com.example.movieration.dto.UserDto;
import com.example.movieration.service.AuthenticationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
@RequestMapping("/api/auth")
public class AuthenticationController {

    private final AuthenticationService authenticationService;

    @Autowired
    public AuthenticationController(AuthenticationService authenticationService) {
        this.authenticationService = authenticationService;
    }

    @PostMapping("/login")
    public ResponseEntity<Object> login(@RequestBody UserDto user){
        UserDto userDto = authenticationService.login(user.getUsername(), user.getPassword());
        if(userDto == null){
            return ResponseEntity.status(404).body("Wrong username or password.");
        } else if(userDto.isEnabled()){
            return ResponseEntity.ok(userDto);
        } else {
            return ResponseEntity.status(404).body("This account is banned!");
        }
    }
}
