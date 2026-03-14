package com.example.ufcproj.service;

import com.example.ufcproj.entity.Fight;
import com.example.ufcproj.repository.FightRepository;
import com.example.ufcproj.repository.FighterRepository;
import org.springframework.stereotype.Service;

@Service
public class FightService {

    private FightRepository fightRepository;

    public FightService(FightRepository fightRepository){
        this.fightRepository = fightRepository;
    }

    public void addFight(Fight fight){
        fightRepository.save(fight);
    }
}
