package com.example.ufcproj.controller;

import com.example.ufcproj.dto.FightCardDTO;
import com.example.ufcproj.entity.Fighter;
import com.example.ufcproj.service.FightService;
import com.example.ufcproj.service.FighterService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/fights")
public class FightController {

    private final FightService fightService;

    public FightController(FightService fightService){
        this.fightService = fightService;
    }

    @GetMapping("/getLast5/{fighterId}")
    public List<FightCardDTO> getLast5(@PathVariable Long fighterId){
        return fightService.findLast5(fighterId);
    }



}
