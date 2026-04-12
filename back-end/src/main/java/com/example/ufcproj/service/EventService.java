package com.example.ufcproj.service;

import com.example.ufcproj.dto.EventDetailsDTO;
import com.example.ufcproj.dto.FightCardDTO;
import com.example.ufcproj.dto.FighterSummaryDTO;
import com.example.ufcproj.dto.EventSummaryDTO;
import com.example.ufcproj.entity.*;
import com.example.ufcproj.repository.EventRepository;
import com.example.ufcproj.repository.PicksRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
public class EventService {

    private final EventRepository eventRepo;
    private final PicksRepository picksRepo;

    public EventService(EventRepository eventRepo, PicksRepository picksRepository){
        this.eventRepo = eventRepo;
        this.picksRepo = picksRepository;
    }

    public List<EventSummaryDTO>  getAllUpcomingEvents(){
        return eventRepo.findByStatusOrStatus(Event.Status.SCHEDULED, Event.Status.IN_PROGRESS)
                .stream()
                .map(event -> new EventSummaryDTO(
                        event.getEventId(),
                        event.getEventName(),
                        event.getEventDate(),
                        event.getLocation(),
                        event.isPicksLocked(),
                        event.getFights().getFirst().getIsTitleBout(),
                        mapFighter(Objects.requireNonNull(event.getFights().stream()
                                .filter(f -> f.getBoutOrder() != null)
                                .findFirst()
                                .orElse(null)).getRedFighterId()),
                        mapFighter(Objects.requireNonNull(event.getFights().stream()
                                .filter(f -> f.getBoutOrder() != null)
                                .findFirst()
                                .orElse(null)).getBlueFighterId()),
                        picksRepo.countByUserUserIdAndFightEventEventId(1L, event.getEventId()),
                        event.getFights().size(),
                        picksRepo.getCorrectPicksforEvent(1L, event.getEventId())
                ))
                .toList();
    }

    public EventSummaryDTO findByEventId(Long eventId){
        Event event = eventRepo.findByEventId(eventId);
        EventSummaryDTO eventSum = new EventSummaryDTO(
                        event.getEventId(),
                        event.getEventName(),
                        event.getEventDate(),
                        event.getLocation(),
                        event.isPicksLocked(),
                        event.getFights().getFirst().getIsTitleBout(),
                mapFighter(Objects.requireNonNull(event.getFights().stream()
                        .filter(f -> f.getBoutOrder() != null)
                        .findFirst()
                        .orElse(null)).getRedFighterId()),
                mapFighter(Objects.requireNonNull(event.getFights().stream()
                        .filter(f -> f.getBoutOrder() != null)
                        .findFirst()
                        .orElse(null)).getBlueFighterId()),
                picksRepo.countByUserUserIdAndFightEventEventId(1L, event.getEventId()),
                        event.getFights().size(),
                        picksRepo.getCorrectPicksforEvent(1L, event.getEventId())
                );
        return eventSum;
    }

    public List<EventSummaryDTO> getPickedUpcomingEvents(Long userId){
        return eventRepo.findDistinctEventsByUserIdOrderByEventDateDesc(userId)
                .stream()
                .map(event -> new EventSummaryDTO(
                        event.getEventId(),
                        event.getEventName(),
                        event.getEventDate(),
                        event.getLocation(),
                        event.isPicksLocked(),
                        event.getFights().getFirst().getIsTitleBout(),
                        mapFighter(Objects.requireNonNull(event.getFights().stream()
                                .filter(f -> f.getBoutOrder() != null)
                                .findFirst()
                                .orElse(null)).getRedFighterId()),
                        mapFighter(Objects.requireNonNull(event.getFights().stream()
                                .filter(f -> f.getBoutOrder() != null)
                                .findFirst()
                                .orElse(null)).getBlueFighterId()),
                        picksRepo.countByUserUserIdAndFightEventEventId(1L, event.getEventId()),
                        event.getFights().size(),
                        picksRepo.getCorrectPicksforEvent(1L, event.getEventId())
                ))
                .toList();
    }

    public List<EventSummaryDTO> getPickedPastEvents(Long userId){
        return eventRepo.findPastPickedEvents(userId)
                .stream()
                .map(event -> new EventSummaryDTO(
                        event.getEventId(),
                        event.getEventName(),
                        event.getEventDate(),
                        event.getLocation(),
                        event.isPicksLocked(),
                        event.getFights().getFirst().getIsTitleBout(),
                        mapFighter(Objects.requireNonNull(event.getFights().stream()
                                .filter(f -> f.getBoutOrder() != null)
                                .findFirst()
                                .orElse(null)).getRedFighterId()),
                        mapFighter(Objects.requireNonNull(event.getFights().stream()
                                .filter(f -> f.getBoutOrder() != null)
                                .findFirst()
                                .orElse(null)).getBlueFighterId()),
                        picksRepo.countByUserUserIdAndFightEventEventId(1L, event.getEventId()),
                        event.getFights().size(),
                        picksRepo.getCorrectPicksforEvent(1L, event.getEventId())
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

    public FighterSummaryDTO mapFighter(Fighter fighter){
        System.out.println(fighter.getFirstName() + " " + fighter.getLastName());
        return new FighterSummaryDTO(
                fighter.getFighterId(),
                fighter.getFirstName(),
                fighter.getLastName(),
                fighter.getNickname(),
                fighter.getHeadshotUrl(),
                fighter.getRanking(),
                fighter.getWeight(),
                convertLength(fighter.getHeight()),
                fighter.getReach(),
                fighter.getStance(),
                fighter.getWin(),
                fighter.getLoss(),
                fighter.getDraw()

        );
    }

    private List<FightCardDTO> mapFights(List<Fight> fights){
        List<FightCardDTO> mappedFights = new ArrayList<>();
        for(Fight fight : fights){
            if(!fight.getStatus().equals(Fight.Status.CANCELLED)){
                {
                    mappedFights.add(new FightCardDTO(
                            fight.getFightId(),
                            fight.getWeightClass(),
                            fight.getIsTitleBout(),
                            fight.getStatus().toString(),
                            mapFighter(fight.getRedFighterId()),
                            mapFighter(fight.getBlueFighterId()),
                            handleWinnerCorner(fight.getWinnerCorner()),
                            handleMethodDetail(fight.getMethod()),
                            fight.getEndRound()
                    ));
                }
            }
        }
        return mappedFights;
    }

    private String handleWinnerCorner(Fight.WinnerCorner winnerCorner){
        if(winnerCorner == null){
            return "";
        } else {
            return winnerCorner.toString();
        }
    }

    private String handleMethodDetail(Fight.Method methodDetail){
        if(methodDetail == null){
            return "";
        } else {
            return methodDetail.toString();
        }
    }

    private String convertLength(Integer length){
        if(length == null){
            return("-");
        }
        int feet = length / 12;
        int inches = length  % 12;

        return feet + "'" + inches;
    }

}
