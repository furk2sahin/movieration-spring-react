package com.example.movieration.mapper;

import com.example.movieration.dto.CategoryDto;
import com.example.movieration.model.Category;
import org.mapstruct.*;
import java.util.*;

@Mapper(componentModel = "spring")
public interface CategoryMapper {

    Category categoryDtoToCategory(CategoryDto categoryDto);

    @Named("categoryToCategoryDto")
    CategoryDto categoryToCategoryDto(Category category);

    @IterableMapping(qualifiedByName = "categoryToCategoryDto")
    List<CategoryDto> categoriesToCategoryDtos(List<Category> categories);
}
