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

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @Column(name = "type")
    private Type type;

    @Column(name = "message")
    private String message;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @Column(name = "isRead")
    private boolean isRead;

    public enum Type{
        FIGHT_CHANGED,

        FIGHT_CANCELLED,

        PICK_INVALIDATED,

        EVENT_STARTED,

        EVENT_COMPLETED,

        PICK_RESULT_WIN,

        PICK_RESULT_LOSS,

        PICK_RESULT_DRAW,

        FIGHT_ADDED
    }
}
