package com.example.ufcproj.repository;

import com.example.ufcproj.entity.Fighter;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface FighterRepository extends JpaRepository<Fighter, Long> {

    Optional<Fighter> findByFirstNameAndLastName(String firstName, String lastName);

    Fighter findByUfcStatId(String id);
}
