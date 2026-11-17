import { createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode } from 'react';
import { authRequest, type AccountUser } from '../lib/auth';

type AuthState =
  | { status: 'loading' | 'signed-out' | 'unavailable'; user: null }
  | { status: 'signed-in'; user: AccountUser };

interface AuthContextValue {
  state: AuthState;
  changeSession: (action: string, fields?: Record<string, string>) => Promise<void>;
  refresh: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);
const sessionEvent = 'sparkdv-session-changed';

function sessionState(user: AccountUser | null): AuthState {
  return user ? { status: 'signed-in', user } : { status: 'signed-out', user: null };
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AuthState>({ status: 'loading', user: null });
  const revision = useRef(0);

  const refresh = useCallback(async () => {
    const request = ++revision.current;
    try {
      const user = await authRequest();
      if (request === revision.current) setState(sessionState(user));
    } catch {
      if (request === revision.current) setState({ status: 'unavailable', user: null });
    }
  }, []);

  const changeSession = useCallback(async (action: string, fields?: Record<string, string>) => {
    const user = await authRequest(action, fields);
    revision.current++;
    setState(sessionState(user));
    // Other tabs only receive a notification, never session credentials.
    try { localStorage.setItem(sessionEvent, String(Math.random())); } catch { /* Browser storage can be disabled. */ }
  }, []);

  useEffect(() => {
    void refresh();
    const onStorage = (event: StorageEvent) => { if (event.key === sessionEvent) void refresh(); };
    window.addEventListener('storage', onStorage);
    window.addEventListener('focus', refresh);
    return () => {
      revision.current++;
      window.removeEventListener('storage', onStorage);
      window.removeEventListener('focus', refresh);
    };
  }, [refresh]);

  return <AuthContext.Provider value={{ state, changeSession, refresh }}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('AuthProvider is required');
  return { ...context.state, changeSession: context.changeSession, refresh: context.refresh };
}
