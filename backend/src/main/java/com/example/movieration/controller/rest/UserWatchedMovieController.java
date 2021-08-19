package com.example.movieration.controller.rest;

import com.example.movieration.dto.UserWatchedMovieDto;
import com.example.movieration.service.UserWatchedMovieService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/userWatchedMovies")
@CrossOrigin
public class UserWatchedMovieController {

    private final UserWatchedMovieService userWatchedMovieService;

    @Autowired
    public UserWatchedMovieController(UserWatchedMovieService userWatchedMovieService){
        this.userWatchedMovieService = userWatchedMovieService;
    }

    @GetMapping("/getAll")
    public ResponseEntity<Object> getUserWatchedMovies(){
        List<UserWatchedMovieDto> userWatchedMovieDtoList = userWatchedMovieService.listAllUserWatchedMovies();
        if(userWatchedMovieDtoList.isEmpty()){
            return ResponseEntity.badRequest().body("No movies were found in the user watched list");
        }else{
            return ResponseEntity.ok(userWatchedMovieDtoList);
        }
    }

    @PostMapping("/add")
    public ResponseEntity<String> addNewUserWatchedMovie(@RequestBody @Valid UserWatchedMovieDto userWatchedMovieDto){
        if (userWatchedMovieService.existsByUserIdAndMovieId(userWatchedMovieDto.getUser().getId(),
                                                             userWatchedMovieDto.getMovie().getId())) {
            return ResponseEntity.badRequest().body("This movie already in list!");
        }
        userWatchedMovieService.addNewUserWatchedMovie(userWatchedMovieDto);
        return ResponseEntity.ok("Successfully added to list!");
    }

    @DeleteMapping(value = "/delete/{id}")
    public ResponseEntity<String> deleteUserWatchedMovie(@PathVariable("id") long id){
        return ResponseEntity.ok(userWatchedMovieService.deleteUserWatchedMovieById(id));
    }

    @GetMapping("/findById/{id}")
    public ResponseEntity<Object> findById(@PathVariable("id") long id){
        UserWatchedMovieDto userWatchedMovieDto = userWatchedMovieService.findByUserWatchedMovieId(id);
        if(userWatchedMovieDto == null){
            return ResponseEntity.badRequest().body("No userWatchedMovie were found by given id : " + id);
        }else{
            return ResponseEntity.ok(userWatchedMovieDto);
        }
    }

    @GetMapping("/findByUserId/{id}")
    public ResponseEntity<Object> findByUserId(@PathVariable("id") long id){
        List<UserWatchedMovieDto> userWatchedMovieDtoList = userWatchedMovieService.findByUserId(id);
        return ResponseEntity.ok(userWatchedMovieDtoList);
    }
}