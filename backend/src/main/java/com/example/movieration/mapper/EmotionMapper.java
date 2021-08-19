package com.example.movieration.mapper;

import com.example.movieration.dto.EmotionDto;
import com.example.movieration.model.Emotion;
import org.mapstruct.IterableMapping;
import org.mapstruct.Mapper;
import org.mapstruct.Named;

import java.util.List;

@Mapper(componentModel = "spring")
public interface EmotionMapper {

    @Named("emotionDtoToEmotion")
    Emotion emotionDtoToEmotion(EmotionDto emotionDto);

    @Named("emotionToEmotionDto")
    EmotionDto emotionToEmotionDto(Emotion emotion);

    @IterableMapping(qualifiedByName = "emotionDtoToEmotion")
    List<Emotion> emotionDtosToEmotions(List<EmotionDto> emotionDtos);

    @IterableMapping(qualifiedByName = "emotionToEmotionDto")
    List<EmotionDto> emotionsToEmotionDtos(List<Emotion> emotions);
}
