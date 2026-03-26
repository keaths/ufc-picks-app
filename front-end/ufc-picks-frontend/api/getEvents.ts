

export async function getEvents(){
    const base_api = "https://263b9k85f2.execute-api.us-east-2.amazonaws.com";

    const data = await fetch(`${base_api}/api/events/getAllUpcoming`);

    return data.json();
}