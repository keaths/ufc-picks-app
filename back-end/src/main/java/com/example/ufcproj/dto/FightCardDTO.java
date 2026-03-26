package com.example.ufcproj.dto;

public record FightCardDTO(
        Long fightId,
        String weightClass,
        boolean isTitleFight,
        String status,
        FighterSummaryDTO redFighter,
        FighterSummaryDTO blueFighter,
        String winnerCorner,
        String method,
        Integer endRound
) {
}
