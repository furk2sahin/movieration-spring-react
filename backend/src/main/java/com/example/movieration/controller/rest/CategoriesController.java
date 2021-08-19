package com.example.movieration.controller.rest;

import com.example.movieration.dto.CategoryDto;
import com.example.movieration.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.*;

@RestController
@RequestMapping("/api/categories")
@CrossOrigin
public class CategoriesController {

    private final CategoryService categoryService;

    @Autowired
    public CategoriesController(CategoryService categoryService){
        this.categoryService = categoryService;
    }

    @GetMapping("/getAll")
    public ResponseEntity<Object> getCategories() {
        List<CategoryDto> categoryDtoList = categoryService.listAllCategories();
        if (categoryDtoList.isEmpty()) {
            return ResponseEntity.badRequest().body("No categories were found");
        } else {
            return ResponseEntity.ok(categoryDtoList);
        }
    }
}
