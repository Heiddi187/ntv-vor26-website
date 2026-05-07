import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "./useAuth";

type ProtectedRouteProps = {
    children: React.ReactNode;
};

export function ProtectedRoute({ children }: ProtectedRouteProps) {
    const { isAuthed } = useAuth();
    const location = useLocation();

    if (!isAuthed) {
        return (
            <Navigate 
                to='/login' 
                replace 
                state={{ from: location }} 
            />
        );
    }

    return <>{children}</>;
}