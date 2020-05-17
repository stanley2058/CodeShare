package com.codeshare.codeshare.controller;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

@Controller
public class CodeShareBodySocketController {
    @MessageMapping("/contentBody")
    @SendTo("/websocket/contentBody")
    public String sendContentBody(String body) {
        return body;
    }
}
