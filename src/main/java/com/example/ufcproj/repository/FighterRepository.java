package com.example.ufcproj.repository;

import com.example.ufcproj.entity.Fighter;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface FighterRepository extends JpaRepository<Fighter, Long> {

    @Query(value = "SELECT *\n" +
            "FROM fighters\n" +
            "WHERE LOWER(REPLACE(CONCAT(first_name, last_name, weight), ' ', '')) = :fullStat;", nativeQuery = true)
    Fighter findByFirstNameAndLastNameAndWeight(@Param("fullStat") String fullName);

    @Query(value = "SELECT *\n" +
            "FROM fighters\n" +
            "WHERE LOWER(REPLACE(CONCAT(first_name, last_name), ' ', '')) = :fullName;", nativeQuery = true)
    Fighter findByFirstNameAndLastName(@Param("fullName") String fullName);

    Fighter findByUfcStatId(String id);
}
