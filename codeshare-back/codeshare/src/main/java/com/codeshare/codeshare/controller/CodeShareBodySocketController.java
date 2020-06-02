package com.codeshare.codeshare.controller;

import com.codeshare.codeshare.model.WsProjectBody;
import com.codeshare.codeshare.service.CodeShareService;
import com.google.gson.Gson;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

@Controller
public class CodeShareBodySocketController {
    private final CodeShareService codeShareService;

    @Autowired
    public CodeShareBodySocketController(CodeShareService codeShareService) {
        this.codeShareService = codeShareService;
    }

    @MessageMapping("/contentBody/{shortCode}")
    @SendTo("/websocket/contentBody/{shortCode}")
    public String sendContentBody(@DestinationVariable String shortCode, WsProjectBody project) {
        return new Gson().toJson(codeShareService.updateProjectViaWebsocket(shortCode, project));
    }
}
