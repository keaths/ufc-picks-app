package com.example.ufcproj.controller;

import com.example.ufcproj.dto.FightCardDTO;
import com.example.ufcproj.dto.NotificationDTO;
import com.example.ufcproj.entity.Fighter;
import com.example.ufcproj.service.FighterService;
import com.example.ufcproj.service.NotificationService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/notifs")
public class NotificationsController {

    private final NotificationService notificationService;

    public NotificationsController(NotificationService notificationService){
        this.notificationService = notificationService;
    }

    @GetMapping("/getNotifs/{userId}")
    public List<NotificationDTO> getNotifs(@PathVariable Long userId){
        return notificationService.getNotificaitons(userId);
    }



}
