package com.example.ufcproj.repository;

import com.example.ufcproj.entity.Event;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
public interface EventRepository extends JpaRepository<Event, Long> {

    Event findByEventName(String eventName);

    List<Event> findByStatus(Event.Status status);

    List<Event> findByStatusOrStatus(Event.Status status1, Event.Status status2);

    Event findByEventDate(LocalDate date);

    Event findByStatsId(String statsId);

    Event findByStatusAndEventDate(Event.Status status, LocalDate date);

    Event findByEventId(Long eventId);

    @Query(value = """
     SELECT DISTINCT e.*
                    FROM picks p
                    JOIN fights f ON p.fight_id = f.fight_id
                    JOIN events e ON f.event_id = e.event_id
                    WHERE e.event_date >= CURDATE()
                    AND p.user_id = :userId
                    ORDER BY e.event_date ASC
""", nativeQuery = true)
    List<Event> findDistinctEventsByUserIdOrderByEventDateDesc(@Param("userId") Long userId);

    @Query(value = """
     SELECT DISTINCT e.*
                    FROM picks p
                    JOIN fights f ON p.fight_id = f.fight_id
                    JOIN events e ON f.event_id = e.event_id
                    WHERE e.event_date < CURDATE()
                    AND p.user_id = :userId
                    AND f.status = "COMPLETED"
                    ORDER BY e.event_date DESC
""", nativeQuery = true)
    List<Event> findPastPickedEvents(@Param("userId") Long userId);
}
