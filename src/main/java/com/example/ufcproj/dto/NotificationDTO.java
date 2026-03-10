package com.example.ufcproj.dto;

import java.time.LocalDateTime;

public record NotificationDTO(
        Long notificationId,
        String type,
        String message,
        Long event_id,
        Long fight_id,
        boolean isRead,
        LocalDateTime createdAt
) {
}
