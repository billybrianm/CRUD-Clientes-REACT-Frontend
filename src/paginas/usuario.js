import React from 'react';
import './usuario.css';


const Usuario = () => {

return(
    <div>
    <center><h1>Detalhes do Usuário</h1></center>
        
      <div className="card" id="detalhes">
        <div className="card-body">
          <h5 className="card-title"> </h5>
          <h6 className="card-subtitle mb-2 text-muted"> </h6>
          <p className="card-text"><b>CPF:</b></p>
          <input type="text" />
          <p className="card-text"><b>CEP:</b></p>
          <input type="text" />
          <p className="card-text"><b>Endereço:</b> </p>
          <input type="text" />
          <p className="card-text"><b>Complemento:</b>  </p>
          <input type="text" />
          <p className="card-text"><b>Bairro:</b>  </p>
          <input type="text" />
          <p className="card-text"><b>Cidade:</b>  </p>
          <input type="text" />
          <p className="card-text"><b>UF:</b>  </p>
          <input type="text" />
          <div className="card">
            <div className="card-body">
              <h6 className="card-title"><b>Telefone(s)</b></h6>
              <p className="card-text"> Número </p>
                <input type="text" />
              <p className="card-text"> Tipo</p>
                <input type="text" />
              <hr />
            </div>
          </div>
        </div>
      </div>
  </div>
    );
}
export default Usuario;