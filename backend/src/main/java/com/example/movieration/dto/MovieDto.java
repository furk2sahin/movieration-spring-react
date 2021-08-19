package com.example.movieration.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.validation.constraints.*;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;

public class MovieDto {

    @Min(value = 1, message = "Id value should be at least 1")
    private Long id;

    @NotBlank(message = "Name of the movie cannot be empty")
    @Size(min = 2 , max = 100 , message = "Name must be between 2 and 100 characters long")
    private String name;

    @NotBlank(message = "Movie should have a description")
    @Size(min = 1)
    private String description;

    private String thumbnail;

    @NotBlank(message = "Director of the movie has to be written")
    private String director;

    @PastOrPresent(message = "Movie release date should be past or present")
    private LocalDate releaseDate;

    private String budget;

    private double rating = 0;

    @JsonIgnoreProperties({"emotions", "movies"})
    private Set<CategoryDto> categories = new HashSet<>();

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getThumbnail() {
        return thumbnail;
    }

    public void setThumbnail(String thumbnail) {
        this.thumbnail = thumbnail;
    }

    public String getDirector() {
        return director;
    }

    public void setDirector(String director) {
        this.director = director;
    }

    public LocalDate getReleaseDate() {
        return releaseDate;
    }

    public void setReleaseDate(LocalDate releaseDate) {
        this.releaseDate = releaseDate;
    }

    public String getBudget() {
        return budget;
    }

    public void setBudget(String budget) {
        this.budget = budget;
    }

    public double getRating() {
        return rating;
    }

    public void setRating(double rating) {
        this.rating = rating;
    }

    public Set<CategoryDto> getCategories() {
        return categories;
    }

    public void setCategories(Set<CategoryDto> categories) {
        this.categories = categories;
    }

}
