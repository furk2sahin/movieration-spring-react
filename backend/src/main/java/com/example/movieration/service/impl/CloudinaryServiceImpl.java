package com.example.movieration.service.impl;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import com.example.movieration.service.CloudinaryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.IOException;

@Service
public class CloudinaryServiceImpl implements CloudinaryService {

	private final Cloudinary cloudinary;
	
	@Autowired
	public CloudinaryServiceImpl(Cloudinary cloudinary) {
		this.cloudinary = cloudinary;
	}


	@Override
	public String save(String base64Image) {
		 try{
			 return (String) cloudinary.uploader().upload(
	            		base64Image,
						ObjectUtils.emptyMap()
				).get("url");
		 } catch (IOException e){
	           e.printStackTrace();
		 }
		 return null;
	}

	@Override
	public void destroy(String path) {
		String[] splitPath = path.split("/");
		String key = splitPath[splitPath.length-1].split("\\.")[0];
		try {
			cloudinary.uploader().destroy(key, ObjectUtils.emptyMap());
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
}