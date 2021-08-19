package com.example.movieration.controller.rest;

import com.example.movieration.dto.UserDto;
import com.example.movieration.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/users")
@CrossOrigin
public class UsersController {

    private final UserService userService;

    @Autowired
    public UsersController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/add")
    public ResponseEntity<UserDto> addNewUser(@RequestBody @Valid UserDto userDto){
        UserDto user = userService.addNewUser(userDto);
        return ResponseEntity.ok(user);
    }

    @GetMapping("/getAll")
    public ResponseEntity<Object> getAllUsers(){
        List<UserDto> userDtoList = userService.listAllUsers();
        if(userDtoList.isEmpty()){
            return ResponseEntity.badRequest().body("No user were found!");
        } else {
            return ResponseEntity.ok(userDtoList);
        }
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteUser(@PathVariable("id") long id){
        return ResponseEntity.ok(userService.deleteUserById(id));
    }

    @PutMapping("/ban/{id}")
    public ResponseEntity<String> banUser(@PathVariable("id") long id){
        if(userService.existsById(id)){
            return ResponseEntity.ok(userService.banUser(id));
        } else {
            return ResponseEntity.status(404).body("No user were found by given id: " + id);
        }
    }

    @PutMapping("/unban/{id}")
    public ResponseEntity<String> unbanUser(@PathVariable("id") long id){
        if(userService.existsById(id)){
            return ResponseEntity.ok(userService.unbanUser(id));
        } else {
            return ResponseEntity.status(404).body("No user were found by given id: " + id);
        }
    }

    @PutMapping("/banByUsername/{username}")
    public ResponseEntity<String> banUserByUsername(@PathVariable("username") String username){
        if(userService.existsByUsername(username)){
            return ResponseEntity.ok(userService.banUserByUsername(username));
        } else {
            return ResponseEntity.status(404).body("No user were found by given username: " + username);
        }
    }

    @PutMapping("/unbanByUsername/{username}")
    public ResponseEntity<String> unbanUserByUsername(@PathVariable("username") String username){
        if(userService.existsByUsername(username)){
            return ResponseEntity.ok(userService.unbanUserByUsername(username));
        } else {
            return ResponseEntity.status(404).body("No user were found by given username: " + username);
        }
    }

    @PutMapping("/changePassword/{id}/{password}")
    public ResponseEntity<String> unbanUserByUsername(@PathVariable("id") long id,
                                                      @PathVariable("password") String password){

        return ResponseEntity.ok(userService.changePassword(id, password));
    }
}
