package com.example.movieration.dto;

import com.example.movieration.model.Movie;
import com.example.movieration.model.User;

import javax.validation.constraints.Min;

public class UserWatchedMovieDto {

    @Min(value = 1, message = "UserWatchedMovie id  should be at least 1")
    private Long id;

    private UserDto user;

    private MovieDto movie;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public UserDto getUser() {
        return user;
    }

    public void setUser(UserDto user) {
        this.user = user;
    }

    public MovieDto getMovie() {
        return movie;
    }

    public void setMovie(MovieDto movie) {
        this.movie = movie;
    }
}
