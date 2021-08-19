package com.example.movieration.repository;

import com.example.movieration.model.UserReview;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserReviewRepository extends JpaRepository<UserReview, Long> {
    boolean existsById(Long id);
    List<UserReview> findAllByUserId(long userId);
    List<UserReview> findAllByMovieId(long movieId);
    boolean existsByUserIdAndMovieId(long userId, long movieId);
}