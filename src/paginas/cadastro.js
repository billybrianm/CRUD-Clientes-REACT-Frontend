import React, { useRef, useState } from 'react';
import InputMask from 'react-input-mask';
import ReactDOM from "react-dom";
import validator from 'validator'
import { useForm } from "react-hook-form";

import './cadastro.css';


const Cadastro = () => {
    const [val, setVal] = useState(null);
    const myRef = useRef(null);
    const [emailError, setEmailError] = useState('')
    const [inputList, setInputList] = useState([{ firstName: "", lastName: "" }]);

    const [telefoneList, setTelefoneList] = useState([{ telefone: "", tipoTelefone: "" }]);
    const [emailList, setEmailList] = useState([{ email: ""}]);
    
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const onSubmit = data => console.log(data);

    const [carregando, setCarregando] = React.useState(true);
    const [tiposTelefone, setTiposTelefone] = React.useState([
        { label: "Carregando ...", value: "" }
      ]);
    const [valorTiposTelefone, setValorTiposTelefone] = React.useState("CELULAR");

    React.useEffect(() => {
        let unmounted = false;
        async function buscarTiposTelefone() {
            const response = await fetch("/tipos-telefones");
            const body = await response.json();

            if (!unmounted) {
                let obj = [];
                body.forEach(element => {
                    obj.push({label: element, value: element});
                    setTiposTelefone(obj)
                });
                setCarregando(false);
            }
            //setTiposTelefone(body.results.map(({ name }) => ({ label: name, value: name })));
        }
        
        buscarTiposTelefone();
        return () => {
            unmounted = true;
          };
    },[]);

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

    const handleEmailRemove = index => {
        const list = [...emailList];
        list.splice(index, 1);
        setEmailList(list);
    };

    const handleEmailAdd = (e, index) => {

        if(validateEmail(e, index)) {
            setEmailList([...emailList, { email: ""}]);
        } else {
            console.log("E-mail inválido");
        }
    };

    const handleTelefoneChange = (e, index) => {
        const { name, value } = e.target;
        const list = [...telefoneList];
        list[index][name] = value;
        setTelefoneList(list);
      };

    const handleTelefoneRemove = index => {
        const list = [...telefoneList];
        list.splice(index, 1);
        setTelefoneList(list);
    };
    
    const handleTelefoneAdd = (e, index) => {
        setTelefoneList([...telefoneList, { telefone: "", tipoTelefone: "" }]);
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
              <form className="box" onSubmit={handleSubmit(onSubmit)}>
                  <h1>Registro</h1>
                  <p className="text-muted"> Preencha os dados conforme requisitado</p> 
                  <label className="" >Nome completo <span>*</span></label>
                  <input type="text" name="" placeholder="Digite seu nome completo..." {...register("nome", { required: true, minLength: 3, maxLength: 100, pattern:/^[a-zA-Z0-9\s]+/ })} /> 
                  {errors.nome?.type === 'required' && <span>O campo nome completo é obrigatório.<br/></span>}
                  {errors.nome?.type === 'minLength' && <span>O nome deve conter no mínimo 3 caracteres.<br/></span>}
                  {errors.nome?.type === 'maxLength' && <span>O nome deve conter no máximo 100 caracteres.<br/></span>}
                  {errors.nome?.type === 'pattern' && <span>O nome só deve conter letras números e espaços.<br/></span>}

                  <label className="" >Nome de usuário <span>*</span></label>
                  <input type="text" name="" placeholder="Digite seu nome de usuário..." {...register("usuario", { required: true })}/> 
                  {errors.usuario && <span>O campo nome de usuário é obrigatório.<br/></span>}

                  <label className="" autoComplete="off" >Senha <span>*</span></label>
                  <input type="password" name="" placeholder="Digite sua senha..." {...register("senha", { required: true })}/> 
                  {errors.nome?.type === 'required' && <span>O campo senha é obrigatório.<br/></span>}

                  <label className="" >CPF <span>*</span></label>
                  <InputMask mask="999.999.999-99" onChange={handleChange} type="text" placeholder="Digite seu CPF..." {...register("cpf", { required: true })}/>
                  {errors.nome?.type === 'required' && <span>O campo CPF é obrigatório.<br/></span>}

                  <label className="" >CEP <span>*</span></label>
                  <InputMask mask="99999-999" onChange={handleChangeCEP} type="text" placeholder="Digite seu CEP..." {...register("cep", { required: true })}/>
                  {errors.nome?.type === 'required' && <span>O campo CEP é obrigatório.<br/></span>}

                  <label className="" >Endereço <span>*</span></label>
                  <input type="text" name="" placeholder="Digite seu logradouro..." {...register("logradouro", { required: true })}/> 
                  {errors.nome?.type === 'required' && <span>O campo endereço é obrigatório.<br/></span>}

                  <label className="" >Bairro <span>*</span></label>
                  <input type="text" name="" placeholder="Digite seu bairro..." {...register("bairro", { required: true })}/> 
                  {errors.nome?.type === 'required' && <span>O campo bairro é obrigatório.<br/></span>}

                  <label className="" >Cidade <span>*</span></label>
                  <input type="text" name="" placeholder="Digite sua cidade..." {...register("cidade", { required: true })}/> 
                  {errors.nome?.type === 'required' && <span>O campo cidade é obrigatório.<br/></span>}

                  <label className="" >UF <span>*</span></label>
                  <input type="text" name="" placeholder="Digite sua UF..." {...register("uf", { required: true })}/> 
                  {errors.nome?.type === 'required' && <span>O campo UF é obrigatório.<br/></span>}

                  <label className="" {...register("telefones", { required: true })}>Telefone(s) <span>*</span></label>


                  <div className="side-by-side">
                    <input type="text" placeholder="Digite seu telefone..." /> 
                    <select style={{width: 200}}
                        disabled={carregando}
                        value={valorTiposTelefone}
                        onChange={e => setValorTiposTelefone(e.currentTarget.value)}>

                        {tiposTelefone.map(({ label, value }) => (
                            <option key={value} value={value}>
                            {label}
                            </option>
                        ))}
                    </select>
                    <button>+</button> 
                  </div>
                  {errors.nome?.type === 'required' && <span>Pelo menos um telefone deve ser preenchido.<br/></span>}

                  <label className="" {...register("emails", { required: true })}>E-mail(s) <span>*</span></label>                                    

                  {emailList.map((x, i) => {
                            return (
                            <div key={i} className="side-by-side">
                                <input type="text" placeholder="Digite seu e-mail..." value={x.email} onChange={(e) => validateEmail(e, i)}/> 
                                {emailList.length !== 1 && <button className="mr10" type="button" id={i} onClick={() => handleEmailRemove(i)}>-</button>}
                                {emailList.length - 1 === i && <button type="button" onClick={(e) => handleEmailAdd(e, x)}>+</button>}
                            </div>
                            );
                        })}                
                  {errors.nome?.type === 'required' && <span>Pelo menos um e-mail deve ser preenchido.<br/></span>}
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