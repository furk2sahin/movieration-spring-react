package com.example.movieration.dto;

import javax.validation.constraints.*;
import java.time.LocalDate;
import java.util.Date;

public class UserDto {

    @Min(value = 1, message = "Id value should be at least 1")
    private Long id;

    @NotBlank(message = "Name of the user cannot be empty")
    @Size(min = 2 , max = 100 , message = "Name must be between 2 and 100 characters long")
    private String name;

    @NotBlank(message = "Surname of the user cannot be empty")
    @Size(min = 2 , max = 100 , message = "Surname must be between 2 and 100 characters long")
    private String surname;

    @NotBlank(message = "Username of the user cannot be empty")
    @Size(min = 2 , max = 100 , message = "Username must be between 2 and 100 characters long")
    private String username;

    @Email(message = "Wrong email format.")
    private String email;

    @NotBlank(message = "Nickname of the user cannot be empty")
    @Size(min = 6 , max = 100 , message = "Nickname must be between 6 and 100 characters long")
    private String nickname;

    @NotBlank(message = "Password can't be empty.")
    @Size(min = 6, message = "Password length cannot be less then 6.")
    private String password;

    @PastOrPresent(message = "Birth date should be past or present.")
    private LocalDate birthDate;

    @NotBlank(message = "Gender can't be empty.")
    @Pattern(regexp = "^MALE$|^FEMALE$", message = "Gender must be MALE or FEMALE")
    private String gender;

    private String image;

    private Date createDate;

    private Date lastUpdateDate;

    private boolean enabled = true;

    @NotBlank(message = "Role can't be empty.")
    @Pattern(regexp = "^ADMIN$|^USER$", message = "Role must be ADMIN or USER")
    private String role;

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

    public String getSurname() {
        return surname;
    }

    public void setSurname(String surname) {
        this.surname = surname;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getNickname() {
        return nickname;
    }

    public void setNickname(String nickname) {
        this.nickname = nickname;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public LocalDate getBirthDate() {
        return birthDate;
    }

    public void setBirthDate(LocalDate birthDate) {
        this.birthDate = birthDate;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public Date getCreateDate() {
        return createDate;
    }

    public void setCreateDate(Date createDate) {
        this.createDate = createDate;
    }

    public Date getLastUpdateDate() {
        return lastUpdateDate;
    }

    public void setLastUpdateDate(Date lastUpdateDate) {
        this.lastUpdateDate = lastUpdateDate;
    }

    public boolean isEnabled() {
        return enabled;
    }

    public void setEnabled(boolean enabled) {
        this.enabled = enabled;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }
}
