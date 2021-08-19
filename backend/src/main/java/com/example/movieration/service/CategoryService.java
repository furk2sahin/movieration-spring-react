package com.example.movieration.service;

import com.example.movieration.dto.CategoryDto;


import java.util.*;

public interface CategoryService {
    List<CategoryDto> listAllCategories();
    CategoryDto addNewCategory(CategoryDto categoryDto);
    String deleteCategoryById(Long id);
    long getCount();
}
