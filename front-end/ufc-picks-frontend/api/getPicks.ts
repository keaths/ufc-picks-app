
export async function getPicks(userId: number, eventId: number) {
    const base_api = "https://263b9k85f2.execute-api.us-east-2.amazonaws.com";

    const data = await fetch(`${base_api}/api/picks/${userId}/event/${eventId}`)

    return data.json();
}