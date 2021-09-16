import React from 'react';
import './login.css';

export default function Login() {
  return(
    <div className="login-wrapper">
      <h1>Login</h1>
      <form>
        <label>
          <p>Usuario</p>
          <input type="text" />
        </label>
        <label>
          <p>Senha</p>
          <input type="password" />
        </label>
        <div>
          <button type="submit">Entrar</button>
        </div>
      </form>
    </div>
  )
}