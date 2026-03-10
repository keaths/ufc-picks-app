package com.example.ufcproj.repository;

import com.example.ufcproj.entity.Fight;
import com.example.ufcproj.entity.Pick;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PicksRepository extends JpaRepository<Pick, Long> {

    List<Pick> findByFight(Fight fight);

    Pick findByPickId(Long pickId);

}
