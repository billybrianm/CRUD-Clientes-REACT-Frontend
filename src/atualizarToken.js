import { useState } from 'react';

export default function atualizarToken() {
    const getToken = () => {
        const tokenString = sessionStorage.getItem('token');
        const userToken = JSON.parse(tokenString);
        return userToken?.token
      };

    const [token, setToken] = useState(getToken());

    const salvarToken = userToken => {
        sessionStorage.setItem('token', JSON.stringify(userToken));
        setToken(userToken.token);
      };

    return {
    setToken: salvarToken,
    token
    }

}