package com.example.movieration.service.impl;

import com.example.movieration.dto.EmotionDto;
import com.example.movieration.mapper.EmotionMapper;
import com.example.movieration.model.Emotion;
import com.example.movieration.repository.EmotionRepository;
import com.example.movieration.service.EmotionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EmotionServiceImpl implements EmotionService {

    private final EmotionRepository emotionRepository;
    private final EmotionMapper emotionMapper;

    @Autowired
    public EmotionServiceImpl(EmotionRepository emotionRepository, EmotionMapper emotionMapper){
        this.emotionRepository = emotionRepository;
        this.emotionMapper = emotionMapper;
    }

    @Override
    public List<EmotionDto> listAllEmotions(){
        List<Emotion> emotions = emotionRepository.findAll();
        return emotionMapper.emotionsToEmotionDtos(emotions);
    }
}
