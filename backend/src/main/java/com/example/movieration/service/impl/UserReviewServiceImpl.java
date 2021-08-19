package com.example.movieration.service.impl;

import com.example.movieration.dto.UserReviewDto;
import com.example.movieration.exception.NotFoundException;
import com.example.movieration.mapper.UserReviewMapper;
import com.example.movieration.model.UserReview;
import com.example.movieration.repository.UserReviewRepository;
import com.example.movieration.service.MovieService;
import com.example.movieration.service.UserReviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserReviewServiceImpl implements UserReviewService {

    private final UserReviewRepository userReviewRepository;
    private final UserReviewMapper userReviewMapper;
    private final MovieService movieService;
    private final JdbcTemplate jdbcTemplate;

    @Autowired
    public UserReviewServiceImpl(UserReviewRepository userReviewRepository,
                                 UserReviewMapper userReviewMapper,
                                 JdbcTemplate jdbcTemplate,
                                 MovieService movieService) {
        this.userReviewRepository = userReviewRepository;
        this.userReviewMapper = userReviewMapper;
        this.movieService = movieService;
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public List<UserReviewDto> listAllUserReviews(){
        List<UserReview> userReviewDtos = userReviewRepository.findAll();
        return userReviewMapper.userReviewsToUserReviewDtos(userReviewDtos);
    }

    @Override
    public UserReviewDto addNewUserReview(UserReviewDto userReviewDto){
        checkIfMovieExists(userReviewDto.getMovie().getId());
        UserReview userReview = userReviewMapper.userReviewDtoToUserReview(userReviewDto);
        userReviewRepository.save(userReview);
        updateRatingByMovieId(userReview.getMovie().getId());
        return userReviewMapper.userReviewToUserReviewDto(userReview);
    }

    @Override
    public String deleteUserReviewById(Long id){
        UserReview userReview = userReviewRepository.findById(id).orElse(null);
        if(userReview != null){
            userReviewRepository.deleteById(id);
            updateRatingByMovieId(userReview.getMovie().getId());
            return "UserReview is successfully deleted by id: " + id;
        } else{
            return "No such userReview were found with given id: " + id;
        }
    }

    @Override
    public boolean existsByUserIdAndMovieId(long userId, long movieId) {
        return userReviewRepository.existsByUserIdAndMovieId(userId, movieId);
    }

    @Override
    public List<UserReviewDto> findAllByUserId(long id) {
        List<UserReview> userReviews = userReviewRepository.findAllByUserId(id);
        return userReviewMapper.userReviewsToUserReviewDtos(userReviews);
    }

    @Override
    public List<UserReviewDto> findAllByMovieId(long id) {
        checkIfMovieExists(id);
        List<UserReview> userReviews = userReviewRepository.findAllByMovieId(id);
        return userReviewMapper.userReviewsToUserReviewDtos(userReviews);
    }

    @Override
    public void deleteAllByUserId(long userId) {
        List<UserReview> userReviews = userReviewRepository.findAllByUserId(userId);
        List<Long> movieIds = userReviews
                .stream()
                .map(userReview -> userReview.getMovie().getId())
                .collect(Collectors.toList());
        String query = "delete from user_reviews where user_id = ?";
        jdbcTemplate.update(query, userId);
        movieIds.forEach(this::updateRatingByMovieId);
    }

    public void updateRatingByMovieId(long id) {
        Double movieRating = jdbcTemplate.queryForObject(
                "Select avg(rate) from user_reviews where movie_id = ?", Double.class, id);
        if(movieRating == null){
            movieRating = 0.0;
        }
        jdbcTemplate.update("update movies set rating = ? where id = ?", movieRating, id);
    }

    private void checkIfMovieExists(long id){
        if(!movieService.existsById(id)){
            throw new NotFoundException("Movie not found with given id: " + id);
        }
    }
}

