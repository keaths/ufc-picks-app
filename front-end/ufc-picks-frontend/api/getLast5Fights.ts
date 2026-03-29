
export async function getLast5Fights(fighterId: number | null){
    const base_api = "https://263b9k85f2.execute-api.us-east-2.amazonaws.com";

    const data = await fetch(`${base_api}/api/fights/getLast5/${fighterId}`);

    return data.json();
}