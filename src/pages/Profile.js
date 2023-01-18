import React, {useContext, useEffect} from 'react';
import { Link } from 'react-router-dom';
import {AuthContext} from "../context/AuthContext";
import axios from "axios";

function Profile() {
    const {user} = useContext(AuthContext);

    useEffect(() => {
        const storedToken = localStorage.getItem("token")
        async function getPersonalData() {

            try {
                const response = await axios.get(`http://localhost:3000/660/private-content`, {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${storedToken}`,
                    }
                    })
            } catch (e) {
                console.error(e)
            }
        }
        getPersonalData()

    }, [])

    return (
    <>
      <h1>Profielpagina</h1>
      <section>
        <h2>Gegevens</h2>
        <p><strong>Gebruikersnaam:</strong> {user.username}</p>
        <p><strong>Email:</strong> {user.email}</p>
      </section>
      <section>
        <h2>Strikt geheime profiel-content</h2>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab alias cum debitis dolor dolore fuga id molestias qui quo unde?</p>
      </section>
      <p>Terug naar de <Link to="/">Homepagina</Link></p>
    </>
  );
}

export default Profile;