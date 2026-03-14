package com.example.ufcproj.service;

import com.example.ufcproj.entity.*;
import com.example.ufcproj.repository.NotificationsRepository;
import com.example.ufcproj.repository.PicksRepository;
import com.example.ufcproj.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class NotificationService {

    private NotificationsRepository notificationsRepository;
    private PicksRepository picksRepository;
    private UserRepository userRepository;

    public NotificationService (NotificationsRepository notificationsRepository, PicksRepository picksRepository, UserRepository userRepository){
        this.notificationsRepository = notificationsRepository;
        this.picksRepository = picksRepository;
        this.userRepository = userRepository;
    }

    public void createFightNotification(Notifications.Type type, Event event, Fight fight){
        List<User> users = userRepository.findAll();
        for(User user: users) {
            Notifications notification = new Notifications();
            notification.setNotificationType(type);
            notification.setEvent(event);
            notification.setFight(fight);
            notification.setUser(user);
            notification.setMessage(determineNotificationMessage(type, event, fight));
            notification.setRead(false);

            if (!notificationsRepository.existsByNotificationTypeAndFightAndUser(type, fight, user)) {
                notificationsRepository.save(notification);
            }
        }
    }

    public void createFightResultNotification(Notifications.Type type, Event event, Fight fight){
        List<User> users = picksRepository.findByFightEvent(event).stream()
                .map(Pick::getUser)
                .distinct()
                .toList();
        for(User user: users) {
            Notifications notification = new Notifications();
            notification.setNotificationType(type);
            notification.setEvent(event);
            notification.setFight(fight);
            notification.setUser(user);
            notification.setMessage(determineNotificationMessage(type, event, fight));
            notification.setRead(false);

            if (!notificationsRepository.existsByNotificationTypeAndFightAndUser(type, fight, user)) {
                notificationsRepository.save(notification);
            }
        }
    }

    public void createFightChangeNotification(Notifications.Type type, Event event, Fight fight){
        List<User> users = picksRepository.findByFightEvent(event).stream()
                .map(Pick::getUser)
                .distinct()
                .toList();
        for(User user: users) {
            Notifications notification = new Notifications();
            notification.setNotificationType(type);
            notification.setEvent(event);
            notification.setFight(fight);
            notification.setUser(user);
            notification.setMessage(determineNotificationMessage(type, event, fight));
            notification.setRead(false);

            if (!notificationsRepository.existsByNotificationTypeAndFightAndUser(type, fight, user)) {
                notificationsRepository.save(notification);
            }
        }
    }

    public void createEventNotification(Notifications.Type type, Event event){
        List<User> users = userRepository.findAll();
        for(User user : users) {
            Notifications notification = new Notifications();
            notification.setNotificationType(type);
            notification.setEvent(event);
            notification.setUser(user);
            notification.setMessage(determineNotificationMessage(type, event, null));
            notification.setRead(false);

            if (!notificationsRepository.existsByNotificationTypeAndEventAndUser(type, event, user)) {
                notificationsRepository.save(notification);
            }
        }
    }

    public void createPicksEventNotification(Notifications.Type type, Event event){
        List<User> users = picksRepository.findByFightEvent(event).stream()
                .map(Pick::getUser)
                .distinct()
                .toList();
        for(User user: users) {
            Notifications notification = new Notifications();
            notification.setNotificationType(type);
            notification.setEvent(event);
            notification.setUser(user);
            notification.setMessage(determineNotificationMessage(type, event, null));
            notification.setRead(false);

            if (!notificationsRepository.existsByNotificationTypeAndEventAndUser(type, event, user)) {
                notificationsRepository.save(notification);
            }
        }
    }

    public String determineNotificationMessage(Notifications.Type type, Event event, Fight fight){
        return switch (type) {
            case EVENT_STARTED ->
                    event.getEventName() + " has started!";

            case PICKS_LOCKED ->
                    "Picks are now locked for " + event.getEventName() + "!";

            case FIGHT_RESULT ->
                    fight.getRedFighterId().getLastName() + " vs " +
                            fight.getBlueFighterId().getLastName() + " is now final.";

            case FIGHT_CANCELLED ->
                    fight.getRedFighterId().getLastName() + " vs " +
                            fight.getBlueFighterId().getLastName() + " has been cancelled!";

            case FIGHT_ADDED ->
                    "A new fight has been added to " + event.getEventName() + "!";

            case WEIGHTCLASS_CHANGED ->
                    fight.getRedFighterId().getLastName() + " vs " +
                            fight.getBlueFighterId().getLastName() + " has a weight class update!";

            case EVENT_COMPLETED ->
                    event.getEventName() + " has completed!";

            case EVENT_ADDED ->
                    event.getEventName() + " has been added!";

            case FIGHT_CHANGED ->
                    fight.getRedFighterId().getLastName() + " vs " + fight.getBlueFighterId().getLastName() + " has been changed!";
        };
    }
}
