package com.example.ufcproj.dto;

public record PickDTO (
        Long userId,
        Long fightId,
        Long pickedFighterId,
        FighterSummaryDTO pickedFighter,
        String pickedMethod,
        Integer pickedRound,
        Integer pointsAward
){
}
