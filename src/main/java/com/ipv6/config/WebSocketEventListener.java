package com.ipv6.config;

import java.util.ArrayList;
import java.util.Date;

import org.springframework.context.event.EventListener;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.messaging.SessionConnectEvent;
import org.springframework.web.socket.messaging.SessionDisconnectEvent;

import com.ipv6.models.User;

@Component
public class WebSocketEventListener {

    private final SimpMessagingTemplate messagingTemplate;
    private final ArrayList<User> connectedUsers = new ArrayList<>();

    public WebSocketEventListener(SimpMessagingTemplate messagingTemplate) {
        this.messagingTemplate = messagingTemplate;
    }

    @EventListener
    public void handleWebSocketConnectListener(SessionConnectEvent event) {
        String sessionId = SimpMessageHeaderAccessor.wrap(event.getMessage()).getSessionId();
        String type = SimpMessageHeaderAccessor.wrap(event.getMessage()).getFirstNativeHeader("type");
        String name = SimpMessageHeaderAccessor.wrap(event.getMessage()).getFirstNativeHeader("name");

        boolean userExists = connectedUsers.stream().anyMatch(user -> user.getId().equals(sessionId));
        boolean nameExists = connectedUsers.stream().anyMatch(user -> user.getName().equals(name));

        if (!userExists && !nameExists  && type == null) {
            User user = new User();
            user.setId(sessionId);
            user.setName(name);
            user.setTimestamp(new Date());
            user.setStatus("online");
            connectedUsers.add(user);
        }
        if (nameExists) {
            connectedUsers.forEach(user -> {
                if (user.getName().equals(name)) {
                    user.setId(sessionId);
                    user.setTimestamp(new Date());
                    user.setStatus("online");
                }
            });
        }

        broadcastConnectedUsers();
    }

    @EventListener
    public void handleWebSocketDisconnectListener(SessionDisconnectEvent event) {
        String sessionId = SimpMessageHeaderAccessor.wrap(event.getMessage()).getSessionId();
        connectedUsers.forEach(user -> {
            if (user.getId().equals(sessionId)) {
                user.setStatus("offline");
            }
        });
        broadcastConnectedUsers();
    }


    private void broadcastConnectedUsers() {
        messagingTemplate.convertAndSend("/topic/users", connectedUsers);
    }




}
