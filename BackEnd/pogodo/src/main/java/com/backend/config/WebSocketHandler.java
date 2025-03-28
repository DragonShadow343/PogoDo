package com.backend.config;

import org.springframework.web.socket.WebSocketMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.CloseStatus;
import org.springframework.lang.NonNull;

public class WebSocketHandler extends TextWebSocketHandler {

	@Override
	public void handleMessage(@NonNull WebSocketSession session, @NonNull WebSocketMessage<?> message) throws Exception {
		String receivedMessage = (String) message.getPayload();
		session.sendMessage(new TextMessage("Received: " + receivedMessage));
	}

	@Override
	public void afterConnectionEstablished(@NonNull WebSocketSession session) throws Exception {
	}

	@Override
	public void afterConnectionClosed(@NonNull WebSocketSession session, @NonNull CloseStatus status) throws Exception {
	}
}