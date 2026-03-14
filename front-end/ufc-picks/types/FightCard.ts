import { FighterSummary } from "./FighterSummary";

export interface FightCard{
    fightId: number,
    weightClass: string,
    isTitleFight: boolean,
    status: string,
    redFighter: FighterSummary,
    blueFighter: FighterSummary
}