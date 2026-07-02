const API_BASE =
  import.meta.env.VITE_API_URL || "http://localhost:5005";

const getHeaders = () => {
  const token = localStorage.getItem("token");

  const headers = {
    "Content-Type": "application/json",
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  return headers;
};

const handleResponse = async (response) => {
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "API request failed");
  }

  return data;
};

export const api = {
  get: async (url) => {
    const res = await fetch(`${API_BASE}${url}`, {
      method: "GET",
      headers: getHeaders(),
    });

    return handleResponse(res);
  },

  post: async (url, body) => {
    const res = await fetch(`${API_BASE}${url}`, {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify(body),
    });

    return handleResponse(res);
  },

  put: async (url, body) => {
    const res = await fetch(`${API_BASE}${url}`, {
      method: "PUT",
      headers: getHeaders(),
      body: JSON.stringify(body),
    });

    return handleResponse(res);
  },

  delete: async (url) => {
    const res = await fetch(`${API_BASE}${url}`, {
      method: "DELETE",
      headers: getHeaders(),
    });

    return handleResponse(res);
  },
};