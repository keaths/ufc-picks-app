import { EventSummary } from "@/types/EventSummary";

const api_base_url = "https://263b9k85f2.execute-api.us-east-2.amazonaws.com";

export async function getUpcomingEvents(): Promise<EventSummary[]>{
    const response = await fetch(`${api_base_url}/api/events/getAllUpcoming`);

    if(! response.ok){
        throw new Error("Failed to retrieve upcoming events");
    }
    
    const data: EventSummary[] = await response.json();

    return data;
}