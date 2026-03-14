package com.example.ufcproj.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@Entity
@Table(name = "fighters")
public class Fighter {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "fighter_id")
    private Long fighterId;

    @Column(name = "ufcstat_id")
    private String ufcStatId;

    @Column(name = "first_name")
    private String firstName;

    @Column(name = "last_name")
    private String lastName;

    @Column(name = "nickname")
    private String nickname;

    @Column(name = "weight")
    private String weight;

    @Column(name = "height")
    private Integer height;

    @Column(name = "reach")
    private Double reach;

    @Column(name = "stance")
    private String stance;

    @Column(name = "win")
    private Integer win;

    @Column(name = "loss")
    private Integer loss;

    @Column(name = "draw")
    private Integer draw;

    @Column(name = "headshot_url")
    private String headshotUrl;
}
