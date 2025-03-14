const BASE_URL = import.meta.env.VITE_API_URL;
import axios from "axios";

export async function getToken2() {
  const res = await fetch(`${BASE_URL}/auth/token`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
  const output = await res.json();
  if (!res.ok) {
    throw new Error(output.error || "Getting token failed");
  }
  return output.token;
}

export async function verifyToken(token) {
  console.log("verifyToken", token, `${BASE_URL}/auth/verify`);
  const res = await fetch(`${BASE_URL}/auth/verify`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const output = await res.json();
  if (!res.ok) {
    throw new Error(output.error || "Verifying token failed");
  }
  return output;
}

export async function chat(token, data) {
  const res = await fetch(`${BASE_URL}/chat/chat`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  const out = await res.json();
  if (!res.ok) {
    throw new Error(out.error || "Chat failed");
  }
  return out;
}

export async function getChatHistory(token, documentId) {
  if (!documentId) {
    throw new Error("Document ID is required");
  }

  const res = await fetch(`${BASE_URL}/chat/history/${documentId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.error || "Fetching chat history failed");
  }
  return data;
}

export async function getChatImage(token, imageId) {
  if (!imageId) {
    throw new Error("Image ID is required");
  }
  const res = await fetch(`${BASE_URL}/chat/image/${imageId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.error || "Fetching chat image failed");
  }
  return data;
}

export async function uploadDocument(token, data) {
  const formData = new FormData();
  formData.append("file", data.file);
  formData.append("fileName", data.fileName);
  try {
    const res = await axios.post(`${BASE_URL}/documents/upload`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || "Uploading document failed");
  }
}

export async function getUserDocuments(token) {
  const res = await fetch(`${BASE_URL}/documents`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.error || "Fetching user documents failed");
  }
  return data;
}

export async function getDocumentById(token, documentId) {
  const res = await fetch(`${BASE_URL}/documents/${documentId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.error || "Fetching document by ID failed");
  }
  return data;
}
