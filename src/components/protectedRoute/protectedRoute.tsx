import React, { useContext } from "react";
import { useLocation, Navigate } from "react-router-dom";
import { AuthContext } from "../../contexts/authContext.tsx";

const ProtectedRoute:React.FC<React.PropsWithChildren> = (props) => {
    const authContext = useContext(AuthContext);
    const { token } = authContext || {};
    const location = useLocation();
    if (!token) {
        return <Navigate to={"/login"} replace state={{ intent: location }} />;
    }

    return props.children;
};

export default ProtectedRoute;
