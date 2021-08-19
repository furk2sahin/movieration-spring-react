package com.example.movieration.service.impl;

import com.example.movieration.dto.UserWatchedMovieDto;
import com.example.movieration.exception.NotFoundException;
import com.example.movieration.mapper.UserWatchedMovieMapper;
import com.example.movieration.model.UserWatchedMovie;
import com.example.movieration.repository.UserWatchedMovieRepository;
import com.example.movieration.service.MovieService;
import com.example.movieration.service.UserService;
import com.example.movieration.service.UserWatchedMovieService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserWatchedMovieServiceImpl implements UserWatchedMovieService {

    private final UserWatchedMovieRepository userWatchedMovieRepository;
    private final UserWatchedMovieMapper userWatchedMovieMapper;
    private final MovieService movieService;
    private final JdbcTemplate jdbcTemplate;

    @Autowired
    public UserWatchedMovieServiceImpl(UserWatchedMovieRepository userWatchedMovieRepository,
                                       UserWatchedMovieMapper userWatchedMovieMapper,
                                       MovieService movieService,
                                       JdbcTemplate jdbcTemplate) {
        this.userWatchedMovieRepository = userWatchedMovieRepository;
        this.userWatchedMovieMapper = userWatchedMovieMapper;
        this.movieService = movieService;
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public UserWatchedMovieDto addNewUserWatchedMovie(UserWatchedMovieDto userWatchedMovieDto){
        checkIfMovieExists(userWatchedMovieDto.getMovie().getId());
        UserWatchedMovie userWatchedMovie = userWatchedMovieMapper.userWatchedMovieDtoToUserWatchedMovie(userWatchedMovieDto);
        userWatchedMovieRepository.save(userWatchedMovie);
        return userWatchedMovieMapper.userWatchedMovieToUserWatchedMovieDto(userWatchedMovie);

    }

    @Override
    public List<UserWatchedMovieDto> listAllUserWatchedMovies(){
        List<UserWatchedMovie> userWatchedMovies = userWatchedMovieRepository.findAll();
        return userWatchedMovieMapper.userWatchedMoviesToUserWatchedMovieDtos(userWatchedMovies);
    }

    @Override
    public String deleteUserWatchedMovieById(long id){
        if(userWatchedMovieRepository.existsById(id)){
            userWatchedMovieRepository.deleteById(id);
            return "Movie is successfully deleted from userWatchedList by id: " + id;
        }
        else{
            return "No such movie were found in userWatchedList with given id: " + id;
        }
    }

    @Override
    public UserWatchedMovieDto findByUserWatchedMovieId(long id) {
        UserWatchedMovie userWatchedMovie = userWatchedMovieRepository.findById(id).orElse(null);
        return userWatchedMovieMapper.userWatchedMovieToUserWatchedMovieDto(userWatchedMovie);
    }

    @Override
    public List<UserWatchedMovieDto> findByUserId(long id){
        List<UserWatchedMovie> userWatchedMovieList = userWatchedMovieRepository.findByUserId(id);
        return userWatchedMovieMapper.userWatchedMoviesToUserWatchedMovieDtos(userWatchedMovieList);
    }

    @Override
    public boolean existsByUserIdAndMovieId(long userId, long movieId) {
        return userWatchedMovieRepository.existsByUserIdAndMovieId(userId, movieId);
    }

    @Override
    public void deleteAllByUserId(long id) {
        String query = "delete from user_watched_movies where user_id = ?";
        jdbcTemplate.update(query, id);
    }

    private void checkIfMovieExists(long id){
        if(!movieService.existsById(id)){
            throw new NotFoundException("Movie not found with given id: " + id);
        }
    }
}
