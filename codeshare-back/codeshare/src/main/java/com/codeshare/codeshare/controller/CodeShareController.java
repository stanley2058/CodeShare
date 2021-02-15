package com.codeshare.codeshare.controller;

import com.codeshare.codeshare.model.Project;
import com.codeshare.codeshare.service.CodeShareService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = {"https://codeshare.stw.tw"})
@RestController
@RequestMapping(value="/api/projects")
public class CodeShareController {
    private final CodeShareService codeShareService;

    @Autowired
    public CodeShareController(CodeShareService codeShareService) {
        this.codeShareService = codeShareService;
    }

    @GetMapping(value = "/{shortcode}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> getProjectByShortCode(@PathVariable("shortcode") String code) {
        Optional<Project> project = codeShareService.getByShortCode(code);
        if (project.isPresent()) return new ResponseEntity<>(project, HttpStatus.OK);
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @GetMapping(value = "/user/{uuid}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> getShortCodesByUUID(@PathVariable String uuid) {
        List<String> result = codeShareService.getHistoriesByUUID(uuid);
        if (result != null) return new ResponseEntity<>(
                result,
                HttpStatus.OK
        );
        else return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @PostMapping(value = "/")
    public Project postNewProject(@RequestBody Project project) {
        return codeShareService.postProject(project);
    }
}
