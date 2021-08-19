package com.example.movieration.service;

import com.example.movieration.dto.UserWatchedMovieDto;

import java.util.List;

public interface UserWatchedMovieService {
    List<UserWatchedMovieDto> listAllUserWatchedMovies();
    UserWatchedMovieDto addNewUserWatchedMovie(UserWatchedMovieDto userWatchedMovieDto);
    String deleteUserWatchedMovieById(long id);
    UserWatchedMovieDto findByUserWatchedMovieId(long id);
    List<UserWatchedMovieDto> findByUserId(long id);
    boolean existsByUserIdAndMovieId(long userId, long movieId);
    void deleteAllByUserId(long id);
}
