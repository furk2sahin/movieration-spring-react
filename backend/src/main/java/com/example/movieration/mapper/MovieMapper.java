package com.example.movieration.mapper;

import com.example.movieration.dto.MovieDto;
import com.example.movieration.model.Movie;
import org.mapstruct.*;


import java.util.List;

@Mapper(componentModel = "spring")
public interface MovieMapper {

    Movie movieDtoToMovie(MovieDto movieDto);

    @Named("movieToMovieDto")
    MovieDto movieToMovieDto(Movie movie);

    @IterableMapping(qualifiedByName = "movieToMovieDto")
    List<MovieDto> moviesToMovieDtos(List<Movie> movies);
}
