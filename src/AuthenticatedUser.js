import { Outlet, Navigate } from "react-router-dom";

import { useGlobalContext } from "./context";

const AuthenticatedUser = ({ children }) => {
    const { user } = useGlobalContext();

    if (!user) {
        return <Navigate to={"/login"} replace />;
    }

    return children ? children : <Outlet />;
};

export default AuthenticatedUser;
