package com.example.ufcproj.dto;

public record FighterSummaryDTO(
        Long fighterId,
        String firstName,
        String lastName,
        String nickName,
        String imageUrl
) {
}
