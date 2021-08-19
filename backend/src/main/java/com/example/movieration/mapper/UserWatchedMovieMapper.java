package com.example.movieration.mapper;

import com.example.movieration.dto.UserWatchedMovieDto;
import com.example.movieration.model.UserWatchedMovie;
import org.mapstruct.IterableMapping;
import org.mapstruct.Mapper;
import org.mapstruct.Named;

import java.util.List;

@Mapper(componentModel = "spring")
public interface UserWatchedMovieMapper {

    @Named("userWatchedMovieDtoToUserWatchedMovie")
    UserWatchedMovie userWatchedMovieDtoToUserWatchedMovie(UserWatchedMovieDto userWatchedMovieDto);

    @Named("userWatchedMovieToUserWatchedMovieDto")
    UserWatchedMovieDto userWatchedMovieToUserWatchedMovieDto(UserWatchedMovie userWatchedMovie);

    @IterableMapping(qualifiedByName = "userWatchedMovieDtoToUserWatchedMovie")
    List<UserWatchedMovie> userWatchedMovieDtosToUserWatchedMovies(List<UserWatchedMovieDto> userWatchedMovieDtos);

    @IterableMapping(qualifiedByName = "userWatchedMovieToUserWatchedMovieDto")
    List<UserWatchedMovieDto> userWatchedMoviesToUserWatchedMovieDtos(List<UserWatchedMovie> userWatchedMovies);
}
