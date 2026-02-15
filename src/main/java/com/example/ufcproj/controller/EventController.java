package com.example.ufcproj.controller;

import com.example.ufcproj.entity.Event;
import com.example.ufcproj.service.EventService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/events")
public class EventController {

    private final EventService eventService;

    public EventController(EventService eventService){
        this.eventService = eventService;
    }

    @GetMapping("/getAll")
    public List<Event> getAllEvents(){
        return eventService.getAllEvents();
    }
}
