import { FighterSummary } from "@/types/FighterSummary";

const api_base_url = "https://263b9k85f2.execute-api.us-east-2.amazonaws.com";

export type Method = "DECISION" | "KO_TKO" | "SUBMISSION" | null

export type ExistingPick = {
    userId: number;
    fightId: number;
    pickedFighterId: number;
    pickedFighter: FighterSummary;
    pickedMethod: Method;
    pickedRound: number | null
}


export async function getPicks(userId: number, eventId: number): Promise<ExistingPick[]> {

    const response = await fetch(`${api_base_url}/api/picks/${userId}/event/${eventId}`);

    return response.json();
}