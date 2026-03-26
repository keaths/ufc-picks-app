import { FighterSummary } from "./FighterSummary";

type Method = "KO_TKO" | "SUBMISSION" | "DECISION"


export interface Picks {
    userId: number;
    fightId: number;
    pickedFighterId: number;
    pickedFIghter: FighterSummary;
    pickedMethod: Method,
    pickedRound: number,
    pointsAward: number | null
}