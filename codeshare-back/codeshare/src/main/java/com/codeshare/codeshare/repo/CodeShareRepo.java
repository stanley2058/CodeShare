package com.codeshare.codeshare.repo;

import java.util.Optional;

import com.codeshare.codeshare.model.Projects;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface CodeShareRepo extends MongoRepository<Projects, String> {
    public Optional<Projects> findByUUID(String UUID);
    public Optional<Projects> findByShortCode(String shortCode);
}
