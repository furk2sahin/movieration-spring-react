package com.example.movieration.repository;
import com.example.movieration.model.Movie;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface MovieRepository extends JpaRepository<Movie, Long> {
    boolean existsByName(String name);
    boolean existsByReleaseDate(LocalDate releaseDate);
    List<Movie> findByNameContainingIgnoreCase(String name);
}
