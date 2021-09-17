import React, { useState, useEffect }  from 'react';
import Usuarios from '../components/usuarios';

import './home.css';

const Home = () => {
const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [users, setUsers] = useState([]);
    useEffect(() => {
        fetch("/usuarios")
            .then(res => res.json())
            .then(
                (data) => {
                    setIsLoaded(true);
                    setUsers(data);
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

        let token = JSON.parse(sessionStorage.getItem('token'));
        let adminText = "";

        if(token != null) {
            if(token.token === "admin") {
                adminText = " Você é um administrador do sistema."
            } else {
                adminText = ""
            }


        }
        

        function logOut() {
            sessionStorage.removeItem('token');            
            window.location.reload();
        }

        return (
            <div className="container" style={{marginTop: 30}} >
                <div className="row">
                    <div className="col-sm">
                        <h3>
                            Seja bem-vindo. 
                            <small className="text-muted">{adminText}</small>
                        </h3>
                    </div>
                    <div className="col-1">
                        <button type="button" className="btn btn-dark" onClick={logOut}>Sair</button>
                    </div>
                </div>
                <Usuarios usuarios={users} />
            </div>
        );
    }
}
export default Home;
