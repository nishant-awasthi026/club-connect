const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:4000";

export function getAuthToken() {
  return localStorage.getItem("auth_token") || "";
}

export async function apiFetch(path: string, options: RequestInit = {}) {
  const headers: Record<string, string> = { "Content-Type": "application/json", ...(options.headers as any) };
  const token = getAuthToken();
  if (token) headers["Authorization"] = `Bearer ${token}`;
  const res = await fetch(`${API_BASE}${path}`, { ...options, headers });
  if (!res.ok) {
    let msg = `HTTP ${res.status}`;
    try { const data = await res.json(); msg = data.error || msg; } catch {}
    throw new Error(msg);
  }
  const text = await res.text();
  try { return text ? JSON.parse(text) : null; } catch { return text; }
}

export const api = {
  auth: {
    signin: (email: string, password: string) => apiFetch("/api/auth/signin", { method: "POST", body: JSON.stringify({ email, password }) }),
    signup: (email: string, password: string, name: string, role?: string) => apiFetch("/api/auth/signup", { method: "POST", body: JSON.stringify({ email, password, name, role }) }),
  },
  recruitments: {
    list: () => apiFetch("/api/recruitments"),
    create: (payload: any) => apiFetch("/api/recruitments", { method: "POST", body: JSON.stringify(payload) }),
    setStatus: (id: number, status: "ACTIVE" | "PAUSED" | "CLOSED") => apiFetch(`/api/recruitments/${id}/status`, { method: "POST", body: JSON.stringify({ status }) }),
  },
  applications: {
    listByRecruitment: (id: number) => apiFetch(`/api/applications/recruitment/${id}`),
    apply: (payload: any) => apiFetch(`/api/applications/apply`, { method: "POST", body: JSON.stringify(payload) }),
  }
};


