package com.codeshare.codeshare.service;

import com.codeshare.codeshare.model.Project;
import com.codeshare.codeshare.repo.CodeShareRepo;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class CodeShareService {
    private final CodeShareRepo codeShareRepo;
    public CodeShareService(CodeShareRepo codeShareRepo) {
        this.codeShareRepo = codeShareRepo;
    }

    public Optional<Project> getByShortCode(String code) {
        return codeShareRepo.findByShortCode(code);
    }
}
