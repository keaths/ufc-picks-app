package com.example.ufcproj.repository;

import com.example.ufcproj.entity.Event;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface EventRepository extends JpaRepository<Event, Long> {

    Event findByEventName(String eventName);
}
