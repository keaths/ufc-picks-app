package com.example.ufcproj.dto;

import java.time.LocalDateTime;

public record NotificationDTO(
        Long notificationId,
        String type,
        String message,
        EventSummaryDTO event_id,
        FightCardDTO fight_id,
        boolean isRead,
        LocalDateTime createdAt
) {
}
