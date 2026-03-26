package com.example.ufcproj.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.ToString;
import java.time.LocalDate;
import java.util.List;

@Data
@Entity
@Table(name = "events")
public class Event {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "event_id")
    private Long eventId;

    @Column(name = "event_name")
    private String eventName;

    @Column(name = "event_date")
    private LocalDate eventDate;

    @Column(name = "event_location")
    private String location;

    @OneToMany(mappedBy = "event", cascade = CascadeType.ALL)
    @ToString.Exclude
    @OrderBy("boutOrder ASC")
    private List<Fight> fights;

    @Enumerated(EnumType.STRING)
    @Column(name = "status")
    private Status status;

    @Column(name = "is_picks_locked")
    private boolean isPicksLocked;

    @Column(name = "stats_id")
    private String statsId;

    public enum Status {
        SCHEDULED, COMPLETED, IN_PROGRESS
    }
}
