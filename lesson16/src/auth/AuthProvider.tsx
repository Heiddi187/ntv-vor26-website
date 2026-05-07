import { useCallback, useMemo, useState } from "react";
import { AuthContext } from "./auth-context";

const STORAGE_KEY = 'lesson-16-auth';

function readStoredSession(): boolean {
    try {
        return sessionStorage.getItem(STORAGE_KEY) === 'true';
    } catch {
        return false;
    }
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [isAuthed, setIsAuthed] = useState(readStoredSession);

    const login = useCallback(() => {
        try {
            sessionStorage.setItem(STORAGE_KEY, 'true')
        } catch {
            // ignore?
        }
        setIsAuthed(true)
    }, []);

    const logout = useCallback(() => {
        try {
            sessionStorage.removeItem(STORAGE_KEY)
        } catch {
            // ignore?
        }
        setIsAuthed(false)
    }, []);

    const value = useMemo(
        () => ({ isAuthed, login, logout }),
        [isAuthed, login, logout],
    );

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}