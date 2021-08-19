package com.example.movieration.controller.rest;

import com.amazonaws.services.rekognition.model.Emotion;
import com.example.movieration.service.AmazonRekognitionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/rekognition")
public class AmazonRekognitionController {

    private final AmazonRekognitionService amazonRekognitionService;

    @Autowired
    public AmazonRekognitionController(AmazonRekognitionService amazonRekognitionService) {
        this.amazonRekognitionService = amazonRekognitionService;
    }

    @PostMapping(value = "/emotions", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<Object> getEmotions(@RequestParam("image") MultipartFile image) {
        List<Emotion> emotions = amazonRekognitionService.getEmotions(image);
        if(emotions.isEmpty()){
            return ResponseEntity.badRequest().body("There should be only one face!");
        } else {
            return ResponseEntity.ok(emotions);
        }
    }
}