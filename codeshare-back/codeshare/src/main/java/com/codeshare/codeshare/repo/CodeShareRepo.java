package com.codeshare.codeshare.repo;

import java.util.List;
import java.util.Optional;

import com.codeshare.codeshare.model.Project;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface CodeShareRepo extends MongoRepository<Project, String> {
    Optional<List<Project>> findProjectsByUUID(String UUID);
    Optional<Project> findProjectByShortCode(String shortCode);
}
