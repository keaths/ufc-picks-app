import { FighterSummary } from "./FighterSummary";

export interface Event {
    eventId: number;
    eventName: string;
    eventDate: string;
    location: string;
    picksLocked: boolean;
    redFighter: FighterSummary;
    blueFighter: FighterSummary;
    pickCount: number;
    fightCount: number;
    correctPicks: number;
}