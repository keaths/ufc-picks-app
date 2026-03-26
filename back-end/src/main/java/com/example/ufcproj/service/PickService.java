package com.example.ufcproj.service;

import com.example.ufcproj.dto.FighterSummaryDTO;
import com.example.ufcproj.dto.PickDTO;
import com.example.ufcproj.entity.Event;
import com.example.ufcproj.entity.Fight;
import com.example.ufcproj.entity.Pick;
import com.example.ufcproj.entity.User;
import com.example.ufcproj.repository.*;
import com.example.ufcproj.requests.CreatePickRequest;
import com.example.ufcproj.requests.UpdatePickRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Objects;

@Service
public class PickService {

    private final PicksRepository picksRepository;
    private final FightRepository fightRepository;
    private final FighterRepository fighterRepository;
    private final UserRepository userRepository;
    private final EventService eventService;

    public PickService(PicksRepository picksRepository, FightRepository fightRepository, FighterRepository fighterRepository, UserRepository userRepository, EventService eventService){
        this.picksRepository = picksRepository;
        this.fightRepository = fightRepository;
        this.fighterRepository = fighterRepository;
        this.userRepository = userRepository;
        this.eventService = eventService;
    }

    public void lockPicksForEvent(Event event){
        List<Fight> fights = fightRepository.findByEvent_EventId(event.getEventId());
        for(Fight fight : fights){
            List<Pick> picks = picksRepository.findByFight(fight);
            for(Pick pick: picks){
                pick.setStatus(Pick.PickStatus.LOCKED);
            }
            picksRepository.saveAll(picks);
        }
    }

    public void updatePickResults(Event event){
        List<Fight> fights = fightRepository.findByEvent_EventIdAndStatus(event.getEventId(), Fight.Status.COMPLETED);
        for(Fight fight: fights){
            List<Pick> picks = picksRepository.findByFight(fight);
            int award = 0;
            for(Pick pick: picks){
                if(!pick.getPickResult().equals(Pick.PickResult.PENDING)){
                    continue;
                }
                if(fight.getWinnerCorner() == Fight.WinnerCorner.RED && pick.getPickedFighter().equals(fight.getRedFighterId())){
                    pick.setPickResult(Pick.PickResult.WIN);
                    award += 10;
                    if(Objects.equals(pick.getPredictedRound(), fight.getEndRound())){
                        award += 10;
                    }
                    if(Objects.equals(pick.getPickedMethod(), fight.getMethod())){
                        award += 10;
                    }
                } else if(fight.getWinnerCorner() == Fight.WinnerCorner.BLUE && pick.getPickedFighter().equals(fight.getBlueFighterId())){
                    pick.setPickResult(Pick.PickResult.WIN);
                    award += 10;
                    if(Objects.equals(pick.getPredictedRound(), fight.getEndRound())){
                        award += 10;
                    }
                    if(Objects.equals(pick.getPickedMethod(), fight.getMethod())){
                        award += 10;
                    }
                } else{
                    pick.setPickResult(Pick.PickResult.LOSS);
                }
                pick.setPointsAward(award);
                picksRepository.save(pick);
            }
        }
    }

    public void updatePickCancellation(Fight fight){
        List<Pick> picks = picksRepository.findByFight(fight);
        for(Pick pick: picks){
            pick.setStatus(Pick.PickStatus.INVALID);
        }
        picksRepository.saveAll(picks);
    }

    public void createPick(CreatePickRequest pickRequest){
        Fight fight = fightRepository.findByFightId(pickRequest.fightId());
        User user = userRepository.findByUserId(pickRequest.userId());

        Pick pick = picksRepository.findByUserAndFight(user, fight);
        if(pick == null){
            pick = new Pick();
        }
        pick.setUser(userRepository.findByUserId(pickRequest.userId()));
        pick.setFight(fight);
        pick.setPickedFighter(fighterRepository.findByFighterId(pickRequest.pickedFighterId()));
        switch(pickRequest.method()){
            case "KO_TKO":
                pick.setPickedMethod(Pick.Method.KO_TKO);
                break;

            case "DECISION":
                pick.setPickedMethod(Pick.Method.DECISION);
                break;

            case "SUBMISSION":
                pick.setPickedMethod(Pick.Method.SUBMISSION);
                break;
        }
        pick.setPredictedRound(pickRequest.endRound());

        picksRepository.save(pick);
    }

    public void updatePick(UpdatePickRequest request, Long pickId){
        Pick pick = picksRepository.findByPickId(pickId);
        if(pick.getStatus().toString().equals("VALID")){
            pick.setPickedFighter(pick.getPickedFighter());
            switch(request.method()){
                case "KO":
                    pick.setPickedMethod(Pick.Method.KO_TKO);
                    break;

                case "DECISION":
                    pick.setPickedMethod(Pick.Method.DECISION);
                    break;

                case "SUBMISSION":
                    pick.setPickedMethod(Pick.Method.SUBMISSION);
                    break;
            }
            pick.setPredictedRound(request.endRound());
            picksRepository.save(pick);
        }
    }

    public List<PickDTO> getPicks(Long userId, Long eventId){
        return
                picksRepository.findByUserUserIdAndFightEventEventId(userId, eventId).stream()
                .map(pick -> new PickDTO(
                        pick.getUser().getUserId(),
                        pick.getFight().getFightId(),
                        pick.getPickedFighter().getFighterId(),
                        eventService.mapFighter(pick.getPickedFighter()),
                        pick.getPickedMethod().toString(),
                        pick.getPredictedRound(),
                        pick.getPointsAward()
                ))
                .toList();
    }

    public Integer getCount(Long userId, Long eventId){
        return picksRepository.countByUserUserIdAndFightEventEventId(userId, eventId);
    }

}
