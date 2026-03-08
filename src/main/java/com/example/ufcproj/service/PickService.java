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
import java.util.Objects;

@Service
public class PickService {

    private final PicksRepository picksRepository;
    private final FightRepository fightRepository;

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
            }
            picksRepository.saveAll(picks);
        }
    }

    @Transactional
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

    @Transactional
    public void updatePickCancellation(Fight fight){
        List<Pick> picks = picksRepository.findByFight(fight);
        for(Pick pick: picks){
            pick.setStatus(Pick.PickStatus.INVALID);
        }
        picksRepository.saveAll(picks);
    }
}
