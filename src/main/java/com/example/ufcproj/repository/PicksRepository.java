package com.example.ufcproj.repository;

import com.example.ufcproj.entity.Pick;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PicksRepository extends JpaRepository<Pick, Long> {
}
