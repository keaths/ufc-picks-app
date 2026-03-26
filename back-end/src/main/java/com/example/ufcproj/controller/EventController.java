package com.example.ufcproj.controller;

import com.example.ufcproj.dto.EventDetailsDTO;
import com.example.ufcproj.dto.EventSummaryDTO;
import com.example.ufcproj.service.EventService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/events")
public class EventController {

    private final EventService eventService;

    public EventController(EventService eventService){
        this.eventService = eventService;
    }

    @GetMapping("/getAllUpcoming")
    public List<EventSummaryDTO> getAllUpcomingEvents(){
        return eventService.getAllUpcomingEvents();
    }

    @GetMapping("/{eventId}/details")
    public EventDetailsDTO getEventDetails(@PathVariable Long eventId){
        return eventService.getEventDetails(eventId);
    }

    @GetMapping("/getPickedUpcomingEvents/{userId}")
    public List<EventSummaryDTO> getPickedUpcomingEvents(@PathVariable Long userId){
        return eventService.getPickedUpcomingEvents(userId);
    }

    @GetMapping("/getPickedPastEvents/{userId}")
    public List<EventSummaryDTO> getPickedPastEvents(@PathVariable Long userId){
        return eventService.getPickedPastEvents(userId);
    }

    @GetMapping("/getEventById/{eventId}")
    public EventSummaryDTO getEventById(@PathVariable Long eventId){
        return eventService.findByEventId(eventId);
    }
}
