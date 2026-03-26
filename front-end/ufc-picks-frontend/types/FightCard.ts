import { FighterSummary } from "./FighterSummary";

export interface Fight {
    fightId: number,
    weightClass: string,
    isTitleFight: boolean,
    status: string,
    redFighter: FighterSummary,
    blueFighter: FighterSummary,
    winnerCorner: string,
    method: string,
    endRound: number
}