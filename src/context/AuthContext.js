import React, {createContext, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import jwtDecode from "jwt-decode";
import axios from "axios";

export const AuthContext = createContext({});

function AuthContextProvider({children}) {
    const [isAuth, toggleIsAuth] = useState({
        isAuth: false,
        user: null,
        status: 'pending',
    });

    useEffect(() => {

        const storedToken = localStorage.getItem("token")
        if (storedToken) {
            const decodedToken = jwtDecode(storedToken);
            fetchData(storedToken, decodedToken.sub)
        } else {
            toggleIsAuth({
                isAuth: false,
                user: null,
                status: 'done'
            })
        }

    }, [])
    const navigate = useNavigate();

    function login(jwt) {
        console.log('Gebruiker is ingelogd!');
        console.log(jwt);
        localStorage.setItem('token', jwt);
        const decodedToken = jwtDecode(jwt);
        console.log(decodedToken);
        fetchData(jwt, decodedToken.sub);
        navigate("/login");
    }

    async function fetchData(token, id) {
        try {
            const response = await axios.get(`http://localhost:3000/600/users/${id}`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log(response)

            toggleIsAuth({
                isAuth: true,
                user: {
                    username: response.data.username,
                    email: response.data.email,
                    id: response.data.id,
                },
                status: 'done'
            });
            navigate('/profile');

        } catch (e) {
            console.error(e);
            toggleIsAuth({
                isAuth: false,
                user: null,
                status: 'done'
            });
        }
    }

    function logout() {
        localStorage.clear()
        toggleIsAuth({
            isAuth: false,
            user: null,
            status: 'done'
        });
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
            {isAuth.status === 'done' ? children : <p>Loading...</p>};
        </AuthContext.Provider>
    )
}

export default AuthContextProvider;
