    // src/components/usuarios.js

    import React from 'react'
    import { useHistory } from "react-router-dom";

    import '../paginas/home.css';

    const Usuarios = ({ usuarios }) => {
        const history = useHistory();
 

        function botao(index) {
            if(JSON.parse(sessionStorage.getItem('token')).token === "admin") {
                return <button onClick={() => { history.push('/usuario/' + index) }} className="btn btn-primary">Editar</button>;
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
                <p className="card-text"><b>Complemento:</b> {usuario.complemento}</p>
                <p className="card-text"><b>Bairro:</b> {usuario.bairro}</p>
                <p className="card-text"><b>Cidade:</b> {usuario.cidade}</p>
                <p className="card-text"><b>UF:</b> {usuario.uf}</p>
                <div className="card">
                  <div className="card-body">
                    <h6 className="card-title"><b>Telefone(s)</b></h6>
                    {usuario.telefones.map((telefone, index) => (
                      <div key={index}>
                        <p className="card-text"><i>Número:</i> {usuario.telefones[0].numero}</p>
                        <p className="card-text"><i>Tipo:</i> {usuario.telefones[0].tipoTelefone}</p>
                        <hr/>
                      </div>
                    ))}
                  </div>
                </div>
                {botao(index)}
              </div>
            </div>
          ))}
        </div>
      )
    };

    export default Usuarios