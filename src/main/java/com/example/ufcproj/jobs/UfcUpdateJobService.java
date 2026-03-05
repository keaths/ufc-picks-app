package com.example.ufcproj.jobs;

import com.example.ufcproj.entity.*;
import com.example.ufcproj.repository.*;
import org.jsoup.HttpStatusException;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.IOException;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.Locale;

@Service
public class UfcUpdateJobService {

    private final FighterRepository fighterRepository;
    private final EventRepository eventRepository;
    private final RoundRepository roundRepository;
    private final FightRepository fightRepository;
    private final UserRepository userRepository;
    private final PicksRepository picksRepository;
    private final NotificationsRepository notificationsRepository;

    public UfcUpdateJobService(
            FighterRepository fighterRepository,
            EventRepository eventRepository,
            RoundRepository roundRepository,
            FightRepository fightRepository,
            UserRepository userRepository,
            PicksRepository picksRepository,
            NotificationsRepository notificationsRepository
    ) {
        this.fighterRepository = fighterRepository;
        this.eventRepository = eventRepository;
        this.roundRepository = roundRepository;
        this.fightRepository = fightRepository;
        this.userRepository = userRepository;
        this.picksRepository = picksRepository;
        this.notificationsRepository = notificationsRepository;
    }

    @Transactional
    public void runDailyRefresh() throws InterruptedException, IOException {
        getUpcomingEvents(eventRepository);
        List<Event> upcomingEvents = eventRepository.findByStatus(Event.Status.SCHEDULED);

        for (Event upcomingEvent : upcomingEvents) {
            syncEventCard(upcomingEvent);
        }
        System.out.println("done");
    }

    @Transactional
    public void runPollToday() throws InterruptedException, IOException {
        LocalDate today = LocalDate.now(ZoneId.of("America/New_York"));
        Event upcomingEvent = eventRepository.findByStatusAndEventDate(Event.Status.SCHEDULED, today);
        if(upcomingEvent == null){
            System.out.println("No fights today");
            return;
        }

        syncEventCard(upcomingEvent);
        List<Fight> fights = fightRepository.findByEvent_EventIdAndStatus(upcomingEvent.getEventId(), Fight.Status.SCHEDULED);
        if(fights.isEmpty()){
            upcomingEvent.setStatus(Event.Status.COMPLETED);
            eventRepository.save(upcomingEvent);
            return;
        }
        for (Fight updatedFight : fights) {
            Document fightPage = fetchFightDetailsWithRetry(updatedFight.getStatsId());
            if(isFightCompleted(fightPage)){
                Fight savedFight = updateFightFromFightPage(updatedFight, fightPage);
                saveRoundsFromFightPage(savedFight, fightPage);
                //notifs & picks fix
            } else{
                System.out.println("Fight not completed yet: " + updatedFight.getStatsId());
            }
        }
    }

    @Transactional
    private void saveRoundsFromFightPage(Fight savedFight, Document fightPage){
        ArrayList<Element> rounds = new ArrayList<>();
        try {
            rounds = fightPage.select("table.b-fight-details__table").getFirst().select("tbody tr");
        } catch (RuntimeException e) {
            System.out.println("no data");
        }

        for (int y = 0; y < rounds.size(); y++) {
            for (int j = 0; j < 2; j++) {
                Round round = new Round();
                round.setFight(savedFight);
                round.setRoundNum(y + 1);
                round.setFighter(fighterRepository.findByUfcStatId(rounds.get(y).select("td:nth-child(1) p:nth-child(" + (j + 1) + ") a").attr("abs:href").trim().split("/")[4]));

                if (savedFight.getRedFighterId().getFighterId().equals(round.getFighter().getFighterId())) {
                    round.setCorner(Round.Corner.RED);
                } else {
                    round.setCorner(Round.Corner.BLUE);
                }
                round.setKd(Integer.parseInt(rounds.get(y).select("td:nth-child(2) p:nth-child(" + (j + 1) + ")").text().trim()));
                round.setSigStrikesLand(Integer.parseInt(rounds.get(y).select("td:nth-child(3) p:nth-child(" + (j + 1) + ")").text().trim().split(" ")[0]));
                round.setSigStrikesAtt(Integer.parseInt(rounds.get(y).select("td:nth-child(3) p:nth-child(" + (j + 1) + ")").text().trim().split(" ")[2]));
                round.setTotalStrikeLand(Integer.parseInt(rounds.get(y).select("td:nth-child(5) p:nth-child(" + (j + 1) + ")").text().trim().split(" ")[0]));
                round.setTotalStrikeAtt(Integer.parseInt(rounds.get(y).select("td:nth-child(5) p:nth-child(" + (j + 1) + ")").text().trim().split(" ")[2]));
                round.setTakeDownLand(Integer.parseInt(rounds.get(y).select("td:nth-child(6) p:nth-child(" + (j + 1) + ")").text().trim().split(" ")[0]));
                round.setTakeDownAtt(Integer.parseInt(rounds.get(y).select("td:nth-child(6) p:nth-child(" + (j + 1) + ")").text().trim().split(" ")[2]));
                round.setSubAttempt(Integer.parseInt(rounds.get(y).select("td:nth-child(8) p:nth-child(" + (j + 1) + ")").text().trim()));
                try {
                    round.setControlTime(parseTime(rounds.get(y).select("td:nth-child(10) p:nth-child(" + (j + 1) + ")").text().trim()));
                } catch (RuntimeException ignored) {

                }
                roundRepository.save(round);
            }
        }
    }

