package com.example.movieration.repository;

import com.example.movieration.model.UserWatchedMovie;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserWatchedMovieRepository extends JpaRepository<UserWatchedMovie, Long> {
    boolean existsByUserIdAndMovieId(long userId, long movieId);
    List<UserWatchedMovie> findByUserId(long id);
    void deleteAllByUserId(long userId);
}
