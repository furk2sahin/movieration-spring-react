package com.example.movieration.configuration;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.env.Environment;

@Configuration
public class CloudinaryConfig {

	private final Environment environment;

	@Autowired
	public CloudinaryConfig(Environment environment) {
		this.environment = environment;
	}

	
	
	@Bean
	public Cloudinary cloudinaryUser(){
	    return new Cloudinary(ObjectUtils.asMap(
	         "cloud_name", environment.getProperty("cloudinary.cloud.name"),
	         "api_key", environment.getProperty("cloudinary.api.key"),
	         "api_secret", environment.getProperty("cloudinary.api.secret")));
	}
}