
type Method = "KO_TKO" | "SUBMISSION" | "DECISION"

export interface PickRequest {
    userId: number,
    fightId: number,
    pickedFighterId: number | undefined,
    method: Method | null,
    endRound: number | null
}