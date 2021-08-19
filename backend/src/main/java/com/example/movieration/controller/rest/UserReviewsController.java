package com.example.movieration.controller.rest;

import com.example.movieration.dto.UserReviewDto;
import com.example.movieration.service.UserReviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/userReviews")
@CrossOrigin
public class UserReviewsController {

    private final UserReviewService userReviewService;

    @Autowired
    public UserReviewsController(UserReviewService userReviewService){
        this.userReviewService = userReviewService;
    }

    @GetMapping("/getAll")
    public ResponseEntity<Object> getUserReviews(){
        List<UserReviewDto> userReviewDtoList = userReviewService.listAllUserReviews();
        if(userReviewDtoList.isEmpty()){
            return ResponseEntity.badRequest().body("No userReviews were found!");
        }else{
            return ResponseEntity.ok(userReviewDtoList);
        }
    }

    @PostMapping("/add")
    public ResponseEntity<String> addNewUserReview(@RequestBody @Valid UserReviewDto userReviewDto){
        if(userReviewService.existsByUserIdAndMovieId(userReviewDto.getUser().getId(),
                userReviewDto.getMovie().getId())){
            return ResponseEntity.badRequest().body("This movie already rated by this user!");
        }
        userReviewService.addNewUserReview(userReviewDto);
        return ResponseEntity.ok("Successfully reviewed!");
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteUserReviewById(@PathVariable("id") Long id){
        return ResponseEntity.ok(userReviewService.deleteUserReviewById(id));
    }

    @GetMapping("/findByUserId/{id}")
    public ResponseEntity<List<UserReviewDto>> findAllByUserId(@PathVariable("id") long id){
        return ResponseEntity.ok(userReviewService.findAllByUserId(id));
    }

    @GetMapping("/findByMovieId/{id}")
    public ResponseEntity<List<UserReviewDto>> findAllByMovieId(@PathVariable("id") long id){
        return ResponseEntity.ok(userReviewService.findAllByMovieId(id));
    }
}

