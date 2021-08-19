package com.example.movieration.mapper;

import com.example.movieration.dto.UserDto;
import com.example.movieration.model.User;
import org.mapstruct.IterableMapping;
import org.mapstruct.Mapper;
import org.mapstruct.Named;

import java.util.List;

@Mapper(componentModel = "spring")
public interface UserMapper {

    @Named("userDtoToUser")
    User userDtoToUser(UserDto userDto);

    @Named("userToUserDto")
    UserDto userToUserDto(User user);

    @Named("usersToUserDtos")
    @IterableMapping(qualifiedByName = "userToUserDto")
    List<UserDto> usersToUserDtos(List<User> users);
}
