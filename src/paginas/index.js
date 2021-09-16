import React from 'react';
import {
  BrowserRouter as Router,
  Route
} from "react-router-dom";
import Home from './home';
import Usuario from './usuario';
import Login from '../components/login/login';
import AtualizarToken from '../AtualizarToken';


const Paginas = () => {
    const { token, setToken } = AtualizarToken();

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