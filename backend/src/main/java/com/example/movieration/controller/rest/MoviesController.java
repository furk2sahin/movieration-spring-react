package com.example.movieration.controller.rest;
import java.util.List;

import com.example.movieration.service.MovieService;
import com.example.movieration.dto.MovieDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/api/movies")
@CrossOrigin
public class MoviesController {

    private final MovieService movieService;

    @Autowired
    public MoviesController(MovieService movieService) {
            this.movieService = movieService;
    }

    @PostMapping("/add")
    public ResponseEntity<Object> addNewMovie(@RequestBody @Valid MovieDto movieDto){
        MovieDto movie;
        try{
             movie = movieService.addNewMovie(movieDto);
        } catch (RuntimeException e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
        return ResponseEntity.ok(movie);
    }

    @GetMapping("/getAll")
    public ResponseEntity<Object> getMovies(){
        List<MovieDto> movieDtoList = movieService.listAllMovies();
        if (movieDtoList.isEmpty()) {
            return ResponseEntity.badRequest().body("No movies were found!");
        } else {
            return ResponseEntity.ok(movieDtoList);
        }
    }

    @DeleteMapping(value = "/delete/{id}")
    public ResponseEntity<String> deleteMovie (@PathVariable Long id){
        return ResponseEntity.ok(movieService.deleteMovieById(id));
    }

    @GetMapping("/findById/{id}")
    public ResponseEntity<Object> findById(@PathVariable("id") Long id){
        MovieDto movieDto = movieService.findByMovieId(id);
        if(movieDto == null){
            return ResponseEntity.status(404).body("No movie were found by given id: " + id);
        } else {
            return ResponseEntity.ok(movieDto);
        }
    }

    @GetMapping("/findByCategoryId/{id}")
    public ResponseEntity<List<MovieDto>> findByCategoryId(@PathVariable("id") Long id){
        return ResponseEntity.ok(movieService.findByCategoryId(id));
    }

    @GetMapping("/findByName/{name}")
    public ResponseEntity<List<MovieDto>> findByNameContainingIgnoreCase(@PathVariable("name") String name){
        return ResponseEntity.ok(movieService.findByNameContainingIgnoreCase(name));
    }

    @GetMapping("/findByEmotionId/{id}")
    public ResponseEntity<List<MovieDto>> findByEmotionId(@PathVariable("id") long id){
        return ResponseEntity.ok(movieService.findByEmotionId(id));
    }
}