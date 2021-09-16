    // src/components/usuarios.js

    import React from 'react'

    const Usuarios = ({ usuarios }) => {
      return (
        <div>
          <center><h1>Lista de Usuários</h1></center>
          {usuarios.map((usuario) => (
            <div class="card">
              <div class="card-body">
                <h5 class="card-title">{usuario.nome}</h5>
                <h6 class="card-subtitle mb-2 text-muted">{usuario.usuario}</h6>
                <p class="card-text">CPF: {usuario.cpf}</p>
                <p class="card-text">CEP: {usuario.cep}</p>
                <p class="card-text">Endereço: {usuario.logradouro}</p>
                <p class="card-text">Complemento: {usuario.cpf}</p>
                <p class="card-text">Bairro: {usuario.bairro}</p>
                <p class="card-text">Cidade: {usuario.cidade}</p>
                <p class="card-text">UF: {usuario.uf}</p>
              </div>
            </div>
          ))}
        </div>
      )
    };

    export default Usuarios