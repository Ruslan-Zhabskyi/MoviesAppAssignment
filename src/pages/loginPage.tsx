import { useContext } from "react";
import { AuthContext } from "../contexts/authContext";
import Auth from "../components/userAuth";
import Account from "../components/userAccount";

const LoginPage = () => {
    const authContext = useContext(AuthContext);
    const { authenticate } = authContext || {};

    const login = () => {
        const password = Math.random().toString(36).substring(7);
        authenticate && authenticate('user1', password);
    };

    return (
        <>
            <h2>Login page</h2>
            <p>You must log in to view the protected pages </p>
            <Auth/>
            <button onClick={login}>Submit</button>
        </>
    )
};

export default LoginPage;
