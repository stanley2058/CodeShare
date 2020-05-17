package com.codeshare.codeshare.controller;

import com.codeshare.codeshare.model.Comment;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

@Controller
public class CommentSocketController {
    @MessageMapping("/comment")
    @SendTo("/websocket/comments")
    public Comment sendComment(Comment comment) throws Exception {
        Thread.sleep(1000); // simulated delay
        System.out.println(comment);
        return comment;
    }
}
