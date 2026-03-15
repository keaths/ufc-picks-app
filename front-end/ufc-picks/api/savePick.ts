export type CreatePickRequest = {
    userId: number | null;
    fightId: number | null;
    pickedFighterId: number | null;
    method: "DECISION" | "KO_TKO" | "SUBMISSION" | null
    endRound: number | null;
}

const base_api = "https://263b9k85f2.execute-api.us-east-2.amazonaws.com";

export async function savePick(payLoad: CreatePickRequest): Promise<void> {
    const response = await fetch(`${base_api}/api/picks`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(payLoad),
    });

    if(!response.ok){
        const text = await response.text();
        throw new Error(text || "Failed to save pick");
    }
}

