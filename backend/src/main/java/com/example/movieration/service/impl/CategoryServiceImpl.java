package com.example.movieration.service.impl;

import com.example.movieration.dto.CategoryDto;
import com.example.movieration.mapper.CategoryMapper;
import com.example.movieration.model.Category;
import com.example.movieration.repository.CategoryRepository;
import com.example.movieration.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class CategoryServiceImpl implements CategoryService {

    private final CategoryRepository categoryRepository;
    private final CategoryMapper categoryMapper;

    @Autowired
    public CategoryServiceImpl(CategoryRepository categoryRepository, CategoryMapper categoryMapper){
        this.categoryRepository = categoryRepository;
        this.categoryMapper = categoryMapper;
    }

    @Override
    public List<CategoryDto> listAllCategories(){
        List<Category> categories = categoryRepository.findAll();
        return categoryMapper.categoriesToCategoryDtos(categories);
    }

    @Override
    public CategoryDto addNewCategory(CategoryDto categoryDto){
        Category category = categoryMapper.categoryDtoToCategory(categoryDto);
        categoryRepository.save(category);
        return categoryMapper.categoryToCategoryDto(category);
    }

    @Override
    public String deleteCategoryById(Long id){
        if(categoryRepository.existsById(id)){
            categoryRepository.deleteById(id);
            return "Category is successfully deleted by id: " + id;
        }
        else{
            return "No such category were found with given id: " +id;
        }
    }

    @Override
    public long getCount() {
        return categoryRepository.count();
    }
}
