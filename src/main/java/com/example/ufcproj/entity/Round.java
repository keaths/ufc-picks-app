package com.example.ufcproj.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "rounds")
@Data
public class Round {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "round_id")
    private Long roundId;

    @Column(name = "round_num")
    private Integer roundNum;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "fight_id")
    private Fight fight;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "fighter_id")
    private Fighter fighter;

    @Enumerated(EnumType.STRING)
    @Column(name = "corner")
    private Corner corner;

    @Column(name = "kd")
    private Integer kd;

    @Column(name = "sig_strike_att")
    private Integer SigStrikesAtt;

    @Column(name = "sig_strike_land")
    private Integer SigStrikesLand;

    @Column(name = "total_strike_att")
    private Integer totalStrikeAtt;

    @Column(name = "total_strike_land")
    private Integer totalStrikeLand;

    @Column(name = "takedown_att")
    private Integer takeDownAtt;

    @Column(name = "takedown_land")
    private Integer takeDownLand;

    @Column(name = "sub_attempt")
    private Integer subAttempt;

    @Column(name = "control_time")
    private Integer controlTime;

    public enum Corner{
        RED, BLUE
    }
}
