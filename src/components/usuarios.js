    // src/components/usuarios.js

    import React from 'react'

    const Usuarios = ({ usuarios }) => {
 

        function botao(index) {
            if(JSON.parse(sessionStorage.getItem('token')).token != "admin") {
                return <button onClick={console.log(index)} className="btn btn-primary">Editar</button>;
            } else {
                return "";
            }
        }

      return (
        <div>
          <center><h1>Lista de Usuários</h1></center>
          {usuarios.map((usuario, index) => (
              
            <div key={index} className="card">
              <div className="card-body">
                <h5 className="card-title">{usuario.nome}</h5>
                <h6 className="card-subtitle mb-2 text-muted">{usuario.usuario}</h6>
                <p className="card-text"><b>CPF:</b> {usuario.cpf}</p>
                <p className="card-text"><b>CEP:</b> {usuario.cep}</p>
                <p className="card-text"><b>Endereço:</b> {usuario.logradouro}</p>
                <p className="card-text"><b>Complemento:</b> {usuario.cpf}</p>
                <p className="card-text"><b>Bairro:</b> {usuario.bairro}</p>
                <p className="card-text"><b>Cidade:</b> {usuario.cidade}</p>
                <p className="card-text"><b>UF:</b> {usuario.uf}</p>
                {botao(index)}
              </div>
            </div>
          ))}
        </div>
      )
    };

    export default Usuarios