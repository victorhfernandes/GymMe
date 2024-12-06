export async function fetchUrl(
  fetchUrl: string,
  postData?: any,
  method = "GET"
): Promise<any> {
  const URL = import.meta.env.VITE_API_URL;
  const response = await fetch(`${URL}${fetchUrl}`, {
    headers: {
      "Content-Type": "application/json",
    },
    method: method,
    body: JSON.stringify(postData),
  });
  const data = await response.json();
  if (method === "GET") {
    return data;
  } else {
    return response;
  }
}
