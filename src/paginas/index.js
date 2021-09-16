import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Home from './home';
import Usuario from './usuario';
import Login from '../components/login/login';

const Paginas = () => {
    const [token, setToken] = useState();

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