package com.example.ufcproj.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;

@Entity
@Table(name = "picks")
@Data
public class Pick {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "pick_id")
    private Long pickId;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne
    @JoinColumn(name = "fight_id")
    private Fight fight;

    @ManyToOne
    @JoinColumn(name = "picked_fighter_id")
    private Fighter pickedFighter;

    @Column(name = "predicted_method")
    private String pickedMethod;

    @Column(name = "predicted_round")
    private Integer predictedRound;

    @Column(name = "created_at")
    private LocalDate createdAt;

    @Column(name = "updated_at")
    private LocalDate updatedAt;
}
