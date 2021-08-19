package com.example.movieration.service;

import com.amazonaws.services.rekognition.model.Emotion;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface AmazonRekognitionService {
    List<Emotion> getEmotions(MultipartFile image);
}
