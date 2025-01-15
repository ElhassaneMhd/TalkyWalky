package com.ipv6.controllers;

import com.ipv6.models.User;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.stereotype.Controller;

import java.util.ArrayList;
import java.util.Date;
import java.util.concurrent.ConcurrentHashMap;

@Controller
public class UserController {

    private final ArrayList<User> connectedUsers;

    public UserController() {
        connectedUsers = new ArrayList<>();
    }



    @MessageMapping("/user/disconnect") // Client sends messages to /app/chat
    @SendTo("/topic/users") // Broadcast messages to /topic/messages
    public ArrayList<User> disconnectUser(SimpMessageHeaderAccessor headerAccessor)  {
        String sessionId = headerAccessor.getSessionId(); // Get session ID of the sender
        connectedUsers.removeIf(u -> u.getId().equals(sessionId)); // Remove the user from the list of connected users
        // Return the updated list of connected users
        return connectedUsers;
    }


}
