package com.example.ufcproj.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;

@Entity
@Table(name = "notifications")
@Data
public class Notifications {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "notification_id")
    private Long notificationId;

    @Enumerated(EnumType.STRING)
    @Column(name = "notification_type")
    private Type notificationType;

    @ManyToOne
    @JoinColumn(name = "event_id")
    private Event event;

    @ManyToOne
    @JoinColumn(name = "fight_id")
    private Fight fight;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @Column(name = "message")
    private String message;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @Column(name = "is_read")
    private boolean isRead;

    public enum Type{
        EVENT_STARTED,
        PICKS_LOCKED,
        FIGHT_RESULT,
        FIGHT_CANCELLED,
        FIGHT_ADDED,
        WEIGHTCLASS_CHANGED,
        EVENT_COMPLETED,
        EVENT_ADDED,
        FIGHT_CHANGED,
    }
}
