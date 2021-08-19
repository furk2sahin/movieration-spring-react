package com.example.movieration.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.validation.constraints.Max;
import javax.validation.constraints.Min;

public class UserReviewDto {

    @Min(value = 1, message = "UserReview id should be at least 1")
    private Long id;

    private String comment;

    @Min(value = 1, message = "Rate should be at least 1")
    @Max(value = 5, message = "Rate should 5 max.")
    private double rate;

    @JsonIgnoreProperties("userReviews")
    private UserDto user;

    private MovieDto movie;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }

    public double getRate() {
        return rate;
    }

    public void setRate(double rate) {
        this.rate = rate;
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
