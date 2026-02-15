package com.example.ufcproj.repository;

import com.example.ufcproj.entity.Fight;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FightRepository extends JpaRepository <Fight, Long> {

    @Query(value = """
    SELECT * FROM fights
    WHERE fight_id = :fightId
      AND (red_fighter_id = :fighterId OR blue_fighter_id = :fighterId)
    """, nativeQuery = true)
    Fight findFightByFightIdAndFighterId(
            @Param("fightId") Long fightId,
            @Param("fighterId") Long fighterId
    );

    @Query(value = "SELECT * FROM fights" +
            "where fight_id = :fightId", nativeQuery = true)
    Fight findByFightId(@Param("fightId") Long fightId);

    List<Fight> findByEvent_EventId(Long eventId);
}
