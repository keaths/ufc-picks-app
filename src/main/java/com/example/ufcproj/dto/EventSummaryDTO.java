package com.example.ufcproj.dto;

import java.time.LocalDate;

public record EventSummaryDTO(
        Long eventId,
        String eventName,
        LocalDate eventDate,
        String location,
        boolean picksLocked,
        boolean isTitle,
        FighterSummaryDTO redFighter,
        FighterSummaryDTO blueFighter
) {
}