    @Transactional
    private Fight updateFightFromFightPage(Fight fight, Document fightPage){
        int endRound = Integer.parseInt(fightPage.select("p.b-fight-details__text i.b-fight-details__text-item:nth-child(2)").getFirst().text().trim().split(": ")[1]);
        fight.setEndRound(endRound);
        int endTime = parseTime(fightPage.select("p.b-fight-details__text i.b-fight-details__text-item:nth-child(3)").getFirst().text().trim().split(": ")[1]);
        fight.setEndTimeSec(endTime);
        String methodDetail = null;
        try {
            methodDetail = fightPage.select("p.b-fight-details__text i.b-fight-details__text-item_first i:nth-child(2)").text().trim();
        } catch (RuntimeException e) {
            methodDetail = "";
        }
        fight.setMethod(methodDetail);

        String fightWinner = null;
        String possDraw = null;
        try {
            fightWinner = fightPage.select("i.b-fight-details__person-status_style_green + div h3 a").attr("abs:href").split("/")[4];
            possDraw = fightPage.select("div.b-fight-details__person:nth-child(1) i").text().trim();
        } catch (RuntimeException ignored) {

        }
        if (fightWinner != null && fightWinner.equals(fight.getRedFighterId().getUfcStatId())) {
            fight.setWinnerCorner(Fight.WinnerCorner.RED);
        } else if (fightWinner != null && fightWinner.equals(fight.getBlueFighterId().getUfcStatId())) {
            fight.setWinnerCorner(Fight.WinnerCorner.BLUE);
        } else if (possDraw != null && possDraw.equals("D")) {
            fight.setWinnerCorner(Fight.WinnerCorner.DRAW);
        } else {
            fight.setWinnerCorner(Fight.WinnerCorner.NC);
        }
        fight.setStatus(Fight.Status.COMPLETED);
        return fightRepository.save(fight);
    }

