package com.example.movieration.exception;

public class InvalidBirthDateException extends IllegalArgumentException{
    public InvalidBirthDateException() {
        super("Invalid birth date.");
    }
}