package com.codeshare.codeshare.service;

import com.codeshare.codeshare.model.Comment;
import com.codeshare.codeshare.model.Project;
import com.codeshare.codeshare.model.WsProjectBody;
import com.codeshare.codeshare.repo.CodeShareRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Optional;

@Service
public class CodeShareService {
    private final CodeShareRepo codeShareRepo;

    @Autowired
    public CodeShareService(CodeShareRepo codeShareRepo) {
        this.codeShareRepo = codeShareRepo;
    }

    public Optional<Project> getByShortCode(String code) {
        return codeShareRepo.findProjectByShortCode(code);
    }

    public Project postProject(Project project) {
        if (project == null) return null;
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

    public WsProjectBody updateProjectViaWebsocket(String shortCode, WsProjectBody project) {
        Optional<Project> op = codeShareRepo.findProjectByShortCode(shortCode);
        if (op.isEmpty()) return null;
        Project projectInDb = op.get();
        projectInDb.body = project.body;
        projectInDb.isReadonly = project.isReadonly;
        projectInDb.language = project.language;
        codeShareRepo.save(projectInDb);
        return project;
    }

    public void updateCommentViaWebsocket(String shortCode, Comment comment) {
        Optional<Project> op = codeShareRepo.findProjectByShortCode(shortCode);
        if (op.isEmpty()) return;
        Project projectInDb = op.get();
        projectInDb.comments.add(comment);
        codeShareRepo.save(projectInDb);
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
