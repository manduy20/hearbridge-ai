export interface User {
  name: string;
  email: string;
}

export interface HistoryItem {
  title: string;
  tag: "Speech to Text" | "Text to Speech" | "AI Assistant";
  time: string;
  icon: string;
}

const isBrowser = typeof window !== "undefined";

/* ---------------- USER ---------------- */

export function getUser(): User | null {
  if (!isBrowser) return null;

  try {
    const user = localStorage.getItem("hearbridge_user");
    return user ? JSON.parse(user) : null;
  } catch {
    return null;
  }
}

export function login(email: string): User {
  const user: User = {
    email,
    name: email.split("@")[0],
  };

  if (isBrowser) {
    localStorage.setItem("hearbridge_user", JSON.stringify(user));
  }

  return user;
}

export function logout() {
  if (isBrowser) {
    localStorage.removeItem("hearbridge_user");
  }
}

/* ---------------- HISTORY ---------------- */

export function getHistory(): HistoryItem[] {
  const user = getUser();
  if (!user || !isBrowser) return [];

  try {
    return JSON.parse(
      localStorage.getItem(`history_${user.email}`) || "[]"
    );
  } catch {
    return [];
  }
}

export function addHistory(
  title: string,
  tag: "Speech to Text" | "Text to Speech" | "AI Assistant",
  icon: string
) {
  const user = getUser();
  if (!user || !isBrowser) return;

  const key = `history_${user.email}`;

  const oldData: HistoryItem[] = JSON.parse(
    localStorage.getItem(key) || "[]"
  );

  const newItem: HistoryItem = {
    title,
    tag,
    icon,
    time: new Date().toLocaleString("id-ID"),
  };

  localStorage.setItem(
    key,
    JSON.stringify([newItem, ...oldData])
  );
}
