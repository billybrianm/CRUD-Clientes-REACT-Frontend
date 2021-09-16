import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Home from './home';
import Usuario from './usuario';
import Login from '../components/login/login';

function setToken(userToken) {
    sessionStorage.setItem('token', JSON.stringify(userToken));
}

function getToken() {
    const tokenString = sessionStorage.getItem('token');
    const userToken = JSON.parse(tokenString);
    return userToken?.token
}

const Paginas = () => {
    const token = getToken();

    if(!token) {
        return <Login setToken={setToken} />
      }


    return(
        <Router>
            <Route exact path="/" component= {Home} />
            <Route path = "/usuario" component = {Usuario} />
        </Router>
    );
};
export default Paginas;