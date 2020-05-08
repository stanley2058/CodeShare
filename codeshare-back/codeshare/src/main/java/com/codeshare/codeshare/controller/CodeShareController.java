package com.codeshare.codeshare.controller;


import com.codeshare.codeshare.model.Projects;
import com.codeshare.codeshare.repo.CodeShareRepo;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(value="/api/projects")
public class CodeShareController {
    private final CodeShareRepo codeShareRepo;

    public CodeShareController(CodeShareRepo codeShareRepo) {
        this.codeShareRepo = codeShareRepo;
    }

    @GetMapping(value="/all", produces=MediaType.APPLICATION_JSON_VALUE)
    public List<Projects> getAllCustomers() {
        return codeShareRepo.findAll();
    }
}
