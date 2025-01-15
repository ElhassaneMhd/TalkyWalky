package com.ipv6.models;

import java.util.Date;

public class Message {
    private String id;
    private String name;
    private String content;
    private Date timestamp;
    private String receiver;


    // Getters and setters
    public String getId() {
        return id;
    }
    public void setId(String id) {
        this.id = id;
    }
    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }

    public Date getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(Date timestamp) {
        this.timestamp = timestamp;
    }

    public String getContent() {
        return content;
    }
    public void setContent(String content) {
        this.content = content;
    }

    public String getReceiver() {
        return receiver;
    }

    public void setReceiver(String receiver) {
        this.receiver = receiver;
    }

    @Override
    public String toString() {
        return "Message{" +
                "id='" + id + '\'' +
                "name='" + name + '\'' +
                ", content='" + content + '\'' +
                ", receiver='" + receiver + '\'' +
                ", date=" + timestamp +
                '}';
    }
}
