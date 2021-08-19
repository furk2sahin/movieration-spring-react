package com.example.movieration.service.impl;

import com.example.movieration.dto.MovieDto;
import com.example.movieration.exception.AlreadyInUseException;
import com.example.movieration.mapper.MovieMapper;
import com.example.movieration.model.Movie;
import com.example.movieration.repository.MovieRepository;
import com.example.movieration.service.CategoryService;
import com.example.movieration.service.CloudinaryService;
import com.example.movieration.service.MovieCategoryService;
import com.example.movieration.service.MovieService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class MovieServiceImpl implements MovieService {

    private final MovieRepository movieRepository;
    private final MovieMapper movieMapper;
    private final MovieCategoryService movieCategoryService;
    private final CategoryService categoryService;
    private final CloudinaryService cloudinaryService;
    private final JdbcTemplate jdbcTemplate;

    @Autowired
    public MovieServiceImpl(MovieRepository movieRepository,
                            MovieMapper movieMapper,
                            MovieCategoryService movieCategoryService,
                            CategoryService categoryService,
                            CloudinaryService cloudinaryService,
                            JdbcTemplate jdbcTemplate) {
        this.movieRepository = movieRepository;
        this.movieMapper = movieMapper;
        this.movieCategoryService = movieCategoryService;
        this.categoryService = categoryService;
        this.cloudinaryService = cloudinaryService;
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public List<MovieDto> listAllMovies(){
        List<Movie> movies = movieRepository.findAll();
        return movieMapper.moviesToMovieDtos(movies);
    }

    @Override
    public MovieDto addNewMovie(MovieDto movieDto) throws RuntimeException{
        if(!checkIfMovieExist(movieDto.getName() , movieDto.getReleaseDate())){
            throw new AlreadyInUseException("This movie is already added to the website");
        }

        String photoPath = cloudinaryService.save(movieDto.getThumbnail());

        movieDto.setThumbnail(photoPath);
        Movie movie = movieMapper.movieDtoToMovie(movieDto);

        movieRepository.save(movie);
        long categoryCount = categoryService.getCount();
        List<Long> categories = movie.getCategories()
                .stream()
                .map(category -> categoryCount >= category.getId() ? category.getId() : 0)
                .filter(aLong -> aLong != 0L)
                .collect(Collectors.toList());
        movieCategoryService.addAllMovieCategory(movie.getId(), categories);
        return movieMapper.movieToMovieDto(movie);
    }

    @Override
    public String deleteMovieById(long id){
        MovieDto movie = findByMovieId(id);
        if(movie != null){
            movieCategoryService.deleteByMovieId(id);
            movieRepository.deleteById(id);
            cloudinaryService.destroy(movie.getThumbnail());
            return "Movie is successfully deleted with id: " + id;
        }
        else{
            return "No movie were found with given id: " + id;
        }
    }

    @Override
    public MovieDto findByMovieId(long id) {
        Movie movie = movieRepository.findById(id).orElse(null);
        return movieMapper.movieToMovieDto(movie);
    }

    @Override
    public List<MovieDto> findByCategoryId(long id) {
        List<MovieDto> movieDtoList = listAllMovies();
        return movieDtoList.stream().filter(movieDto -> movieDto.getCategories()
                        .stream().anyMatch(categoryDto -> categoryDto.getId().equals(id)))
        .collect(Collectors.toList());
    }

    @Override
    public List<MovieDto> findByNameContainingIgnoreCase(String name) {
        List<Movie> movies = movieRepository.findByNameContainingIgnoreCase(name);
        return movieMapper.moviesToMovieDtos(movies);
    }

    @Override
    public List<MovieDto> findByEmotionId(long id) {
        String query = "select category_id from category_emotions where emotion_id = ?";
        List<Long> categoriesByEmotion = jdbcTemplate.query(query, (rs, rowNum) -> rs.getLong("category_id"), id);

        return listAllMovies()
                .stream()
                .filter(movieDto -> movieDto.getCategories()
                        .stream().anyMatch(categoryDto -> categoriesByEmotion.contains(categoryDto.getId())))
                .collect(Collectors.toList());
    }

    @Override
    public boolean existsById(long id) {
        return movieRepository.existsById(id);
    }

    private boolean checkIfMovieExist(String name , LocalDate releaseDate){
        return !(movieRepository.existsByName(name) && movieRepository.existsByReleaseDate(releaseDate));
    }
}