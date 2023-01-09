import React, {createContext, useState} from "react";
import {useNavigate} from "react-router-dom";

export const AuthContext = createContext({});

function AuthContextProvider({children}) {
    const [isAuth, toggleIsAuth] = useState({
        isAuth: false,
        user: ''
    });
    const navigate = useNavigate();

    function login(email) {
        toggleIsAuth({isAuth: true, user: email});
        console.log('Gebruiker is ingelogd met :', email);
        navigate("/profile");
    }

    function logout() {
        toggleIsAuth({isAuth: false, user: ''});
        console.log('Gebruiker is uitgelogd!');
        navigate("/");
    }

    const data = {
        isAuth: isAuth.isAuth,
        user: isAuth.user,
        login: login,
        logout: logout,
    };

    return (
        <AuthContext.Provider value={data}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider;