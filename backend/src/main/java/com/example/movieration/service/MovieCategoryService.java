package com.example.movieration.service;

import java.util.List;

public interface MovieCategoryService {
    void addAllMovieCategory(Long movieId, List<Long> movieCategories);
    void deleteByMovieId(Long movieId);
}
