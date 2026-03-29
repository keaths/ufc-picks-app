package com.example.ufcproj.service;

import com.example.ufcproj.dto.EventDetailsDTO;
import com.example.ufcproj.dto.EventSummaryDTO;
import com.example.ufcproj.dto.FightCardDTO;
import com.example.ufcproj.dto.FighterSummaryDTO;
import com.example.ufcproj.entity.Event;
import com.example.ufcproj.entity.Fight;
import com.example.ufcproj.entity.Fighter;
import com.example.ufcproj.repository.FightRepository;
import com.example.ufcproj.repository.FighterRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;

@Service
public class FightService {

    private FightRepository fightRepository;

    public FightService(FightRepository fightRepository){
        this.fightRepository = fightRepository;
    }

    public void addFight(Fight fight){
        fightRepository.save(fight);
    }

    public List<FightCardDTO> findLast5(Long fighterId){
        return fightRepository.findLast5(fighterId)
                .stream()
                .map(fight -> new FightCardDTO(
                        fight.getFightId(),
                        fight.getWeightClass(),
                        fight.getIsTitleBout(),
                        fight.getStatus().toString(),
                        mapFighter(fight.getRedFighterId()),
                        mapFighter(fight.getBlueFighterId()),
                        fight.getWinnerCorner().toString(),
                        handleMethodDetail(fight.getMethod()),
                        fight.getEndRound()
                ))
                .toList();
    }

    public FighterSummaryDTO mapFighter(Fighter fighter){
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

    private String convertLength(Integer length){
        int feet = length % 12;
        int inches = length - (6 * feet);

        String finalLength = "" + feet + "'" + inches;

        return finalLength;
    }

    private String handleMethodDetail(Fight.Method methodDetail){
        if(methodDetail == null){
            return "";
        } else {
            return methodDetail.toString();
        }
    }
}
