import { Outlet, Navigate } from "react-router-dom";

import { useAuthContext } from "./contexts/AuthContext";

const AuthenticatedUser = ({ children }) => {
    const { user, isLoading } = useAuthContext();

    if (!isLoading) {
        if (!user) {
            return <Navigate to={"/login"} replace />;
        }
    }

    return children ? children : <Outlet />;
};

export default AuthenticatedUser;
