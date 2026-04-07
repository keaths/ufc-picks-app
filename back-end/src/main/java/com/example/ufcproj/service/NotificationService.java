package com.example.ufcproj.service;

import com.example.ufcproj.dto.EventSummaryDTO;
import com.example.ufcproj.dto.FightCardDTO;
import com.example.ufcproj.dto.FighterSummaryDTO;
import com.example.ufcproj.dto.NotificationDTO;
import com.example.ufcproj.entity.*;
import com.example.ufcproj.repository.NotificationsRepository;
import com.example.ufcproj.repository.PicksRepository;
import com.example.ufcproj.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

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

    public List<NotificationDTO> getNotificaitons(Long userId){
        return notificationsRepository.findByUserUserId(userId).stream()
                .map(notif -> new NotificationDTO(
                        notif.getNotificationId(),
                        notif.getNotificationType().toString(),
                        notif.getMessage(),
                        mapEvent(notif.getEvent()),
                        mapFight(notif.getFight()),
                        notif.isRead(),
                        notif.getCreatedAt()
                )).toList();
    }

    private EventSummaryDTO mapEvent(Event event){
        System.out.println(event.getEventName());
        EventSummaryDTO eventSummaryDTO = new EventSummaryDTO(event.getEventId(),
                event.getEventName(),
                event.getEventDate(),
                event.getLocation(),
                event.isPicksLocked(),
                event.getFights().getFirst().getIsTitleBout(),
                mapFighter(Objects.requireNonNull(event.getFights().stream()
                        .filter(f -> f.getBoutOrder() != null)
                        .findFirst()
                        .orElse(null)).getRedFighterId()),
                mapFighter(Objects.requireNonNull(event.getFights().stream()
                        .filter(f -> f.getBoutOrder() != null)
                        .findFirst()
                        .orElse(null)).getBlueFighterId()),
                picksRepository.countByUserUserIdAndFightEventEventId(1L, event.getEventId()),
                event.getFights().size(),
                picksRepository.getCorrectPicksforEvent(1L, event.getEventId())
        );

        return eventSummaryDTO;
    }

    public FighterSummaryDTO mapFighter(Fighter fighter){
        return new FighterSummaryDTO(
                fighter.getFighterId(),
                fighter.getFirstName(),
                fighter.getLastName(),
                fighter.getNickname(),
                fighter.getHeadshotUrl(),
                fighter.getRanking(),
                fighter.getWeight(),
                convertLength(fighter.getHeight()),
                fighter.getReach(),
                fighter.getStance(),
                fighter.getWin(),
                fighter.getLoss(),
                fighter.getDraw()
        );
    }

    private FightCardDTO mapFight(Fight fight){
        if(fight == null){
            return null;
        }

        FightCardDTO fightCard = new FightCardDTO(
                fight.getFightId(),
                fight.getWeightClass(),
                fight.getIsTitleBout(),
                fight.getStatus().toString(),
                mapFighter(fight.getRedFighterId()),
                mapFighter(fight.getBlueFighterId()),
                handleWinnerCorner(fight.getWinnerCorner()),
                handleMethodDetail(fight.getMethod()),
                fight.getEndRound()
        );

        return fightCard;
    }

    private String handleWinnerCorner(Fight.WinnerCorner winnerCorner){
        if(winnerCorner == null){
            return "";
        } else {
            return winnerCorner.toString();
        }
    }

    private String handleMethodDetail(Fight.Method methodDetail){
        if(methodDetail == null){
            return "";
        } else {
            return methodDetail.toString();
        }
    }

    private String convertLength(Integer length){
        int feet = length % 12;
        int inches = length - (6 * feet);

        String finalLength = "" + feet + "'" + inches;

        return finalLength;
    }
}
