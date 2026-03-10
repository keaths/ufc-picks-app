package com.example.ufcproj.service;

import com.example.ufcproj.dto.EventDetailsDTO;
import com.example.ufcproj.dto.FightCardDTO;
import com.example.ufcproj.dto.FighterSummaryDTO;
import com.example.ufcproj.dto.EventSummaryDTO;
import com.example.ufcproj.entity.*;
import com.example.ufcproj.repository.EventRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class EventService {

    private final EventRepository eventRepo;

    public EventService(EventRepository eventRepo){
        this.eventRepo = eventRepo;
    }

    public List<EventSummaryDTO>  getAllUpcomingEvents(){
        return eventRepo.findByStatus(Event.Status.SCHEDULED)
                .stream()
                .map(event -> new EventSummaryDTO(
                        event.getEventId(),
                        event.getEventName(),
                        event.getEventDate(),
                        event.getLocation(),
                        event.isPicksLocked(),
                        event.getFights().getFirst().getIsTitleBout(),
                        mapFighter(event.getFights().getFirst().getRedFighterId()),
                        mapFighter(event.getFights().getFirst().getBlueFighterId())
                ))
                .toList();
    }

    public EventDetailsDTO getEventDetails(Long eventId){
        Event event = eventRepo.findByEventId(eventId);
        return new EventDetailsDTO(
                eventId,
                event.getEventName(),
                mapFights(event.getFights())
        );
    }

    private FighterSummaryDTO mapFighter(Fighter fighter){
        return new FighterSummaryDTO(
                fighter.getFighterId(),
                fighter.getFirstName(),
                fighter.getLastName(),
                fighter.getNickname(),
                fighter.getHeadshotUrl()
        );
    }

    private List<FightCardDTO> mapFights(List<Fight> fights){
        List<FightCardDTO> mappedFights = new ArrayList<>();
        for(Fight fight : fights){
            mappedFights.add(new FightCardDTO(
                    fight.getFightId(),
                    fight.getWeightClass(),
                    fight.getIsTitleBout(),
                    fight.getStatus().toString(),
                    mapFighter(fight.getRedFighterId()),
                    mapFighter(fight.getBlueFighterId())
            ));
        }
        return  mappedFights;
    }

}
