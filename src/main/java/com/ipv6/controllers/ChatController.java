package com.ipv6.controllers;

import com.ipv6.models.Message;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

import java.util.Date;

@Controller
public class ChatController {

    private final SimpMessagingTemplate brokerMessagingTemplate;

    public ChatController(SimpMessagingTemplate brokerMessagingTemplate) {
        this.brokerMessagingTemplate = brokerMessagingTemplate;
    }

    @MessageMapping("/chat") // Client sends messages to /app/chat
    @SendTo("/topic/messages") // Broadcast messages to /topic/messages
    public Message sendMessage(@Payload Message message ,SimpMessageHeaderAccessor headerAccessor)  {
        String sessionId = headerAccessor.getSessionId(); // Get session ID of the sender
        message.setId(sessionId); // Set the session ID as the message ID
        message.setReceiver(message.getReceiver());
        message.setTimestamp(new Date()); // Set the timestamp of the message
        return message; // Broadcast the message to all subscribed clients
    }

    @MessageMapping("/chat/private")
    public void sendPrivateMessage(Message message) {
        if (message.getReceiver() == null) {
            throw new IllegalArgumentException("Receiver must be specified!");
        }

        brokerMessagingTemplate.convertAndSendToUser(
                message.getReceiver(), // Receiver's username
                "/queue/messages",     // Destination
                message                // Message content
        );
    }


}
