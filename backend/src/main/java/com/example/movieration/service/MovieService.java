package com.example.movieration.service;
import com.example.movieration.dto.MovieDto;

import java.util.List;


public interface MovieService {
    List<MovieDto> listAllMovies();
    MovieDto addNewMovie(MovieDto movieDto);
    String deleteMovieById(long id);
    MovieDto findByMovieId(long id);
    List<MovieDto> findByCategoryId(long id);
    List<MovieDto> findByNameContainingIgnoreCase(String name);
    List<MovieDto> findByEmotionId(long id);
    boolean existsById(long id);
}