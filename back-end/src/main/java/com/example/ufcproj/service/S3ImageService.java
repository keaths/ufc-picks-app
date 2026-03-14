package com.example.ufcproj.service;

import com.example.ufcproj.entity.Fighter;
import com.example.ufcproj.repository.FighterRepository;
import org.springframework.stereotype.Service;
import software.amazon.awssdk.core.sync.RequestBody;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;

import java.io.IOException;
import java.io.InputStream;
import java.net.URI;
import java.net.URL;

@Service
public class S3ImageService {

    private final S3Client s3Client;
    private final String bucket = "ufc-picks-images";
    private final FighterRepository fighterRepository;

    public S3ImageService(S3Client s3Client, FighterRepository fighterRepository){
        this.s3Client = s3Client;
        this.fighterRepository = fighterRepository;
    }

    public void convertFighterImageToS3(Fighter fighter) throws IOException {
        if(fighter.getHeadshotUrl() == null || fighter.getHeadshotUrl().contains("s3.amazonaws.com")){
            return;
        }
        URI uri = URI.create(fighter.getHeadshotUrl());
        URL url = uri.toURL();

        try (InputStream stream = url.openStream()) {
            byte[] bytes = stream.readAllBytes();
            String key = "fighters/" + fighter.getFighterId() + ".png";

            PutObjectRequest request = PutObjectRequest.builder()
                    .bucket(bucket)
                    .key(key)
                    .contentType("image/png")
                    .build();
            s3Client.putObject(request, RequestBody.fromBytes(bytes));
            fighter.setHeadshotUrl("https://" + bucket + ".s3.amazonaws.com/" + key);
            fighterRepository.save(fighter);
        }
    }

}
