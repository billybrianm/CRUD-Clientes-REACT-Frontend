import React, { useState, useEffect }  from 'react';
import Usuarios from '../components/usuarios';
const Home = () => {
const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [users, setUsers] = useState([]);
    useEffect(() => {
        fetch("/api/usuarios")
            .then(res => res.json())
            .then(
                (data) => {
                    setIsLoaded(true);
                    setUsers(data._embedded.usuarios);
                },
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            )
      }, [])
if (error) {
        return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
        return <div>Loading...</div>;
    } else {

        let isAdmin = false;

        let token = JSON.parse(sessionStorage.getItem('token'));
        let adminText = "";

        if(token != null) {
            if(token.token === "admin") {
                isAdmin = true;
                adminText = "Você é um administrador do sistema."
            } else {
                adminText = ""
            }


        }

        return (
            <div>
                <h2>Seja bem-vindo. </h2>

                <h4>{adminText}</h4>
                
                <Usuarios usuarios={users} />
            </div>
        );
    }
}
export default Home;
