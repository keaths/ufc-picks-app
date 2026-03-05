package com.example.ufcproj.service;

import com.example.ufcproj.entity.Event;
import com.example.ufcproj.entity.Fight;
import com.example.ufcproj.entity.Pick;
import com.example.ufcproj.repository.EventRepository;
import com.example.ufcproj.repository.FightRepository;
import com.example.ufcproj.repository.PicksRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class PickService {

    private PicksRepository picksRepository;
    private FightRepository fightRepository;

    public PickService(PicksRepository picksRepository, FightRepository fightRepository){
        this.picksRepository = picksRepository;
        this.fightRepository = fightRepository;
    }

    @Transactional
    public void lockPicksForEvent(Event event){
        List<Fight> fights = fightRepository.findByEvent_EventId(event.getEventId());
        for(Fight fight : fights){
            List<Pick> picks = picksRepository.findByFight(fight);
            for(Pick pick: picks){
                pick.setStatus(Pick.PickStatus.LOCKED);
                picksRepository.save(pick);
            }
        }
    }

    @Transactional
    public void updatePickResults(Event event){
        List<Fight> fights = fightRepository.findByEvent_EventId(event.getEventId());
        for(Fight fight: fights){
            List<Pick> picks = picksRepository.findByFight(fight);
            for(Pick pick: picks){
                if(fight.getWinnerCorner() == Fight.WinnerCorner.RED && pick.getPickedFighter().equals(fight.getRedFighterId())){
                    pick.setPickResult(Pick.PickResult.WIN);
                } else if(fight.getWinnerCorner() == Fight.WinnerCorner.BLUE && pick.getPickedFighter().equals(fight.getBlueFighterId())){
                    pick.setPickResult(Pick.PickResult.WIN);
                } else{
                    pick.setPickResult(Pick.PickResult.LOSS);
                }
                picksRepository.save(pick);
            }
        }
    }
}
