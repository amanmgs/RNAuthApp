import React, {
  createContext,
  useReducer,
  useEffect,
  ReactNode,
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
}

type AuthAction =
  | { type: 'RESTORE'; user: User | null }
  | { type: 'LOGIN'; user: User }
  | { type: 'SIGNUP'; user: User }
  | { type: 'LOGOUT' }
  | { type: 'ERROR'; error: string | null };

interface AuthContextType extends AuthState {
  login: (data: { email: string; password: string }) => Promise<{ ok: boolean; user?: User; error?: string }>;
  signup: (data: { name: string; email: string; password: string }) => Promise<{ ok: boolean; user?: User; error?: string }>;
  logout: () => Promise<void>;
  clearError: () => void;
}

interface AuthProviderProps {
  children: ReactNode;
}

const initialState: AuthState = {
  user: null,
  loading: true,
  error: null,
};

function authReducer(state: AuthState, action: AuthAction): AuthState {
  switch (action.type) {
    case 'RESTORE':
      return { ...state, user: action.user, loading: false };
    case 'LOGIN':
      return { ...state, user: action.user, error: null };
    case 'SIGNUP':
      return { ...state, user: action.user, error: null };
    case 'LOGOUT':
      return { ...state, user: null, error: null };
    case 'ERROR':
      return { ...state, error: action.error };
    default:
      return state;
  }
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Restore user on app load
  useEffect(() => {
    const restore = async () => {
      try {
        const json = await AsyncStorage.getItem('@auth_user');
        const user: User | null = json ? JSON.parse(json) : null;
        dispatch({ type: 'RESTORE', user });
      } catch {
        dispatch({ type: 'RESTORE', user: null });
      }
    };
    restore();
  }, []);

  // User Signup
  const signup = async ({ name, email, password }: { name: string; email: string; password: string }) => {
    try {
      const usersJson = await AsyncStorage.getItem('@users_db');
      const users: (User & { password: string })[] = usersJson ? JSON.parse(usersJson) : [];

      if (users.find(u => u.email === email)) {
        dispatch({ type: 'ERROR', error: 'Email already registered' });
        return { ok: false, error: 'Email already registered' };
      }

      const user: User = { id: Date.now().toString(), name, email };
      const newUsers = [...users, { ...user, password }];
      await AsyncStorage.setItem('@users_db', JSON.stringify(newUsers));
      await AsyncStorage.setItem('@auth_user', JSON.stringify(user));
      dispatch({ type: 'SIGNUP', user });
      return { ok: true, user };
    } catch {
      dispatch({ type: 'ERROR', error: 'Signup failed' });
      return { ok: false, error: 'Signup failed' };
    }
  };

  // User Login
  const login = async ({ email, password }: { email: string; password: string }) => {
    try {
      const usersJson = await AsyncStorage.getItem('@users_db');
      const users: (User & { password: string })[] = usersJson ? JSON.parse(usersJson) : [];

      const found = users.find(u => u.email === email && u.password === password);
      if (!found) {
        dispatch({ type: 'ERROR', error: 'Incorrect credentials' });
        return { ok: false, error: 'Incorrect credentials' };
      }

      const user: User = { id: found.id, name: found.name, email: found.email };
      await AsyncStorage.setItem('@auth_user', JSON.stringify(user));
      dispatch({ type: 'LOGIN', user });
      return { ok: true, user };
    } catch {
      dispatch({ type: 'ERROR', error: 'Login failed' });
      return { ok: false, error: 'Login failed' };
    }
  };

  // User Logout
  const logout = async () => {
    try {
      await AsyncStorage.removeItem('@auth_user');
      dispatch({ type: 'LOGOUT' });
    } catch (e) {
      console.error('Logout error:', e);
    }
  };

  const clearError = () => dispatch({ type: 'ERROR', error: null });

  const value: AuthContextType = {
    user: state.user,
    loading: state.loading,
    error: state.error,
    login,
    signup,
    logout,
    clearError,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Hook
export const useAuth = (): AuthContextType => {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;
