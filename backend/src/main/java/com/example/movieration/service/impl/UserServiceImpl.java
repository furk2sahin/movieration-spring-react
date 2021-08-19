package com.example.movieration.service.impl;

import com.example.movieration.dto.UserDto;
import com.example.movieration.exception.AlreadyInUseException;
import com.example.movieration.exception.InvalidBirthDateException;
import com.example.movieration.mapper.UserMapper;
import com.example.movieration.model.User;
import com.example.movieration.repository.UserRepository;
import com.example.movieration.service.UserReviewService;
import com.example.movieration.service.UserService;
import com.example.movieration.service.UserWatchedMovieService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.*;

@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final UserMapper userMapper;
    private final JdbcTemplate jdbcTemplate;
    private final UserReviewService userReviewService;
    private final UserWatchedMovieService userWatchedMovieService;

    @Autowired
    public UserServiceImpl(UserRepository userRepository,
                           UserMapper userMapper,
                           JdbcTemplate jdbcTemplate,
                           UserReviewService userReviewService,
                           UserWatchedMovieService userWatchedMovieService) {
        this.userRepository = userRepository;
        this.userMapper = userMapper;
        this.jdbcTemplate = jdbcTemplate;
        this.userReviewService = userReviewService;
        this.userWatchedMovieService = userWatchedMovieService;
    }

    @Override
    public UserDto addNewUser(UserDto userDto) {
        checkIfNicknameOrUsernameOrEmailExists(userDto.getNickname(), userDto.getUsername(), userDto.getEmail());
        checkIfBirthDateValid(userDto.getBirthDate());
        User user = userMapper.userDtoToUser(userDto);
        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        user.setPassword(passwordEncoder.encode(userDto.getPassword()));
        userRepository.save(user);
        return userMapper.userToUserDto(user);
    }

    @Override
    public List<UserDto> listAllUsers() {
        List<User> users = userRepository.findAll();
        return userMapper.usersToUserDtos(users);
    }

    @Override
    public String deleteUserById(long id) {
        if(userRepository.existsById(id)){
            userReviewService.deleteAllByUserId(id);
            userWatchedMovieService.deleteAllByUserId(id);
            userRepository.deleteById(id);
            return "User successfully deleted with id: " + id;
        } else {
            return "No user were found with given id: " + id;
        }
    }

    @Override
    public boolean existsById(long id) {
        return userRepository.existsById(id);
    }

    @Override
    public String banUser(long id) {
        String query = "Update users set is_enabled=false where id = ?";
        jdbcTemplate.update(query, id);
        return "User banned successfully!";
    }

    @Override
    public String unbanUser(long id) {
        String query = "Update users set is_enabled=true where id = ?";
        jdbcTemplate.update(query, id);
        return "User unbanned successfully!";
    }

    @Override
    public String banUserByUsername(String username) {
        String query = "Update users set is_enabled=false where username = ?";
        jdbcTemplate.update(query, username);
        return "User banned successfully!";
    }

    @Override
    public String unbanUserByUsername(String username) {
        String query = "Update users set is_enabled=true where username = ?";
        jdbcTemplate.update(query, username);
        return "User unbanned successfully!";
    }

    @Override
    public boolean existsByUsername(String username) {
        return userRepository.existsByUsername(username);
    }

    @Override
    public String changePassword(long id, String password) {
        User user = userRepository.findById(id).orElse(null);
        if(user == null){
            return "User not found with given id" + id;
        }
        user.setPassword(new BCryptPasswordEncoder().encode(password));
        userRepository.save(user);
        return "Password changed successfully!";
    }

    private void checkIfNicknameOrUsernameOrEmailExists(String nickname, String username, String email){
        if(userRepository.existsByNicknameOrUsernameOrEmail(nickname, username, email)){
            throw new AlreadyInUseException("This nickname, username or email already in use.");
        }
    }

    private void checkIfBirthDateValid(LocalDate birthDate){
        if(birthDate.isBefore(LocalDate.of(1900, Calendar.FEBRUARY, 1))){
            throw new InvalidBirthDateException();
        }
    }
}
