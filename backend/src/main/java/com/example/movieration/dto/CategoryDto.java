package com.example.movieration.dto;

import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;

public class CategoryDto {

    @Min(value = 1, message = "Category id  should be at least 1")
    private Long id;

    @NotBlank
    private String genre;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getGenre() {
        return genre;
    }

    public void setGenre(String genre) {
        this.genre = genre;
    }
}
