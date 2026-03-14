package com.example.ufcproj.repository;

import com.example.ufcproj.entity.Event;
import com.example.ufcproj.entity.Fight;
import com.example.ufcproj.entity.Notifications;
import com.example.ufcproj.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface NotificationsRepository extends JpaRepository<Notifications, Long> {

    boolean existsByNotificationTypeAndFightAndUser(Notifications.Type type, Fight fight, User user);

    boolean existsByNotificationTypeAndEventAndUser(Notifications.Type type, Event event, User user);
}
