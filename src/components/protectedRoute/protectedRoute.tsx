import React, { useContext, useState, useEffect} from "react";
import { useLocation, Navigate } from "react-router-dom";
import { AuthContext } from "../../contexts/authContext.tsx";

const ProtectedRoute:React.FC<React.PropsWithChildren> = (props) => {
    const authContext = useContext(AuthContext);
    const { session } = authContext || {};
    const location = useLocation();

    if (!session) {
        return <Navigate to={"/login"} replace state={{ intent: location }} />;
    }

    return props.children;
};

export default ProtectedRoute;
