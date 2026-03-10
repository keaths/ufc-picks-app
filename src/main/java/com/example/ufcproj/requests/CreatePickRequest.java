package com.example.ufcproj.requests;

import com.example.ufcproj.entity.Pick;

public record CreatePickRequest(
        Long userId,
        Long fightId,
        Long pickedFighterId,
        String method,
        Integer endRound
) {
}
