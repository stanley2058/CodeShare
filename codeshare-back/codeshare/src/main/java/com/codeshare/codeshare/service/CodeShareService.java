package com.codeshare.codeshare.service;

import com.codeshare.codeshare.model.Project;
import com.codeshare.codeshare.repo.CodeShareRepo;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collections;
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

    public Project postProject(Project project) {
        if (project == null) return null;
        System.out.println(project);
        if (project.id == null) {
            int tryCount = 0;
            do {
                if (tryCount < 3) project.shortCode = generateShortCode(6);
                else project.shortCode = generateShortCode(7);
                ++tryCount;
            } while (getByShortCode(project.shortCode).isPresent());
        }
        return codeShareRepo.save(project);
    }

    private String generateShortCode(int len) {
        final int intStart = 48;
        final int intEnd = 57;
        final int alphaUpperStart = 65;
        final int alphaUpperEnd = 90;
        final int alphaLowerStart = 97;
        final int alphaLowerEnd = 122;

        ArrayList<Integer> list = new ArrayList<>();
        for (int i = intStart; i <= intEnd; ++i) list.add(i);
        for (int i = alphaUpperStart; i <= alphaUpperEnd; ++i) list.add(i);
        for (int i = alphaLowerStart; i <= alphaLowerEnd; ++i) list.add(i);
        Collections.shuffle(list);

        StringBuilder builder = new StringBuilder();
        for (int i = 0; i < len; ++i)
            builder.append((char)(int)list.get((int)(Math.random() * list.size())));
        return builder.toString();
    }
}
