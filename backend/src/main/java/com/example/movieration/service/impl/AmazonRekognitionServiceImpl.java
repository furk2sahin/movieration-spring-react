package com.example.movieration.service.impl;

import com.amazonaws.services.rekognition.AmazonRekognition;
import com.amazonaws.services.rekognition.model.*;
import com.example.movieration.service.AmazonRekognitionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.ByteBuffer;
import java.util.Collections;
import java.util.List;

@Service
public class AmazonRekognitionServiceImpl implements AmazonRekognitionService {

    private final AmazonRekognition amazonRekognition;

    @Autowired
    public AmazonRekognitionServiceImpl(AmazonRekognition amazonRekognition) {
        this.amazonRekognition = amazonRekognition;
    }

    @Override
    public List<Emotion> getEmotions(MultipartFile image) {
        DetectFacesRequest request;
        DetectFacesResult result;
        List<Emotion> emotions;
        try{
            request = new DetectFacesRequest()
                    .withImage(new Image().withBytes(ByteBuffer.wrap(image.getBytes())))
                    .withAttributes(Attribute.ALL);
            result = amazonRekognition.detectFaces(request);
            if(result.getFaceDetails().size() != 1){
                return Collections.emptyList();
            } else {
                emotions = result.getFaceDetails().get(0).getEmotions();
            }
        } catch (AmazonRekognitionException | IOException e) {
            return Collections.emptyList();
        }
        return emotions;
    }
}
