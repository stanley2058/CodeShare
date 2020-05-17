package com.codeshare.codeshare.repo;

import java.util.Optional;

import com.codeshare.codeshare.model.Project;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface CodeShareRepo extends MongoRepository<Project, String> {
    public Optional<Project> findByUUID(String UUID);
    public Optional<Project> findByShortCode(String shortCode);
}
