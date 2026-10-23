"use client";

// DEMO ONLY: no real authentication. Replace with a real auth provider once the
// accounts backend is chosen; the rest of the account UI only depends on this hook.
import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type User = { name: string; email: string };
type Ctx = { user: User | null; ready: boolean; login: (email: string, name?: string) => void; logout: () => void; update: (u: Partial<User>) => void };

const Auth = createContext<Ctx | null>(null);
const KEY = "tochtstrippen-demo-user";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setUser(JSON.parse(raw));
    } catch {}
    setReady(true);
  }, []);

  const save = (u: User | null) => {
    setUser(u);
    try {
      if (u) localStorage.setItem(KEY, JSON.stringify(u));
      else localStorage.removeItem(KEY);
    } catch {}
  };

  return (
    <Auth.Provider
      value={{
        user, ready,
        login: (email, name) => save({ email, name: name || email.split("@")[0].replace(/[._-]/g, " ").replace(/^./, (c) => c.toUpperCase()) }),
        logout: () => save(null),
        update: (u) => user && save({ ...user, ...u }),
      }}
    >
      {children}
    </Auth.Provider>
  );
}

export const useAuth = () => {
  const c = useContext(Auth);
  if (!c) throw new Error("useAuth outside AuthProvider");
  return c;
};
