package com.example.ufcproj.repository;

import com.example.ufcproj.entity.Round;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RoundRepository extends JpaRepository <Round, Long> {
}
