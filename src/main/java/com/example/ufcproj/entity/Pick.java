package com.example.ufcproj.entity;

import jakarta.persistence.*;
import jdk.jshell.Snippet;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDate;
import java.time.LocalDateTime;

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

    @Enumerated(EnumType.STRING)
    @Column(name = "predicted_method")
    private Method pickedMethod;

    @Column(name = "predicted_round")
    private Integer predictedRound;

    @CreationTimestamp
    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    @Enumerated(EnumType.STRING)
    @Column(name = "status")
    private PickStatus status = PickStatus.VALID;

    @Column(name = "invalid_reason")
    private String invalidReason;

    @Column(name = "invalidated_at")
    private LocalDateTime invalidatedAt;

    @Enumerated(EnumType.STRING)
    @Column(name = "pick_result")
    private PickResult pickResult = PickResult.PENDING;

    @Column(name = "points_award")
    private Integer pointsAward = 0;

    public enum PickStatus {
        VALID,
        LOCKED,
        INVALID
    }

    public enum PickResult {
        PENDING,
        WIN,
        LOSS,
        NO_CONTEST
    }

    public enum Method {
        KO_TKO,
        SUBMISSION,
        DECISION,
        NC
    }
}
