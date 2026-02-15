package com.example.ufcproj.service;

import com.example.ufcproj.entity.Fighter;
import com.example.ufcproj.repository.FighterRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Service
public class FighterService {

    private final FighterRepository fighterRepository;

    public FighterService(FighterRepository fighterRepository){
        this.fighterRepository = fighterRepository;
    }

    public List<Fighter> getAllFighters(){
        return fighterRepository.findAll();
    }

//    public Fighter getFighterByFirstLastName(String name){
//        List<String> fullName = Arrays.asList(name.split(" "));
//        String firstName = "";
//        String lastName = "";
////        if(fullName.size() > 2){
////
////        }
//    }
}
