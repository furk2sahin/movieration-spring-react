package com.example.movieration.exception;

public class AlreadyInUseException extends IllegalArgumentException{
    public AlreadyInUseException(String message) {
        super(message);
    }
}