    @Transactional
    public void syncEventCard(Event upcomingEvent) throws IOException, InterruptedException {
        boolean eventConnected = false;
        while (!eventConnected) {
            try {
                Document eventPage = Jsoup.connect("http://ufcstats.com/event-details/" + upcomingEvent.getStatsId()).get();
                eventConnected = true;

                ArrayList<Element> eventFights = eventPage.select("tbody tr");
                List<Fight> fights = fightRepository.findByEvent_EventIdAndStatus(upcomingEvent.getEventId(), Fight.Status.SCHEDULED);
                for (Element eventFight : eventFights) {
                    String statsId = eventFight.select("td:nth-child(5) a").attr("data-link").split("/")[4];
                    Fight foundFight = fightRepository.findByStatsId(statsId);

                    String redStat = eventFight.select("td:nth-child(2) p:nth-child(1) a").attr("abs:href").split("/")[4];
                    String blueStat = eventFight.select("td:nth-child(2) p:nth-child(2) a").attr("abs:href").split("/")[4];

                    String weightClass = eventFight.select("td:nth-child(7) p").text().trim();
                    boolean isTitle = !eventFight.select("img[src*=belt]").isEmpty();

                    String redFighterFirst = eventFight.select("td:nth-child(2) p:nth-child(1) a").text().trim().split(" ")[0];
                    String redFighterLast = null;
                    try {
                        redFighterLast = eventFight.select("td:nth-child(2) p:nth-child(1) a").text().trim().split(" ")[1];
                    } catch (RuntimeException ignored) {

                    }
                    String blueFighterFirst = eventFight.select("td:nth-child(2) p:nth-child(2) a").text().trim().split(" ")[0];
                    String blueFighterLast = eventFight.select("td:nth-child(2) p:nth-child(2) a").text().trim().split(" ")[1];

                    Fighter redFighter = getOrCreateFighter(redStat, redFighterFirst, redFighterLast, weightClass);
                    Fighter blueFighter = getOrCreateFighter(blueStat, blueFighterFirst, blueFighterLast, weightClass);

                    if (foundFight == null) {
                        createFight(upcomingEvent, statsId, weightClass, isTitle, redFighter, blueFighter);
                    } else {
                        updateFightIfChanged(foundFight, redFighter, blueFighter, weightClass, isTitle);
                        fights.removeIf(f -> f.getStatsId().equals(statsId));
                    }
                }
                if (!fights.isEmpty()) {
                    for (Fight fight : fights) {
                        fight.setStatus(Fight.Status.CANCELLED);
                        Fight cancelledFight = fightRepository.save(fight);
                    }
                }
            } catch (IOException e) {
                System.out.println("Connection failed. Retrying...");
                Thread.sleep(1500);
            }
        }
    }

    @Transactional
    private void createFight(Event event, String statsId, String weightClass, boolean isTitle, Fighter redFighter, Fighter blueFighter){
        Fight fight = new Fight();
        fight.setEvent(event);
        fight.setStatsId(statsId);
        fight.setWeightClass(weightClass);
        fight.setRedFighterId(redFighter);
        fight.setBlueFighterId(blueFighter);
        fight.setIsTitleBout(isTitle);
        fight.setStatus(Fight.Status.SCHEDULED);

        fightRepository.save(fight);
    }

    private void updateFightIfChanged(Fight fight, Fighter redFighter, Fighter blueFighter, String weightClass, boolean isTitle){
        boolean fightChanged = false;

        if (!fight.getRedFighterId().getUfcStatId().equals(redFighter.getUfcStatId())) {
            fight.setRedFighterId(redFighter);
            fightChanged = true;
        }

        if (!fight.getBlueFighterId().getUfcStatId().equals(blueFighter.getUfcStatId())) {
            fight.setBlueFighterId(blueFighter);
            fightChanged = true;
        }

        if (!fight.getWeightClass().equals(weightClass)) {
            fight.setWeightClass(weightClass);
            fightChanged = true;
        }

        if (fight.getIsTitleBout() != isTitle) {
            fight.setIsTitleBout(isTitle);
            fightChanged = true;
        }

        Fight savedFight = fightRepository.save(fight);
    }

    @Transactional
    private Fighter getOrCreateFighter(String statId, String first, String last, String weightclass) throws IOException {
        Fighter fighter = fighterRepository.findByUfcStatId(statId);

        if (fighter == null) {
            addNewFighter(fighterRepository, first, last, weightclass);
            fighter = fighterRepository.findByUfcStatId(statId);
        }

        return fighter;
    }

