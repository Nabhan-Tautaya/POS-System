const API_URL = import.meta.env.VITE_API_URL as string;

export async function healthCheck() {
  const response = await fetch(`${API_URL}/api/health`);

  return response.json();
}
