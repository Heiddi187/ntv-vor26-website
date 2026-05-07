import { createContext } from "react";

export type AuthContextValue = {
    isAuthed: boolean;
    login: () => void;
    logout: () => void;
}

export const AuthContext = createContext<AuthContextValue | null>(null)