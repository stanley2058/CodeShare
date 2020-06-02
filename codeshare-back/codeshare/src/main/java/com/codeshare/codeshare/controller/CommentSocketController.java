package com.codeshare.codeshare.controller;

import com.codeshare.codeshare.model.Comment;
import com.codeshare.codeshare.service.CodeShareService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

@Controller
public class CommentSocketController {
    private final CodeShareService codeShareService;

    @Autowired
    public CommentSocketController(CodeShareService codeShareService) {
        this.codeShareService = codeShareService;
    }

    @MessageMapping("/comment/{shortCode}")
    @SendTo("/websocket/comments/{shortCode}")
    public String sendComment(@DestinationVariable String shortCode, Comment comment) {
        comment.timestamp = System.currentTimeMillis();
        codeShareService.updateCommentViaWebsocket(shortCode, comment);
        return comment.toString();
    }
}
