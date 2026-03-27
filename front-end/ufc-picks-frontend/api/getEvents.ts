export async function getEvents() {
  const baseApi = "https://263b9k85f2.execute-api.us-east-2.amazonaws.com";

  const response = await fetch(`${baseApi}/api/events/getAllUpcoming`);

  if (!response.ok) {
    throw new Error(`getEvents failed: ${response.status}`);
  }

  const json = await response.json();

  return Array.isArray(json) ? json : [];
}