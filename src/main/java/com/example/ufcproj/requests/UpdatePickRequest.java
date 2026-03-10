package com.example.ufcproj.requests;

public record UpdatePickRequest(
        Long pickedFighterId,
        String method,
        int endRound
) {
}
