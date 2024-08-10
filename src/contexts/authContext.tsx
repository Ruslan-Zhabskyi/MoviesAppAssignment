import React, {useState, createContext, useEffect} from "react";
import fakeAuth from "../fakeAuth";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContextInterface } from "../types/interfaces";
import { supabase } from "../supabaseClient.js";

export const AuthContext = createContext<AuthContextInterface | null>(null);

const AuthContextProvider:React.FC<React.PropsWithChildren> = (props) => {

    //3rd party Auth implementation
    const [session, setSession] = useState(null)

    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session)
        })

        supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session)
        })
    }, [])

    //3rd party Auth implementation

    // const [token, setToken] = useState<string|null>(null);
    const location = useLocation();
    const navigate = useNavigate();

    // const authenticate = async (username: string, password: string) => {
    //     const token = await fakeAuth(username, password);
        // setToken(token);
    //     const origin = location.state?.intent?.pathname || "/";
    //     navigate(origin);
    // };

    const signout = () => {
        supabase.auth.signOut();
        // setToken(null);
        navigate('/')
    };

    return (
        <AuthContext.Provider
            value={{
                session,
                signout,
            }}
        >
            {props.children}
        </AuthContext.Provider>
    );
};

export default AuthContextProvider;
