import React from 'react';
import {
  BrowserRouter as Router,
  Route,
} from "react-router-dom";
import Home from './home';
import Usuario from './usuario';
import Login from '../components/login/login';
import AtualizarToken from '../AtualizarToken';
import Cadastro from './cadastro';
import { createBrowserHistory } from "history";


const Paginas = () => {
    const history = createBrowserHistory()
    const { token, setToken } = AtualizarToken();

    if(!token) {
        if(history.location.pathname === '/cadastro') {
            return <Cadastro />
        } else {
            return <Login setToken={setToken} />
        }
    }


    return(
        <Router>
            <Route exact path="/" component= {Home} />
            <Route path = "/usuario" component = {Usuario} />
            <Route path = "/cadastro" component = {Cadastro} />
        </Router>
    );
};
export default Paginas;