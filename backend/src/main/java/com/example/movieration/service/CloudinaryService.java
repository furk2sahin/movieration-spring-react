package com.example.movieration.service;

public interface CloudinaryService {

	String save(String base64Image);
	void destroy(String path);
}