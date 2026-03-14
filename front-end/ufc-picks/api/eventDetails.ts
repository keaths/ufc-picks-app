import { EventDetails } from "@/types/EventDetails";

const api_base_url = "https://263b9k85f2.execute-api.us-east-2.amazonaws.com";

export async function getEventDetails(eventId: number): Promise<EventDetails>{

    const response = await fetch(`${api_base_url}/api/events/${eventId}/details`);

    if(!response.ok){
        throw new Error("");
    }

    return response.json();
}