package com.example.ufcproj;


import com.example.ufcproj.jobs.UfcUpdateJobService;
import com.example.ufcproj.repository.EventRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

import java.io.IOException;


@SpringBootApplication
@EnableJpaRepositories
public class UfcprojApplication {

	public static void main(String[] args) throws IOException, InterruptedException {

		SpringApplication.run(UfcprojApplication.class, args);
	}

	@Bean
	public CommandLineRunner runAfterStartup(UfcUpdateJobService jobService) {
		return args -> {
			System.out.println("Running daily refresh locally...");
			jobService.runDailyRefresh();
		};
	}

//	public static void getFightDetailsUpdated(FighterRepository fighterRepository, EventRepository eventRepository, FightRepository fightRepository, RoundRepository roundRepository) throws InterruptedException, IOException {
//		List<Event> upcomingEvents = eventRepository.findByStatus(Event.Status.SCHEDULED);
//		for(int i = 0; i < upcomingEvents.size(); i++){
//			if(upcomingEvents.get(i).getEventDate().isAfter(LocalDate.now())){
//				System.out.println(upcomingEvents.get(i).getEventName() + " is in future.");
//				continue;
//			}
//			List<Fight> fights = fightRepository.findByEvent_EventIdAndStatus(upcomingEvents.get(i).getEventId(), Fight.Status.SCHEDULED);
//			if(fights.isEmpty()){
//				upcomingEvents.get(i).setStatus(Event.Status.COMPLETED);
//				eventRepository.save(upcomingEvents.get(i));
//			}
//			else{
//				boolean fightConnected = false;
//				for(int x = 0; x < fights.size(); x++){
//					while(!fightConnected){
//						try{
//							Document fightPage = Jsoup.connect("http://ufcstats.com/fight-details/" + fights.get(x).getStatsId()).get();
//							fightConnected = true;
//							if(!fightPage.select("i.b-fight-details__person-status_style_gray").isEmpty()){
//								Fight fight = fightRepository.findByStatsId(fights.get(x).getStatsId());
//
////							int endRound = Integer.parseInt(fightPage.select("tbody tr:nth-child(" + (x + 1) + ") td:nth-child(9)").text().trim());
////							fight.setEndRound(endRound);
//								int endRound = Integer.parseInt(fightPage.select("p.b-fight-details__text i.b-fight-details__text-item:nth-child(2)").getFirst().text().trim().split(": ")[1]);
//								fight.setEndRound(endRound);
//								int endTime = parseTime(fightPage.select("p.b-fight-details__text i.b-fight-details__text-item:nth-child(3)").getFirst().text().trim().split(": ")[1]);
//								fight.setEndTimeSec(endTime);
//								String methodDetail = null;
//								try{
//									methodDetail = fightPage.select("p.b-fight-details__text i.b-fight-details__text-item_first i:nth-child(2)").text().trim();
//								} catch (RuntimeException e){
//									methodDetail = "";
//								}
//								fight.setMethod(methodDetail);
//
//								String fightWinner = null;
//								String possDraw = null;
//								try{
//									fightWinner = fightPage.select("i.b-fight-details__person-status_style_green + div h3 a").text().trim();
//									possDraw = fightPage.select("div.b-fight-details__person:nth-child(1) i").text().trim();
//
//								} catch (RuntimeException e){
//
//								}
//								if(fightWinner.contains(fight.getRedFighterId().getFirstName()) && fightWinner.contains(fight.getRedFighterId().getLastName())){
//									fight.setWinnerCorner(Fight.WinnerCorner.RED);
//								} else if(fightWinner.contains(fight.getBlueFighterId().getFirstName()) && fightWinner.contains(fight.getBlueFighterId().getLastName())){
//									fight.setWinnerCorner(Fight.WinnerCorner.BLUE);
//								} else if(possDraw.equals("D")){
//									fight.setWinnerCorner(Fight.WinnerCorner.DRAW);
//								} else{
//									fight.setWinnerCorner(Fight.WinnerCorner.NC);
//								}
//								fight.setStatus(Fight.Status.COMPLETED);
//								Fight savedFight = fightRepository.save(fight);
//
//								ArrayList<Element> rounds = new ArrayList<>();
//								try{
//									rounds = fightPage.select("table.b-fight-details__table").getFirst().select("tbody tr");
//								} catch (RuntimeException e){
//									System.out.println("no data");
//								}
//
//								for(int y = 0; y < rounds.size(); y++){
//									for(int j = 0; j < 2; j++){
//										Round round = new Round();
//										round.setFight(savedFight);
//										round.setRoundNum(y + 1);
//										round.setFighter(fighterRepository.findByUfcStatId(rounds.get(y).select("td:nth-child(1) p:nth-child(" + (j + 1) + ") a").attr("abs:href").trim().split("/")[4]));
//
//										if(savedFight.getRedFighterId().getFighterId().equals(round.getFighter().getFighterId())){
//											round.setCorner(Round.Corner.RED);
//										} else{
//											round.setCorner(Round.Corner.BLUE);
//										}
//										round.setKd(Integer.parseInt(rounds.get(y).select("td:nth-child(2) p:nth-child(" + (j + 1) + ")").text().trim()));
//										round.setSigStrikesLand(Integer.parseInt(rounds.get(y).select("td:nth-child(3) p:nth-child(" + (j + 1) + ")").text().trim().split(" ")[0]));
//										round.setSigStrikesAtt(Integer.parseInt(rounds.get(y).select("td:nth-child(3) p:nth-child(" + (j + 1) + ")").text().trim().split(" ")[2]));
//										round.setTotalStrikeLand(Integer.parseInt(rounds.get(y).select("td:nth-child(5) p:nth-child(" + (j + 1) + ")").text().trim().split(" ")[0]));
//										round.setTotalStrikeAtt(Integer.parseInt(rounds.get(y).select("td:nth-child(5) p:nth-child(" + (j + 1) + ")").text().trim().split(" ")[2]));
//										round.setTakeDownLand(Integer.parseInt(rounds.get(y).select("td:nth-child(6) p:nth-child(" + (j + 1) + ")").text().trim().split(" ")[0]));
//										round.setTakeDownAtt(Integer.parseInt(rounds.get(y).select("td:nth-child(6) p:nth-child(" + (j + 1) + ")").text().trim().split(" ")[2]));
//										round.setSubAttempt(Integer.parseInt(rounds.get(y).select("td:nth-child(8) p:nth-child(" + (j + 1) + ")").text().trim()));
//										try{
//											round.setControlTime(parseTime(rounds.get(y).select("td:nth-child(10) p:nth-child(" + (j + 1) + ")").text().trim()));
//										} catch (RuntimeException e){
//
//										}
//										roundRepository.save(round);
//									}
//								}
//							} else{
//								System.out.println("Not completed");
//								continue;
//							}
//						} catch (HttpStatusException e){
//							System.out.println("Connection failed. Retrying...");
//						}
//					}
//					fightConnected = false;
//				}
//			}
//		}
//	}
//
//	public static void updateEvents(EventRepository eventRepository) throws IOException {
//		Document eventPage = Jsoup.connect("http://ufcstats.com/statistics/events/upcoming").get();
//		ArrayList<Element> events = eventPage.select("tbody tr");
//		events.removeFirst();
//
//		for(int i = 0; i < events.size(); i++){
//			if(eventRepository.findByEventName(events.get(i).select("a").text().trim()) != null){
//				System.out.println("Event parsed. Continuing...");
//				continue;
//			}
//			Event event = new Event();
//
//			event.setStatsId(events.get(i).select("a").attr("abs:href").split("/")[4]);
//			event.setEventName(events.get(i).select("a").text().trim());
//			String date = events.get(i).select("span").text().trim();
//			DateTimeFormatter formatter = DateTimeFormatter.ofPattern("MMMM d, yyyy", Locale.ENGLISH);
//			LocalDate date1 = LocalDate.parse(date, formatter);
//			if(date1.isAfter(LocalDate.now())){
//				event.setStatus(Event.Status.SCHEDULED);
//			} else if(date1.isBefore(LocalDate.now())){
//				event.setStatus(Event.Status.COMPLETED);
//			}
//			event.setEventDate(date1);
//			event.setLocation(events.get(i).select("td:nth-child(2)").text().trim());
//
//			eventRepository.save(event);
//		}
//		System.out.println("Events done");
//	}
//
//	public static void getUpcomingFights(EventRepository eventRepository, FightRepository fightRepository, FighterRepository fighterRepository) throws InterruptedException {
//		List<Event> upcomingEvents = eventRepository.findByStatus(Event.Status.SCHEDULED);
//		boolean eventConnected = false;
//
//		for(int i = 0; i < upcomingEvents.size(); i++){
//			while(!eventConnected){
//				try{
//					Document eventPage = Jsoup.connect("http://ufcstats.com/event-details/" + upcomingEvents.get(i).getStatsId()).get();
//					eventConnected = true;
//
//					ArrayList<Element> eventFights = eventPage.select("tbody tr");
//					List<Fight> fights = fightRepository.findByEvent_EventIdAndStatus(upcomingEvents.get(i).getEventId(), Fight.Status.SCHEDULED);
//					for(int x = 0; x < eventFights.size(); x++){
//						String statsId = eventFights.get(x).select("td:nth-child(5) a").attr("data-link").split("/")[4];
//						Fight foundFight = fightRepository.findByStatsId(statsId);
//						String redStat = eventFights.get(x).select("td:nth-child(2) p:nth-child(1) a").attr("abd:href").split("/")[4];
//						String blueStat = eventFights.get(x).select("td:nth-child(2) p:nth-child(2) a").attr("abd:href").split("/")[4];
//						String weightClass = eventFights.get(x).select("td:nth-child(7) p").text().trim();
//						boolean isTitle = !eventFights.get(x).select("img[src*=belt]").isEmpty();
//
//						if(foundFight == null){
//							Fight fight = new Fight();
//							fight.setEvent(upcomingEvents.get(i));
//							fight.setStatsId(statsId);
//							fight.setWeightClass(weightClass);
//							String redFighterLast = null;
//							String redFighterFirst = eventFights.get(x).select("td:nth-child(2) p:nth-child(1) a").text().trim().split(" ")[0];
//							try {
//								redFighterLast = eventFights.get(x).select("td:nth-child(2) p:nth-child(1) a").text().trim().split(" ")[1];
//							} catch (RuntimeException e){
//
//							}
//
//							Fighter redFighter = fighterRepository.findByUfcStatId(redStat);
//							if(redFighter == null){
//								addNewFighter(fighterRepository, redFighterFirst, redFighterLast, weightClass);
//								redFighter = fighterRepository.findByFirstNameAndLastName(redFighterFirst + redFighterLast + weightClass);
//							}
//							fight.setRedFighterId(redFighter);
//
//							String blueFighterFirst = eventFights.get(x).select("td:nth-child(2) p:nth-child(2) a").text().trim().split(" ")[0];
//							String blueFighterLast = eventFights.get(x).select("td:nth-child(2) p:nth-child(2) a").text().trim().split(" ")[1];
//							Fighter blueFighter = fighterRepository.findByUfcStatId(blueStat);
//							if(blueFighter == null){
//								addNewFighter(fighterRepository, blueFighterFirst, blueFighterLast, weightClass);
//								blueFighter = fighterRepository.findByFirstNameAndLastNameAndWeight(blueFighterFirst + blueFighterLast + weightClass);
//							}
//							fight.setBlueFighterId(blueFighter);
//							fight.setIsTitleBout(isTitle);
//							fight.setStatus(Fight.Status.SCHEDULED);
//
//							fightRepository.save(fight);
//						}
//						else {
//							if(!foundFight.getRedFighterId().getUfcStatId().equals(redStat)){
//								foundFight.setRedFighterId(fighterRepository.findByUfcStatId(redStat));
//							}
//							if(!foundFight.getBlueFighterId().getUfcStatId().equals(blueStat)){
//								foundFight.setBlueFighterId(fighterRepository.findByUfcStatId(blueStat));
//							}
//							if(!foundFight.getWeightClass().equals(weightClass)){
//								foundFight.setWeightClass(weightClass);
//							}
//							if(foundFight.getIsTitleBout() != isTitle){
//								foundFight.setIsTitleBout(isTitle);
//							}
//							fightRepository.save(foundFight);
//						}
//					}
//				} catch (IOException e) {
//                    System.out.println("Connection failed. Retrying...");
//					Thread.sleep(1500);
//                }
//            }
//			eventConnected = false;
//			System.out.println("Event " + i + " of " + upcomingEvents.size() + " collected");
//		}
//	}
//
//	public static void addNewFighter(FighterRepository fighterRepository, String firstName, String lastName, String weightClass) throws IOException {
//		Document searchFighter = Jsoup.connect("http://ufcstats.com/statistics/fighters/search?query=" + lastName).get();
//		ArrayList<Element> fighters = searchFighter.select("tbody tr");
//		fighters.removeFirst();
//
//		for(int i = 0; i < fighters.size(); i++){
//			if(fighters.get(i).select("td:nth-child(1) a").text().trim().equals(firstName) && fighters.get(i).select("td:nth-child(2) a").text().trim().equals(lastName)){
//				Fighter fighter = new Fighter();
//				fighter.setUfcStatId(fighters.get(i).select("td:nth-child(1) a").attr("abs:href").split("/")[4]);
//				fighter.setFirstName(fighters.get(i).select("td:nth-child(1)").text().trim());
//				fighter.setLastName(fighters.get(i).select("td:nth-child(2)").text().trim());
//				String nickName = fighters.get(i).select("td:nth-child(3)").text().trim();
//				fighter.setWeight(weightClass);
//				if (!nickName.isEmpty()) {
//					fighter.setNickname(fighters.get(i).select("td:nth-child(3)").text().trim());
//				}
//				String heightString = fighters.get(i).select("td:nth-child(4)").text().trim();
//				int height = 0;
//				if (!heightString.contains("--")) {
//					fighter.setHeight(height = parseHeight(heightString));
//				}
//				String reachString = fighters.get(i).select("td:nth-child(6)").text().trim();
//				double reach = 0;
//				if (!reachString.contains("--")) {
//					fighter.setReach(Double.parseDouble(fighters.get(i).select("td:nth-child(6)").text().trim().replace("\"", "")));
//				}
//				String stance = fighters.get(i).select("td:nth-child(7)").text().trim();
//				if (!stance.isEmpty()) {
//					fighter.setStance(fighters.get(i).select("td:nth-child(7)").text().trim());
//				}
//				fighter.setWin(Integer.parseInt(fighters.get(i).select("td:nth-child(8)").text().trim()));
//				fighter.setLoss(Integer.parseInt(fighters.get(i).select("td:nth-child(9)").text().trim()));
//				fighter.setDraw(Integer.parseInt(fighters.get(i).select("td:nth-child(10)").text().trim()));
//
//				fighterRepository.save(fighter);
//				System.out.println("Fighter added");
//				break;
//			}
//		}
//	}
//
//	public static void getEvents(EventRepository eventRepository) throws IOException {
//		Document eventPage = Jsoup.connect("http://ufcstats.com/statistics/events/completed?page=all").get();
//		ArrayList<Element> events = eventPage.select("tbody tr");
//		events.removeFirst();
//
//		for(int i = 0; i < events.size(); i++){
////			if(eventRepository.findByEventName(events.get(i).select("a").text().trim()) != null){
////				break;
////			}
//			Event event = new Event();
//
//			event.setStatsId(events.get(i).select("a").attr("abs:href").split("/")[4]);
//			event.setEventName(events.get(i).select("a").text().trim());
//			String date = events.get(i).select("span").text().trim();
//			DateTimeFormatter formatter = DateTimeFormatter.ofPattern("MMMM d, yyyy", Locale.ENGLISH);
//			LocalDate date1 = LocalDate.parse(date, formatter);
//			if(date1.isAfter(LocalDate.now())){
//				event.setStatus(Event.Status.SCHEDULED);
//			} else if(date1.isBefore(LocalDate.now())){
//				event.setStatus(Event.Status.COMPLETED);
//			}
//			event.setEventDate(date1);
//			event.setLocation(events.get(i).select("td:nth-child(2)").text().trim());
//
//			eventRepository.save(event);
//		}
//		System.out.println("Events done");
//	}
//
//	public static void getFighters(FighterRepository fighterRepository) throws IOException, InterruptedException {
//		Document doc = Jsoup.connect("http://ufcstats.com/statistics/fighters?char=a&page=all").get();
//		char[] alphabet = {'a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'};
//		boolean connected = false;
//		int time = 1500;
//		//get fighters
//		for (int i = 0; i < 26; i++) {
//			while (!connected) {
//				try {
//					Document AlphaFighters = Jsoup.connect("http://ufcstats.com/statistics/fighters?char=" + alphabet[i] + "&page=all").get();
//					connected = true;
//					ArrayList<Element> fighters = AlphaFighters.select("tbody tr");
//					fighters.removeFirst();
//					for (int x = 0; x < fighters.size(); x++) {
//						Fighter fighter = new Fighter();
//						fighter.setUfcStatId(fighters.get(x).select("td:nth-child(1) a").attr("abs:href").split("/")[4]);
//						fighter.setFirstName(fighters.get(x).select("td:nth-child(1)").text().trim());
//						fighter.setLastName(fighters.get(x).select("td:nth-child(2)").text().trim());
//						String nickName = fighters.get(x).select("td:nth-child(3)").text().trim();
//						String weight = fighters.get(x).select("td:nth-child(5)").text().replace(" lbs.", "").trim();
//						fighter.setWeight(parseWeight(weight));
//						if (!nickName.isEmpty()) {
//							fighter.setNickname(fighters.get(x).select("td:nth-child(3)").text().trim());
//						}
//						String heightString = fighters.get(x).select("td:nth-child(4)").text().trim();
//						int height = 0;
//						if (!heightString.contains("--")) {
//							fighter.setHeight(height = parseHeight(heightString));
//						}
//						String reachString = fighters.get(x).select("td:nth-child(6)").text().trim();
//						double reach = 0;
//						if (!reachString.contains("--")) {
//							fighter.setReach(Double.parseDouble(fighters.get(x).select("td:nth-child(6)").text().trim().replace("\"", "")));
//						}
//						String stance = fighters.get(x).select("td:nth-child(7)").text().trim();
//						if (!stance.isEmpty()) {
//							fighter.setStance(fighters.get(x).select("td:nth-child(7)").text().trim());
//						}
//						fighter.setWin(Integer.parseInt(fighters.get(x).select("td:nth-child(8)").text().trim()));
//						fighter.setLoss(Integer.parseInt(fighters.get(x).select("td:nth-child(9)").text().trim()));
//						fighter.setDraw(Integer.parseInt(fighters.get(x).select("td:nth-child(10)").text().trim()));
//
//						fighterRepository.save(fighter);
//					}
//				} catch (HttpStatusException e) {
//					System.out.println("connection failed, retrying...");
//					Thread.sleep(time);
//				}
//			}
//			connected = false;
//		}
//		System.out.println("fighters gathered");
//	}
//
//	public static void getFightDetails(FighterRepository fighterRepository, EventRepository eventRepository, FightRepository fightRepository, RoundRepository roundRepository) throws InterruptedException, IOException {
//		Document allEvents = Jsoup.connect("http://ufcstats.com/statistics/events/completed?page=all").get();
//		ArrayList<Element> eventLinkEls = allEvents.select("tbody tr a");
//		ArrayList<String> eventLinks = getLinks(eventLinkEls);
//		boolean eventConnected = false;
//		eventLinks.removeFirst();
//
//		for(int i = 0; i < eventLinks.size(); i++){
//			while(!eventConnected){
//				try{
//					Document eventFightPage = Jsoup.connect(eventLinks.get(i)).get();
//					eventConnected = true;
//					String eventTitle = eventFightPage.select("h2 span").text().trim();
//					Event foundEvent = eventRepository.findByEventName(eventTitle);
//
////					if(!fightRepository.findByEvent_EventId(foundEvent.getEventId()).isEmpty()){
////						System.out.println(eventTitle + " parsed, continuing...");
////						continue;
////					}
//					//this^
//					System.out.println("Parsing " + eventTitle);
//
//					ArrayList<Element> fights = eventFightPage.select("tbody tr p:nth-child(1) a.b-flag");
//					ArrayList<String> fightLinks = getLinks(fights);
//					boolean fightConnected = false;
//
//					for(int x = 0; x < fightLinks.size(); x++){
//						while(!fightConnected){
//							try{
//								Document fightPage = Jsoup.connect(fightLinks.get(x)).get();
//								fightConnected = true;
//
//								int endRound = Integer.parseInt(eventFightPage.select("tbody tr:nth-child(" + (x + 1) + ") td:nth-child(9)").text().trim());
//								int endTime = parseTime(eventFightPage.select("tbody tr:nth-child(" + (x + 1) + ") td:nth-child(10)").text().trim());
//								String method = eventFightPage.select("tbody tr:nth-child(" + (x + 1) + ") td:nth-child(8) p:nth-child(1)").text().trim();
//								String methodDetail = null;
//								try{
//									methodDetail = eventFightPage.select("tbody tr:nth-child(" + (x + 1) + ") td:nth-child(8) p:nth-child(2)").text().trim();
//								} catch (RuntimeException e){
//
//								}
//								String weight = eventFightPage.select("tbody tr:nth-child(" + (x + 1) + ") td:nth-child(7) p:nth-child(1)").text().trim();
//								Event event = eventRepository.findByEventName(eventFightPage.select("h2 span").text().trim());
//								boolean isTitle = !eventFightPage.select("tbody tr:nth-child(" + (x + 1) + ") img[src=\"http://1e49bc5171d173577ecd-1323f4090557a33db01577564f60846c.r80.cf1.rackcdn.com/belt.png\"]").isEmpty();
//
//								Fight fight = new Fight();
//								fight.setStatsId(fightLinks.get(x).split("/")[4]);
//
//								fight.setIsTitleBout(isTitle);
//								fight.setEvent(event);
//								fight.setEndRound(endRound);
//								fight.setEndTimeSec(endTime);
//								fight.setMethod(method);
//								fight.setMethodDetail(methodDetail);
//								fight.setWeightClass(weight);
//
//								Fighter redFighter = fighterRepository.findByUfcStatId(fightPage.select("div.clearfix div.b-fight-details__person:nth-child(1) h3 a").attr("abs:href").split("/")[4]);
//								Fighter blueFighter = fighterRepository.findByUfcStatId(fightPage.select("div.clearfix div.b-fight-details__person:nth-child(2) h3 a").attr("abs:href").split("/")[4]);
//
//								fight.setRedFighterId(redFighter);
//								fight.setBlueFighterId(blueFighter);
//
//								if(weight.contains("Women's")){
//									updateWomensWeight(fighterRepository, weight, blueFighter, redFighter);
//								}
//
//								String fightWinner = null;
//								String possDraw = null;
//								try{
//									fightWinner = fightPage.select("i.b-fight-details__person-status_style_green + div h3 a").text().trim();
//									possDraw = fightPage.select("div.b-fight-details__person:nth-child(1) i").text().trim();
//
//								} catch (RuntimeException e){
//
//								}
//								if(fightWinner.contains(redFighter.getFirstName()) && fightWinner.contains(redFighter.getLastName())){
//									fight.setWinnerCorner(Fight.WinnerCorner.RED);
//								} else if(fightWinner.contains(blueFighter.getFirstName()) && fightWinner.contains(blueFighter.getLastName())){
//									fight.setWinnerCorner(Fight.WinnerCorner.BLUE);
//								} else if(possDraw.equals("D")){
//									fight.setWinnerCorner(Fight.WinnerCorner.DRAW);
//								} else{
//									fight.setWinnerCorner(Fight.WinnerCorner.NC);
//								}
//								fight.setMethod(fightPage.select("i.b-fight-details__text-item_first i:nth-child(2)").text().trim());
//								Fight savedFight = fightRepository.save(fight);
//								ArrayList<Element> rounds = new ArrayList<>();
//								try{
//									rounds = fightPage.select("table.b-fight-details__table").getFirst().select("tbody tr");
//								} catch (RuntimeException e){
//									System.out.println("no data");
//								}
//
//								for(int y = 0; y < rounds.size(); y++){
//									for(int j = 0; j < 2; j++){
//										Round round = new Round();
//										round.setFight(savedFight);
//										round.setRoundNum(y + 1);
//										round.setFighter(fighterRepository.findByUfcStatId(rounds.get(y).select("td:nth-child(1) p:nth-child(" + (j + 1) + ") a").attr("abs:href").trim().split("/")[4]));
//										Fight fight1 = savedFight;
//										if(fight1.getRedFighterId().getFighterId().equals(round.getFighter().getFighterId())){
//											round.setCorner(Round.Corner.RED);
//										} else{
//											round.setCorner(Round.Corner.BLUE);
//										}
//										round.setKd(Integer.parseInt(rounds.get(y).select("td:nth-child(2) p:nth-child(" + (j + 1) + ")").text().trim()));
//										round.setSigStrikesLand(Integer.parseInt(rounds.get(y).select("td:nth-child(3) p:nth-child(" + (j + 1) + ")").text().trim().split(" ")[0]));
//										round.setSigStrikesAtt(Integer.parseInt(rounds.get(y).select("td:nth-child(3) p:nth-child(" + (j + 1) + ")").text().trim().split(" ")[2]));
//										round.setTotalStrikeLand(Integer.parseInt(rounds.get(y).select("td:nth-child(5) p:nth-child(" + (j + 1) + ")").text().trim().split(" ")[0]));
//										round.setTotalStrikeAtt(Integer.parseInt(rounds.get(y).select("td:nth-child(5) p:nth-child(" + (j + 1) + ")").text().trim().split(" ")[2]));
//										round.setTakeDownLand(Integer.parseInt(rounds.get(y).select("td:nth-child(6) p:nth-child(" + (j + 1) + ")").text().trim().split(" ")[0]));
//										round.setTakeDownAtt(Integer.parseInt(rounds.get(y).select("td:nth-child(6) p:nth-child(" + (j + 1) + ")").text().trim().split(" ")[2]));
//										round.setSubAttempt(Integer.parseInt(rounds.get(y).select("td:nth-child(8) p:nth-child(" + (j + 1) + ")").text().trim()));
//										try{
//											round.setControlTime(parseTime(rounds.get(y).select("td:nth-child(10) p:nth-child(" + (j + 1) + ")").text().trim()));
//										} catch (RuntimeException e){
//
//										}
//										roundRepository.save(round);
//										//left off here
//									}
//								}
//								System.out.println(fight.getRedFighterId().getLastName() + " vs " + fight.getBlueFighterId().getLastName() + " added");
//							} catch (HttpStatusException e){
//								System.out.println("Connection failed, retyring...");
//								Thread.sleep(1500);
//							}
//						}
//						fightConnected = false;
//					}
//				} catch(IOException e){
//					System.out.println("connection failed, retrying...");
//					Thread.sleep(1500);
//				}
//			}
//			eventConnected = false;
//			System.out.println((i + 1) + " events of " + eventLinks.size() + " added");
//		}
//	}
//
//	public static void getFighterHeadshots(FighterRepository fighterRepository) throws IOException, InterruptedException {
//
//		boolean pageConnect = false;
//		for(int i = 0; i < 283; i++){
//			while(!pageConnect){
//				try{
//					Document fighterPage = Jsoup.connect("https://www.ufc.com/athletes/all?page=" + (i + 1)).get();
//					pageConnect = true;
//					ArrayList<Element> fighterEls = fighterPage.select("div.item-list li.l-flex__item");
//					for(int x = 0; x < fighterEls.size(); x++){
//						String fullName = fighterEls.get(x).select("div.c-listing-athlete__text span.c-listing-athlete__name").text().trim().replace(" ", "");
//						String weight = fighterEls.get(x).select("span.c-listing-athlete__title div.field__item").text().trim().replace(" ", "").replace("-", "");
//						String fullStat = fullName + weight;
//						Fighter fighter = new Fighter();
//						try{
//							fighter = fighterRepository.findByFirstNameAndLastName(fullName);
//						}
//						catch (RuntimeException e){
//							fighter = fighterRepository.findByFirstNameAndLastNameAndWeight(fullStat);
//						}
//                        if(fighter != null && fighter.getHeadshotUrl() == null){
//							String src = fighterEls.get(x).select("div.c-listing-athlete__thumbnail img").attr("src");
//							if(!src.contains("ufc.com")){
//								fighter.setHeadshotUrl("https://www.ufc.com/themes/custom/ufc/assets/img/no-profile-image.png");
//							} else{
//								fighter.setHeadshotUrl(fighterEls.get(x).select("div.c-listing-athlete__thumbnail img").attr("src"));
//							}
//							fighterRepository.save(fighter);
//						}
//                    }
//				} catch (HttpStatusException e){
//					System.out.println("Connection failed, retrying...");
//					Thread.sleep(1500);
//				}
//			}
//			pageConnect = false;
//			System.out.println((i + 1) + " of 283 pages done");
//		}
//	}
//
//	public static ArrayList<String> getLinks(ArrayList<Element> elements){
//		ArrayList<String> links = new ArrayList<>();
//
//		for(int i = 0; i < elements.size(); i++){
//			links.add(elements.get(i).attr("abs:href").trim());
//		}
//
//		return links;
//	}
//
//	public static int parseHeight(String height){
//		char[] chars = height.toCharArray();
//		int totalInches = 12 * Character.getNumericValue(chars[0]);
//		if(Character.isDigit(chars[3]) && Character.isDigit(chars[4])){
//			totalInches += Character.getNumericValue(chars[3] + chars[4]);
//		} else{
//			totalInches += Character.getNumericValue(chars[3]);
//		}
//		return totalInches;
//	}
//
//	public static String parseWeight(String weight){
//
//		String fullWeight = "";
//
//		switch(weight){
//			case "115":
//				fullWeight = "Strawweight";
//				break;
//			case "125":
//				fullWeight = "Flyweight";
//				break;
//			case "135":
//				fullWeight = "Bantemweight";
//				break;
//			case "145":
//				fullWeight = "Featherweight";
//				break;
//			case "155":
//				fullWeight = "Lightweight";
//				break;
//			case "170":
//				fullWeight = "Welterweight";
//				break;
//			case "185":
//				fullWeight = "Middleweight";
//				break;
//			case "205":
//				fullWeight = "Light Heavyweight";
//				break;
//			default:
//				fullWeight = "Heavyweight";
//				break;
//		}
//
//		return fullWeight;
//	}
//
//	public static int parseTime(String time){
//		String[] timeParse = time.split(":");
//		int parsedTime = (Integer.parseInt(timeParse[0]) * 60 + (Integer.parseInt(timeParse[1])));
//		return parsedTime;
//	}
//
//	public static void updateWomensWeight(FighterRepository fighterRepository, String weight, Fighter fighter1, Fighter fighter2){
//		fighter1.setWeight(weight);
//		fighter2.setWeight(weight);
//
//		fighterRepository.save(fighter1);
//		fighterRepository.save(fighter2);
//	}

}
