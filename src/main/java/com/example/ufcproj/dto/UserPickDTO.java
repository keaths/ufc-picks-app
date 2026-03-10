package com.example.ufcproj.dto;

public record UserPickDTO(
        Long pickedFighterId,
        String method,
        Integer endRound
) {
}
