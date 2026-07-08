import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";

interface AuthContextValue {
  cashierName: string | null;
  isAuthenticated: boolean;
  login: (name: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

/**
 * Holds "who is logged in" for the whole app. Login.tsx calls login()
 * on submit, Header.tsx reads cashierName to display it, and the
 * logout button in Header.tsx calls logout(). App.tsx uses
 * isAuthenticated to decide whether protected routes render or
 * redirect to /login.
 */
export function AuthProvider({ children }: { children: ReactNode }) {
  const [cashierName, setCashierName] = useState<string | null>(null);

  function login(name: string) {
    setCashierName(name);
  }

  function logout() {
    setCashierName(null);
  }

  return (
    <AuthContext.Provider
      value={{
        cashierName,
        isAuthenticated: cashierName !== null,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within an <AuthProvider>");
  }
  return ctx;
}
