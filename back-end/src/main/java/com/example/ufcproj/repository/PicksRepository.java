package com.example.ufcproj.repository;

import com.example.ufcproj.entity.Event;
import com.example.ufcproj.entity.Fight;
import com.example.ufcproj.entity.Pick;
import com.example.ufcproj.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PicksRepository extends JpaRepository<Pick, Long> {

    List<Pick> findByFight(Fight fight);

    Pick findByPickId(Long pickId);

    List<Pick> findByFightEvent(Event event);

    Pick findByUserAndFight(User user, Fight fight);

    List<Pick> findByUserUserIdAndFightEventEventId(Long userId, Long eventId);

    Integer countByUserUserIdAndFightEventEventId(Long userId, Long eventId);

    @Query(nativeQuery = true, value = """
            select count(*) as correct
            from picks p
            join fights f on p.fight_id = f.fight_id
            where p.user_id = :userId
            and f.event_id = :eventId
            and p.pick_result = "WIN"
            """)
    Integer getCorrectPicksforEvent(Long userId, Long eventId);
}
