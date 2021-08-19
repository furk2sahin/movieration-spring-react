package com.example.movieration.service;

import com.example.movieration.dto.UserReviewDto;

import java.util.List;

public interface UserReviewService {
    List<UserReviewDto> listAllUserReviews();
    UserReviewDto addNewUserReview(UserReviewDto userReviewDto);
    String deleteUserReviewById(Long id);
    boolean existsByUserIdAndMovieId(long userId, long movieId);
    List<UserReviewDto> findAllByUserId(long id);
    List<UserReviewDto> findAllByMovieId(long id);
    void deleteAllByUserId(long userId);
}

