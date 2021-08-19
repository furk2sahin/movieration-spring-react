package com.example.movieration.controller.rest;

import com.example.movieration.dto.EmotionDto;
import com.example.movieration.service.EmotionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/emotions")
@CrossOrigin
public class EmotionsController {

    private final EmotionService emotionService;

    @Autowired
    public EmotionsController(EmotionService emotionService){
        this.emotionService = emotionService;
    }

    @GetMapping("/getAll")
    public ResponseEntity<Object> getEmotions(){
        List<EmotionDto> emotionDtoList = emotionService.listAllEmotions();
        if(emotionDtoList.isEmpty()){
            return ResponseEntity.badRequest().body("No emotions were found!");
        }
        else{
            return ResponseEntity.ok(emotionDtoList);
        }
    }
}
