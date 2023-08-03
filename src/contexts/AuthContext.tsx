/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext, useContext, useReducer } from "react";

const initialContext = {
  isAuthenticated: false,
  user: null as FakeUser | null,
  login: (email: string, password: string) => {},
  logout: () => {},
};

const AuthContext = createContext(initialContext);

type AuthState = {
  isAuthenticated: boolean;
  user: any;
};

const initialState = {
  user: null,
  isAuthenticated: false,
};

const reducer = (state: AuthState, action: any): AuthState => {
  switch (action.type) {
    case "login":
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
      };

    case "logout":
      return {
        ...state,
        user: null,
        isAuthenticated: false,
      };

    default:
      return state;
  }
};

export type FakeUser = {
  name: string;
  email: string;
  password: string;
  avatar: string;
};

const FAKE_USER: FakeUser = {
  name: "Damir",
  email: "damir@example.com",
  password: "qwerty",
  avatar: "/public/user.webp",
};

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [{ user, isAuthenticated }, dispatch] = useReducer(
    reducer,
    initialState
  );

  const login = (email: string, password: string) => {
    if (email === FAKE_USER.email && password === FAKE_USER.password) {
      dispatch({
        type: "login",
        payload: FAKE_USER,
      });
    }
  };

  const logout = () => {
    dispatch({
      type: "logout",
      payload: null,
    });
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("AuthProvider must be used within a AuthProvider");
  }

  return context;
};

export { AuthProvider, useAuth };
