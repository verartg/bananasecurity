import React, {useContext, useState} from 'react';
import {Link} from 'react-router-dom';
import {AuthContext} from "../context/AuthContext";

function SignIn() {
    const {login} = useContext(AuthContext);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    function handleSubmit(e) {
        e.preventDefault();
        console.log({
            email: email,
            password: password
        })
        login(email);
    }

    return (
        <>
            <h1>Inloggen</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab alias cum debitis dolor dolore fuga id
                molestias qui quo unde?</p>

            <form onSubmit={handleSubmit}>
                <label htmlFor="email"><input id="email" value={email} onChange={(e) => setEmail(e.target.value)}
                                              name="emailadress" placeholder="Emailadres"/></label>
                <label htmlFor="password"><input id="password" value={password}
                                                 onChange={(e) => setPassword(e.target.value)} name="password"
                                                 placeholder="Wachtwoord"/></label>
                <button type="submit">Inloggen</button>
            </form>

            <p>Heb je nog geen account? <Link to="/signup">Registreer</Link> je dan eerst.</p>
        </>
    );
}

export default SignIn;