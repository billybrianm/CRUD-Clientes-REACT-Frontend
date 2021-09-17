import React, {useState} from 'react';
import { useHistory } from "react-router-dom";

import './usuario.css';


const Usuario = (userid) => {

    const [usr, setUsr] = useState();

    const [id, setId] = useState('');
    const [nomeCompleto, setNomeCompleto] = useState('');
    const [usuario, setUsuario] = useState('');
    const [senha, setSenha] = useState('');
    const [cpf, setCpf] = useState('');
    const [cep, setCep] = useState('');
    const [logradouro, setLogradouro] = useState('');
    const [complemento, setComplemento] = useState('');
    const [bairro, setBairro] = useState('');
    const [cidade, setCidade] = useState('');
    const [uf, setUf] = useState('');
    const [telefones, setTelefones] = useState([]);
    const [emails, setEmails] = useState([]);
    const [admin, setAdmin] = useState(false);

    const history = useHistory();









    React.useEffect(() => {
        let unmounted = false;
        async function buscarTiposTelefone() {
            return fetch('/usuario/'+userid.location.pathname.split('/')[2],
        {
            method: "GET",
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(usr)
        }).then((response) => response.json()).then((responseData) => {
            console.log(responseData);

            setId(responseData.id);
            setNomeCompleto(responseData.nome);
            setUsuario(responseData.usuario);
            setSenha(responseData.senha);
            setCpf(responseData.cpf);
            setCep(responseData.cep);
            setLogradouro(responseData.logradouro);
            setBairro(responseData.bairro);
            setCidade(responseData.cidade);
            setComplemento(responseData.complemento);
            setUf(responseData.uf);
            setTelefones(responseData.telefones);
            setEmails(responseData.emails);
            setAdmin(responseData.admin);

        }).catch(error => console.warn(error));
        }
        
        buscarTiposTelefone();
        return () => {
            unmounted = true;
          };
    },[]);

    const editar = (data) => {
        console.log(data);

        let usr = 
        {
            id: id,
            usuario: usuario,
            senha: senha,
            nome: nomeCompleto,
            cpf: cpf,
            cep: cep,
            logradouro: logradouro,
            bairro: bairro,
            cidade: cidade,
            uf: uf,
            complemento: complemento,
            telefones: [
                {
                    numero: null                     
                }
            ],
            emails: emails,
            admin: admin
        };

        return fetch('/usuario/'+userid.location.pathname.split('/')[2],
        {
            method: "PUT",
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(usr)
        }).then((response) => {
            alert('Editado com sucesso!');
        }).catch(error => console.warn(error));
    }

    
    const handleNomeCompleto = (event) => setNomeCompleto(event.target.value);
    const handleUsuario = (event) => setUsuario(event.target.value);
    const handleCPF = (event) => setCpf(event.target.value);
    const handleCEP = (event) => setCep(event.target.value);
    const handleLogradouro = (event) => setLogradouro(event.target.value);
    const handleComplemento = (event) => setComplemento(event.target.value);
    const handleBairro = (event) => setBairro(event.target.value);
    const handleCidade = (event) => setCidade(event.target.value);
    const handleUf = (event) => setUf(event.target.value);
    const handleTelefone = (event) => setTelefones(event.target.value);
    const handleEmail = (event) => setEmails(event.target.value);

    

return(
    <div>
        <center><h1>Detalhes do Usuário</h1></center>

            <form onSubmit={editar}>
                <div className="card" id="detalhes">
                    <div className="card-body">
                        <h5 className="card-title"> </h5>
                        <h6 className="card-subtitle mb-2 text-muted"> </h6>
                        <p className="card-text"><b>Nome completo:</b></p>
                        <input type="text" value={nomeCompleto} onChange={handleNomeCompleto}/>
                        <p className="card-text"><b>Usuário:</b></p>
                        <input type="text" value={usuario} onChange={handleUsuario}/>
                        <p className="card-text"><b>CPF:</b></p>
                        <input type="text" value={cpf} onChange={handleCPF}/>
                        <p className="card-text"><b>CEP:</b></p>
                        <input type="text" value={cep} onChange={handleCEP}/>
                        <p className="card-text"><b>Endereço:</b> </p>
                        <input type="text" value={logradouro} onChange={handleLogradouro}/>
                        <p className="card-text"><b>Complemento:</b>  </p>
                        <input type="text" value={complemento} onChange={handleComplemento}/>
                        <p className="card-text"><b>Bairro:</b>  </p>
                        <input type="text" value={bairro} onChange={handleBairro}/>
                        <p className="card-text"><b>Cidade:</b>  </p>
                        <input type="text" value={cidade} onChange={handleCidade}/>
                        <p className="card-text"><b>UF:</b>  </p>
                        <input type="text" value={uf} onChange={handleUf}/>
                    <div className="card">
                        <div className="card-body">
                            <h6 className="card-title"><b>Telefone(s)</b></h6>
                            {telefones.map((tel, id) => {
                                <div key={id}>
                                    <p className="card-text"> Número </p>
                                    <input type="text" value={tel.numero} onChange={handleTelefone} />
                                    <p className="card-text"> Tipo</p>
                                    <input type="text" value={tel.tipoTelefone} onChange={handleTelefone} />
                                    <hr />
                                </div>
                            })}
                            <h6 className="card-title"><b>Emails(s)</b></h6>
                            {emails.map((em, id) => {
                                <div key={id}>
                                    <p className="card-text"> Email </p>
                                    <input type="text" value={em.email} onChange={handleEmail} />
                                    <hr />
                                </div>
                            })}
                        </div>
                        <button type="submit" className="btn btn-primary">Editar</button>
                        <button onClick={() => { history.push('/') }} className="btn btn-secondary" >Voltar</button>
                    </div>
                </div>
            </div>
        </form>
    </div>
    );
}
export default Usuario;