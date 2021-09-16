import React, { useRef, useState } from 'react';
import InputMask from 'react-input-mask';
import ReactDOM from "react-dom";
import validator from 'validator'

import './cadastro.css';


const Cadastro = () => {
    const [val, setVal] = useState(null);
    const myRef = useRef(null);
    const [emailError, setEmailError] = useState('')
    const [inputList, setInputList] = useState([{ firstName: "", lastName: "" }]);

    const [telefoneList, setTelefoneList] = useState([{ telefone: "", tipoTelefone: "" }]);
    const [emailList, setEmailList] = useState([{ email: ""}]);

    const validateEmail = (e, index) => {
        var email = e.target.value
        const { name, value } = e.target;
        const list = [...emailList];
        list[index].email = value;
        setEmailList(list);

        if (validator.isEmail(email)) { // valido
            return true;
        } else { // invalido
            return false;
        }
    }

    const emailValido = (email) => {
        if (validator.isEmail(email)) { // valido
            return true;
        } else { // invalido
            return false;
        }
    }

    const handleChange = e => setVal(e.target.value);

    const handleChangeCEP = e => setVal(e.target.value);

    // handle click event of the Remove button
    const handleEmailRemove = index => {


        const list = [...emailList];
        list.splice(index, 1);
        setEmailList(list);
    };
    
    // handle click event of the Add button
    const handleEmailAdd = (e, index) => {

        console.log(index);

        if(validateEmail(e, index)) {
            setEmailList([...emailList, { email: ""}]);
        } else {
            console.log("E-mail inválido");
        }
    };


    const handleInputChange = (e, index) => {
        const { name, value } = e.target;
        const list = [...inputList];
        list[index][name] = value;
        setInputList(list);
      };


    // handle click event of the Remove button
    const handleRemoveClick = index => {
        const list = [...inputList];
        list.splice(index, 1);
        setInputList(list);
    };
    
    // handle click event of the Add button
    const handleAddClick = () => {
        setInputList([...inputList, { firstName: "", lastName: "" }]);
    };


return(
    <div className="container">
        <div className="row">
            <div className="col-md-6">
              <form className="box">
                  <h1>Registro</h1>
                  <p className="text-muted"> Preencha os dados conforme requisitado</p> 
                  <label className="" >Nome completo</label>
                  <input type="text" name="" placeholder="Digite seu nome completo..." /> 

                  <label className="" >Nome de usuário</label>
                  <input type="text" name="" placeholder="Digite seu nome de usuário..." /> 

                  <label className="" autoComplete="off" >Senha</label>
                  <input type="password" name="" placeholder="Digite sua senha..." /> 

                  <label className="" >CPF</label>
                  <InputMask mask="999.999.999-99" onChange={handleChange} type="text" placeholder="Digite seu CPF..."/>

                  <label className="" >CEP</label>
                  <InputMask mask="99999-999" onChange={handleChangeCEP} type="text" placeholder="Digite seu CEP..." />

                  <label className="" >Endereço</label>
                  <input type="text" name="" placeholder="Digite seu logradouro..." /> 

                  <label className="" >Bairro</label>
                  <input type="text" name="" placeholder="Digite seu bairro..." /> 

                  <label className="" >Cidade</label>
                  <input type="text" name="" placeholder="Digite sua cidade..." /> 

                  <label className="" >UF</label>
                  <input type="text" name="" placeholder="Digite sua UF..." /> 

                  <label className="" >Telefone(s)</label>
                  
                  <div className="side-by-side">
                    <input type="text" placeholder="Digite seu telefone..." /> 
                    <input type="text" style={{width: 200}} name="" placeholder="Residencial" />
                    <button>+</button> 
                  </div>
                  <label className="" >E-mail(s)</label>                  

                  {emailList.map((x, i) => {
                            return (
                            <div key={i} className="side-by-side">
                                <input type="text" placeholder="Digite seu e-mail..." value={x.email} onChange={(e) => validateEmail(e, i)}/> 
                                {emailList.length !== 1 && <button className="mr10" type="button" id={i} onClick={() => handleEmailRemove(i)}>-</button>}
                                {emailList.length - 1 === i && <button type="button" onClick={(e) => handleEmailAdd(e, x)}>+</button>}
                            </div>
                            );
                        })}
                    


                  


                        
                  
                  <div className="side-by-side">
                    <button name="" value="Voltar" type="button" onClick={() => { window.location.replace("/"); }}> Voltar </button>
                    <input type="submit" name="" value="Registrar" href="#" />
                  </div>
              </form>
            </div>
        </div>
    </div>
    );
}
const rootElement = document.getElementById("root");
ReactDOM.render(<Cadastro />, rootElement);

export default Cadastro;