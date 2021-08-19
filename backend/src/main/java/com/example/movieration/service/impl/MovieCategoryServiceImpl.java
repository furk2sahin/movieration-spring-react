package com.example.movieration.service.impl;

import com.example.movieration.service.MovieCategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BatchPreparedStatementSetter;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.util.List;

@Service
public class MovieCategoryServiceImpl implements MovieCategoryService {

    private final JdbcTemplate jdbcTemplate;

    @Autowired
    public MovieCategoryServiceImpl(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public void addAllMovieCategory(Long movieId, List<Long> movieCategories) {
        jdbcTemplate.batchUpdate(
                "insert into movie_categories (movie_id, category_id) values(?,?)",
                new BatchPreparedStatementSetter() {

                    public void setValues(PreparedStatement ps, int i) throws SQLException {
                        ps.setLong(1, movieId);
                        ps.setLong(2, movieCategories.get(i));
                    }

                    public int getBatchSize() {
                        return movieCategories.size();
                    }
                }
        );
    }

    @Override
    public void deleteByMovieId(Long movieId) {
        String deleteQuery = "delete from movie_categories where movie_id = ?";
        jdbcTemplate.update(deleteQuery, movieId);
    }
}
