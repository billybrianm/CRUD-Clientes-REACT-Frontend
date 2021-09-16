    // src/components/usuarios.js

    import React from 'react'

    const Usuarios = ({ usuarios }) => {
      return (
        <div>
          <center><h1>Lista de Usuários</h1></center>
          {usuarios.map((usuario, index) => (
              
            <div key={index} className="card">
              <div className="card-body">
                <h5 className="card-title">{usuario.nome}</h5>
                <h6 className="card-subtitle mb-2 text-muted">{usuario.usuario}</h6>
                <p className="card-text">CPF: {usuario.cpf}</p>
                <p className="card-text">CEP: {usuario.cep}</p>
                <p className="card-text">Endereço: {usuario.logradouro}</p>
                <p className="card-text">Complemento: {usuario.cpf}</p>
                <p className="card-text">Bairro: {usuario.bairro}</p>
                <p className="card-text">Cidade: {usuario.cidade}</p>
                <p className="card-text">UF: {usuario.uf}</p>
              </div>
            </div>
          ))}
        </div>
      )
    };

    export default Usuarios