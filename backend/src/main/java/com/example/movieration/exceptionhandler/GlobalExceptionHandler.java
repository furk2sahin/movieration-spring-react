package com.example.movieration.exceptionhandler;

import com.example.movieration.exception.AlreadyInUseException;
import com.example.movieration.exception.InvalidBirthDateException;
import com.example.movieration.exception.NotFoundException;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.util.Collections;
import java.util.HashMap;
import java.util.Map;

@ControllerAdvice
public class GlobalExceptionHandler {

    private static final String BIRTH_DATE = "birthDate";

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<Object> handleValidationExceptions(MethodArgumentNotValidException exceptions) {
        Map<String, String> validationErrors = new HashMap<>();

        exceptions.getBindingResult().getFieldErrors()
                .forEach(fieldError -> validationErrors
                        .put(fieldError.getField(), fieldError.getDefaultMessage()));

        return ResponseEntity.badRequest().body(validationErrors);
    }

    @ExceptionHandler(InvalidBirthDateException.class)
    public ResponseEntity<Map<String, String>> handleDateException(InvalidBirthDateException exception) {
        return ResponseEntity.badRequest().body(Collections.singletonMap(BIRTH_DATE, exception.getMessage()));
    }

    @ExceptionHandler(AlreadyInUseException.class)
    public ResponseEntity<Map<String, String>> handleAlreadyInUseException(AlreadyInUseException exception) {
        return ResponseEntity.badRequest().body(Collections.singletonMap("Exception", exception.getMessage()));
    }

    @ExceptionHandler(NotFoundException.class)
    public ResponseEntity<Map<String, String>> handleNotFoundException(NotFoundException exception) {
        return ResponseEntity.badRequest().body(Collections.singletonMap("Not found", exception.getMessage()));
    }

    @ExceptionHandler(HttpMessageNotReadableException.class)
    public ResponseEntity<Map<String, String>> handleMessageNotReadableException(HttpMessageNotReadableException exception) {
        String message = exception.getMessage();
        if(message == null){
            return ResponseEntity.badRequest().body(Collections.singletonMap("Error", "The request is not readable."));
        }
        if(message.contains(BIRTH_DATE)){
            return ResponseEntity.badRequest().body(Collections.singletonMap(BIRTH_DATE, "Date of Birth is invalid."));
        } else {
            return ResponseEntity.badRequest().body(Collections.singletonMap("Error", message));
        }
    }
}
