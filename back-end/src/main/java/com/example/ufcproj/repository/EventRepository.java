package com.example.ufcproj.repository;

import com.example.ufcproj.entity.Event;
import org.springframework.data.jpa.repository.JpaRepository;
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
}
