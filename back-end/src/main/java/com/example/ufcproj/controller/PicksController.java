package com.example.ufcproj.controller;

import com.example.ufcproj.dto.PickDTO;
import com.example.ufcproj.requests.CreatePickRequest;
import com.example.ufcproj.requests.UpdatePickRequest;
import com.example.ufcproj.service.PickService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/picks")
public class PicksController {

    private PickService pickService;

    public PicksController(PickService pickService){
        this.pickService = pickService;
    }

    @PostMapping
    public void createPick(@RequestBody CreatePickRequest request){
        pickService.createPick(request);
        return;
    }

    @GetMapping("/{userId}/event/{eventId}")
    public List<PickDTO> getPicks(@PathVariable Long userId, @PathVariable Long eventId){
        return pickService.getPicks(userId, eventId);
    }

    @PutMapping("/update/{pickId}")
    public void updatePick(
            @RequestBody UpdatePickRequest request,
            @PathVariable Long pickId){
        pickService.updatePick(request, pickId);
    }

    @GetMapping("/getCount/{userId}/event/{eventId}")
    public Integer getCount(@PathVariable Long userId, @PathVariable Long eventId){
        return pickService.getCount(userId, eventId);
    }
}
