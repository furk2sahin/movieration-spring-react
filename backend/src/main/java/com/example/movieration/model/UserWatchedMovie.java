package com.example.movieration.model;

import javax.persistence.*;


@Entity
@Table(name="user_watched_movies")
public class UserWatchedMovie {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id", foreignKey = @ForeignKey(name = "fk_watched_movie_user"))
    private User user;

    @ManyToOne
    @JoinColumn(name = "movie_id", foreignKey = @ForeignKey(name = "fk_watched_movie"))
    private Movie movie;

    public UserWatchedMovie() {
        // no-args constructor
    }

    public UserWatchedMovie(Long id, User user, Movie movie) {
        this.id = id;
        this.user = user;
        this.movie = movie;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Movie getMovie() {
        return movie;
    }

    public void setMovie(Movie movie) {
        this.movie = movie;
    }
}
