package com.example.movieration.mapper;

import com.example.movieration.dto.UserReviewDto;
import com.example.movieration.model.UserReview;
import org.mapstruct.IterableMapping;
import org.mapstruct.Mapper;
import org.mapstruct.Named;

import java.util.List;

@Mapper(componentModel = "spring")
public interface UserReviewMapper {

    @Named("userReviewDtoToUserReview")
    UserReview userReviewDtoToUserReview(UserReviewDto userReviewDto);

    @Named("userReviewToUserReviewDto")
    UserReviewDto userReviewToUserReviewDto(UserReview userReview);

    @IterableMapping(qualifiedByName = "userReviewDtoToUserReview")
    List<UserReview> userReviewDtosToUserReviews(List<UserReviewDto> userReviewDtos);

    @IterableMapping(qualifiedByName = "userReviewToUserReviewDto")
    List<UserReviewDto> userReviewsToUserReviewDtos(List<UserReview> userReview);
}
