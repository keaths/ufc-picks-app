package com.example.ufcproj.controller;

import com.example.ufcproj.entity.Fighter;
import com.example.ufcproj.service.FighterService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/fighters")
public class FighterController {

    private final FighterService fighterService;

    public FighterController(FighterService fighterService){
        this.fighterService = fighterService;
    }

    @GetMapping
    public List<Fighter> getAllFighters(){
        return fighterService.getAllFighters();
    }

}
