package com.example.ufcproj.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;
import java.util.List;

@Entity
@Table(name = "users")
@Data
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id")
    Long userId;

    @Column(name = "username")
    String userName;

    @Column(name = "email")
    String email;

    @Column(name = "password_hash")
    String passwordHash;

    @Column(name = "display_name")
    String displayName;

    @Column(name = "created_at")
    LocalDate createdAt;

    @Column(name = "updated_at")
    LocalDate updatedAt;

    @OneToMany(mappedBy = "user")
    private List<Pick> picks;
}
