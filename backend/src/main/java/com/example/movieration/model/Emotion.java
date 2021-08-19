package com.example.movieration.model;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "emotions")
public class Emotion {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name= "emotion")
    private String emotion;

    @ManyToMany
    @JoinTable(
            name = "category_emotions",
            joinColumns = @JoinColumn(name = "emotion_id"),
            foreignKey = @ForeignKey(name = "fk_category_emotion"),
            inverseJoinColumns = @JoinColumn(name = "category_id"),
            inverseForeignKey = @ForeignKey(name = "fk_emotion_category")
    )
    private Set<Category> categories = new HashSet<>();

    public Emotion() {

    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getEmotion() {
        return emotion;
    }

    public void setEmotion(String emotion) {
        this.emotion = emotion;
    }

    public Set<Category> getCategories() {
        return categories;
    }

    public void setCategories(Set<Category> categories) {
        this.categories = categories;
    }
}
