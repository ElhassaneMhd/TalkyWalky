package com.ipv6.controllers;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.stereotype.Controller;

import com.ipv6.models.User;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UserController {

    private final ArrayList<User> connectedUsers;

    public UserController() {
        connectedUsers = new ArrayList<>();
    }

    @MessageMapping("/user/disconnect")
    @SendTo("/topic/users")
    public ArrayList<User> disconnectUser(SimpMessageHeaderAccessor headerAccessor)  {
        String sessionId = headerAccessor.getSessionId();
        connectedUsers.removeIf(u -> u.getId().equals(sessionId));
        return connectedUsers;
    }

    @GetMapping( "/users")
    public String getAddress(@Value("${server.address}") String port) {
        return port;
    }


}
