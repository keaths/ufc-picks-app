package com.example.ufcproj.controller;

import com.example.ufcproj.requests.CreatePickRequest;
import com.example.ufcproj.requests.UpdatePickRequest;
import com.example.ufcproj.service.PickService;
import org.springframework.web.bind.annotation.*;

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

    @PutMapping("/update/{pickId}")
    public void updatePick(
            @RequestBody UpdatePickRequest request,
            @PathVariable Long pickId){
        pickService.updatePick(request, pickId);
    }
}
