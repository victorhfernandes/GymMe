export async function fetchUrl(fetchUrl: string): Promise<Array<never>> {
  const URL = import.meta.env.VITE_API_URL;
  const response = await fetch(`${URL}${fetchUrl}`);
  const data = await response.json();
  return data;
}
