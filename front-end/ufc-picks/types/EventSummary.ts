import { FighterSummary } from "./FighterSummary";

export interface EventSummary{
    eventId: number,
    eventName: string,
    eventDate: string,
    location: string,
    picksLocked: boolean,
    isTitle: boolean,
    redFighter: FighterSummary,
    blueFighter: FighterSummary
}