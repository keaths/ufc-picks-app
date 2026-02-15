package com.example.ufcproj.service;

import com.example.ufcproj.entity.Event;
import com.example.ufcproj.repository.EventRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EventService {

    private final EventRepository eventRepo;

    public EventService(EventRepository eventRepo){
        this.eventRepo = eventRepo;
    }

    public List<Event> getAllEvents(){
        return eventRepo.findAll();
    }
}
