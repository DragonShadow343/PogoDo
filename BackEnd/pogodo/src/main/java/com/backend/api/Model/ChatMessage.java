package com.backend.api.Model;

public class ChatMessage {
    private String content;
    private String sender;
    private String timestamp;

    // Constructor
    public ChatMessage(String content, String sender, String timestamp) {
        this.content = content;
        this.sender = sender;
        this.timestamp = timestamp;
    }

    // Getters and Setters
    public String getContent() { return content; }
    public void setContent(String content) { this.content = content; }

    public String getSender() { return sender; }
    public void setSender(String sender) { this.sender = sender; }

    public String getTimestamp() { return timestamp; }
    public void setTimestamp(String timestamp) { this.timestamp = timestamp; }
}
