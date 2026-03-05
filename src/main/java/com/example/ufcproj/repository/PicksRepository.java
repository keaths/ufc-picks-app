package com.example.ufcproj.repository;

import com.example.ufcproj.entity.Fight;
import com.example.ufcproj.entity.Pick;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PicksRepository extends JpaRepository<Pick, Long> {

    List<Pick> findByFightId(Fight fight);
}
