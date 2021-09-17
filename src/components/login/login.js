import React, { useState } from 'react';
import PropTypes from 'prop-types';

import './login.css';

async function loginUser(credentials) {
  return fetch('/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(credentials)
  })
    .then(data => data.json())
}

export default function Login({ setToken }) {
  const [usuario, setUserName] = useState();
  const [senha, setPassword] = useState();
  const [erro, setErro] = useState();

  const handleSubmit = async e => {
    e.preventDefault();
    const token = await loginUser({
      usuario,
      senha
    });
    setToken(token);
    
    if(token.token == "invalido") {
      setErro(<span>Erro! Login ou senha inválidos.</span>);
    }

  }

  return(
    <div className="container">
      <div className="row">
          <div className="col-md-6">
                <form onSubmit={handleSubmit} className="box">
                    <h1>Login</h1>
                    <p className="text-muted"> Digite seu usuário e sua senha</p> 
                    <input type="text" name="" placeholder="Usuário" onChange={e => setUserName(e.target.value)}/> 
                    <input type="password" name="" placeholder="Senha" onChange={e => setPassword(e.target.value)}/> 
                    <input type="submit" name="" value="Entrar" href="#" />
                    <button value="Registrar" type="button" onClick={() => { window.location.replace("/cadastro"); }}> Registrar </button>
                    {erro}  
                </form>
          </div>
      </div>
    </div>
  )
}

Login.propTypes = {
  setToken: PropTypes.func.isRequired
}