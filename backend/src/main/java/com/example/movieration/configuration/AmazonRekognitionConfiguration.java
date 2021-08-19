package com.example.movieration.configuration;

import com.amazonaws.auth.AWSStaticCredentialsProvider;
import com.amazonaws.auth.BasicAWSCredentials;
import com.amazonaws.regions.Regions;
import com.amazonaws.services.rekognition.AmazonRekognition;
import com.amazonaws.services.rekognition.AmazonRekognitionClientBuilder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.env.Environment;

@Configuration
public class AmazonRekognitionConfiguration {

    private final Environment environment;

    @Autowired
    public AmazonRekognitionConfiguration(Environment environment) {
        this.environment = environment;
    }

    @Bean
    public AmazonRekognition amazonRekognition() {

        BasicAWSCredentials credentials = new BasicAWSCredentials(
                environment.getProperty("amazon.access.key.id"),
                environment.getProperty("amazon.secret.access.key")
        );
        return AmazonRekognitionClientBuilder
                .standard()
                .withRegion(Regions.EU_WEST_1)
                .withCredentials(new AWSStaticCredentialsProvider(credentials))
                .build();
    }
}