    @Transactional
    public void addNewFighter(FighterRepository fighterRepository, String firstName, String lastName, String weightClass) throws IOException {
        Document searchFighter = Jsoup.connect("http://ufcstats.com/statistics/fighters/search?query=" + lastName).get();
        ArrayList<Element> fighters = searchFighter.select("tbody tr");
        fighters.removeFirst();

        for(int i = 0; i < fighters.size(); i++){
            if(fighters.get(i).select("td:nth-child(1) a").text().trim().equals(firstName) && fighters.get(i).select("td:nth-child(2) a").text().trim().equals(lastName)){
                Fighter fighter = new Fighter();
                fighter.setUfcStatId(fighters.get(i).select("td:nth-child(1) a").attr("abs:href").split("/")[4]);
                fighter.setFirstName(fighters.get(i).select("td:nth-child(1)").text().trim());
                fighter.setLastName(fighters.get(i).select("td:nth-child(2)").text().trim());
                String nickName = fighters.get(i).select("td:nth-child(3)").text().trim();
                fighter.setWeight(weightClass);
                if (!nickName.isEmpty()) {
                    fighter.setNickname(fighters.get(i).select("td:nth-child(3)").text().trim());
                }
                String heightString = fighters.get(i).select("td:nth-child(4)").text().trim();
                int height = 0;
                if (!heightString.contains("--")) {
                    fighter.setHeight(height = parseHeight(heightString));
                }
                String reachString = fighters.get(i).select("td:nth-child(6)").text().trim();
                double reach = 0;
                if (!reachString.contains("--")) {
                    fighter.setReach(Double.parseDouble(fighters.get(i).select("td:nth-child(6)").text().trim().replace("\"", "")));
                }
                String stance = fighters.get(i).select("td:nth-child(7)").text().trim();
                if (!stance.isEmpty()) {
                    fighter.setStance(fighters.get(i).select("td:nth-child(7)").text().trim());
                }
                fighter.setWin(Integer.parseInt(fighters.get(i).select("td:nth-child(8)").text().trim()));
                fighter.setLoss(Integer.parseInt(fighters.get(i).select("td:nth-child(9)").text().trim()));
                fighter.setDraw(Integer.parseInt(fighters.get(i).select("td:nth-child(10)").text().trim()));

                fighterRepository.save(fighter);
                System.out.println("Fighter added");
                break;
            }
        }
    }

    @Transactional
    public void getUpcomingEvents(EventRepository eventRepository) throws IOException {
        Document eventPage = Jsoup.connect("http://ufcstats.com/statistics/events/upcoming?page=all").get();
        ArrayList<Element> events = eventPage.select("tbody tr");
        events.removeFirst();

        for(int i = 0; i < events.size(); i++){
            String statsId = events.get(i).select("i a").attr("abs:href").split("/")[4];
			if(eventRepository.findByStatsId(statsId) != null){
				continue;
			}
            Event event = new Event();

            event.setStatsId(statsId);
            event.setEventName(events.get(i).select("a").text().trim());
            String date = events.get(i).select("span").text().trim();
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("MMMM d, yyyy", Locale.ENGLISH);
            LocalDate date1 = LocalDate.parse(date, formatter);
            event.setStatus(Event.Status.SCHEDULED);
            event.setEventDate(date1);
            event.setLocation(events.get(i).select("td:nth-child(2)").text().trim());

            eventRepository.save(event);
        }
        System.out.println("Events done");
    }

    @Transactional
    public void handleFightChange(Fight fight){
        List<Pick> fightPicks = picksRepository.findByFightId(fight);
        for(Pick pick : fightPicks){
            pick.setStatus(Pick.PickStatus.INVALID);
            pick.setInvalidReason("fight changed");
            pick.setInvalidatedAt(LocalDateTime.now());

            Notifications notification = new Notifications();
            notification.setUser(pick.getUser());
            notification.setType(Notifications.Type.FIGHT_CHANGED);
            notification.setCreatedAt(LocalDateTime.now());
            notification.setRead(false);

            notificationsRepository.save(notification);
        }
        picksRepository.saveAll(fightPicks);
    }

    public int parseTime(String time){
        String[] timeParse = time.split(":");
        int parsedTime = (Integer.parseInt(timeParse[0]) * 60 + (Integer.parseInt(timeParse[1])));
        return parsedTime;
    }

    public int parseHeight(String height){
        char[] chars = height.toCharArray();
        int totalInches = 12 * Character.getNumericValue(chars[0]);
        if(Character.isDigit(chars[3]) && Character.isDigit(chars[4])){
            totalInches += Character.getNumericValue(chars[3] + chars[4]);
        } else{
            totalInches += Character.getNumericValue(chars[3]);
        }
        return totalInches;
    }

    private Document fetchFightDetailsWithRetry(String fightStatsId) throws InterruptedException {
        while(true){
            try{
                return Jsoup.connect("http:/ufcstats.com/fight-details/" + fightStatsId).get();
            } catch (HttpStatusException e){
                System.out.println("Connection failed, retrying...");
                Thread.sleep(1500);
            } catch (IOException e) {
                throw new RuntimeException(e);
            }
        }
    }

    private boolean isFightCompleted(Document fightPage){
        return !fightPage.select("i.b-fight-details__person-status_style_gray").isEmpty();
    }
}
