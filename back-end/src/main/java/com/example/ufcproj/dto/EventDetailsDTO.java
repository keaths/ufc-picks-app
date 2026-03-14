package com.example.ufcproj.dto;

import java.time.LocalDate;
import java.util.List;

public record EventDetailsDTO(
        Long eventId,
        String eventName,
        List<FightCardDTO> fights
) {
}
