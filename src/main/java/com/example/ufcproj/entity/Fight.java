package com.example.ufcproj.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.ToString;

import java.util.List;

@Data
@Entity
@Table(name = "fights")
public class Fight {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "fight_id")
    private Long fightId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "event_id")
    @ToString.Exclude
    private Event event;

    @ManyToOne
    @JoinColumn(name = "red_fighter_id", nullable = false)
    private Fighter redFighterId;

    @ManyToOne
    @JoinColumn(name = "blue_fighter_id", nullable = false)
    private Fighter blueFighterId;

    @Enumerated(EnumType.STRING)
    @Column(name = "winner_corner")
    private WinnerCorner winnerCorner; // RED/BLUE/DRAW/NC

    @Column(name = "method")
    private String method; // KO/TKO/SUB/DEC etc.

    @Column(name = "method_detail")
    private String methodDetail; // e.g. "Rear Naked Choke"

    @Column(name = "end_round")
    private Integer endRound;

    @Column(name = "end_time_sec")
    private Integer endTimeSec;

    @Column(name = "weight_class")
    private String weightClass;

    @Column(name = "is_title_bout")
    private Boolean isTitleBout = false;

    @OneToMany(mappedBy = "fight", cascade = CascadeType.ALL)
    private List<Round> rounds;

    public enum WinnerCorner {
        RED, BLUE, DRAW, NC
    }

    @OneToMany(mappedBy = "fight")
    private List<Pick> picks;
}
