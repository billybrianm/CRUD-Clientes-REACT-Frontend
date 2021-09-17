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
    
    const { tipoSelecionado, setValue, register, handleSubmit, watch, formState: { errors } } = useForm();
    const onSubmit = data => registrar(data);

    const [carregando, setCarregando] = React.useState(true);
    const [tiposTelefone, setTiposTelefone] = React.useState([
        { label: "Carregando ...", value: "" }
      ]);
    const [valorTiposTelefone, setValorTiposTelefone] = React.useState("CELULAR");

    const [cep, setCep] = useState();

    const [telefoneMask, setTelefoneMask] = React.useState("(99)99999-9999");

    const registrar = (data) => {
        console.log(data);
        let properties = Object.getOwnPropertyNames(data);
        let count = 0;

        for(let i = 0; i < properties.length; i++) {
            if(properties[i].startsWith('email')) count++;
        }

        let tempcep = cep.replace(/\s/g, "");
        let tempcpf = data.cpf.replace(/\./g, "").replace(/\-/g, "");
        let temptel = data.telefones.replace(/\(/g, "").replace(/\)/g, "").replace(/\-/g, "");

        let emails = [];

        for(let i = 0; i < count; i++)
            emails.push({ email: data['emails'+i] });

        console.log(emails);
        
        let usr = 
        {
             usuario: data.usuario,
             senha: data.senha,
             nome: data.nome,
             cpf: tempcpf,
             cep: tempcep,
             logradouro: data.logradouro,
             bairro: data.bairro,
             cidade: data.cidade,
             uf: data.uf,
             complemento: data.complemento,
             telefones: [
                 {
                     numero: temptel                     
                 }
             ],
             emails: emails,
             admin: false
        };

        return fetch('/usuario',
        {
            method: "POST",
            mode: 'cors',
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(usr)
        }).catch(error => console.warn(error));
    }

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
        if (validator.isEmail(email.email)) { // valido
            return true;
        } else { // invalido
            return false;
        }
    }

    const handleChange = e => setVal(e.target.value);

    const handleEmailRemove = index => {
        const list = [...emailList];
        list.splice(index, 1);
        setEmailList(list);
    };

    const handleEmailAdd = (x, index) => {

        if(emailValido(x)) {
            console.log(...emailList);
            setEmailList([...emailList, { email: ""}]);
            setValue('emails'+emailList.length, '');
        } else {
            console.log("E-mail inválido");
        }
    };

    const formatar = (value, pattern) => {
        let i = 0,
            v = value.toString();
        let result =  pattern.replace(/#/g, _ => v[i++]);
        if (value.replace(/\s/g, '').length < 8) {
          return result.substr(0, result.indexOf('u')); 
        }
          return result; 
      }

    const mascaraCEP = ({target}) => {
        if(target.value.length >= 9) {
            buscarCEP(target.value);
        }
        if(cep && (target.value.length < cep.length)) {
            setCep(target.value)
            return;
          }
          setCep(formatar(target.value.replace(/\s/g, '').replace(/\D/g, ''), '##### ###'))
    }


    async function buscarCEP(cepe) {
        let cepFormatado = cepe.replace(/\s/g, "").substr(0, 8);
        return fetch('https://viacep.com.br/ws/'+cepFormatado+'/json/',
        {
            method: "GET",
            mode: 'cors',
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            },
        }).then((response) => response.json()).then((responseData) => {
            setValue('logradouro', responseData.logradouro);
            setValue('bairro', responseData.bairro);
            setValue('cidade', responseData.localidade);
            setValue('complemento', responseData.complemento);
            setValue('uf', responseData.uf);

        }).catch(error => console.warn(error));
    }

    const selecionadoNovoTipoTelefone = (e) => {

        let tipo = e.target.options[e.target.options.selectedIndex].value;

        if(tipo == "COMERCIAL") {
            setTelefoneMask("(99)9999-9999");
        } else if (tipo == "RESIDENCIAL") {
            setTelefoneMask("(99)9999-9999");
        } else {
            setTelefoneMask("(99)99999-9999");
        }
        

        setValorTiposTelefone(e.target.options[e.target.options.selectedIndex].value);
    }
      


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
                  {errors.senha?.type === 'required' && <span>O campo senha é obrigatório.<br/></span>}

                  <label className="" >CPF <span>*</span></label>
                  <InputMask mask="999.999.999-99" onChange={handleChange} type="text" placeholder="Digite seu CPF..." {...register("cpf", { required: true, pattern: /\d{3}\.\d{3}\.\d{3}-\d{2}/ })}/>
                  {errors.cpf?.type === 'required' && <span>O campo CPF é obrigatório.<br/></span>}
                  {errors.cpf?.type === 'pattern' && <span>Preencha o CPF por completo.<br/></span>}
                  <label className="" >CEP <span>*</span></label>

                  <input 
                    required
                    placeholder="00000-000"
                    type="text"
                    inputMode="numeric"
                    autoComplete="cep"
                    name="cep"
                    id="cep"
                    onChange={mascaraCEP}
                    value={cep}
                    />

                
                  {errors.nome?.type === 'required' && <span>O campo CEP é obrigatório.<br/></span>}
                  {errors.nome?.type === 'minLength' && <span>Preencha o CEP por completo.<br/></span>}

                  <label className="" >Endereço <span>*</span></label>
                  <input type="text" name="" placeholder="Digite seu logradouro..." {...register("logradouro", { required: true })}/> 
                  {errors.logradouro?.type === 'required' && <span>O campo endereço é obrigatório.<br/></span>}

                  <label className="" >Bairro <span>*</span></label>
                  <input type="text" name="" placeholder="Digite seu bairro..." {...register("bairro", { required: true })}/> 
                  {errors.bairro?.type === 'required' && <span>O campo bairro é obrigatório.<br/></span>}

                  <label className="" >Cidade <span>*</span></label>
                  <input type="text" name="" placeholder="Digite sua cidade..." {...register("cidade", { required: true })}/> 
                  {errors.cidade?.type === 'required' && <span>O campo cidade é obrigatório.<br/></span>}

                  <label className="" >UF <span>*</span></label>
                  <input type="text" name="" placeholder="Digite sua UF..." {...register("uf", { required: true })}/> 
                  {errors.uf?.type === 'required' && <span>O campo UF é obrigatório.<br/></span>}

                  <label className="" >Complemento</label>
                  <input type="text" name="" placeholder="Digite o complemento" {...register("complemento")}/> 

                  <label className="">Telefone(s) <span>*</span></label>


                  <div className="side-by-side">
                    <InputMask mask={telefoneMask} type="text" {...register("telefones", { required: true })} placeholder="Digite seu telefone..." /> 
                    <select style={{width: 200}}
                        disabled={carregando}
                        value={valorTiposTelefone}
                        onChange={(e) => selecionadoNovoTipoTelefone(e)}
                        ref={tipoSelecionado}>

                        {tiposTelefone.map(({ label, value }) => (
                            <option key={value} value={value}>
                            {label}
                            </option>
                        ))}
                    </select>
                    <button>+</button> 
                  </div>
                  {errors.telefones?.type === 'required' && <span>Pelo menos um telefone deve ser preenchido.<br/></span>}

                  <label className="">E-mail(s) <span>*</span></label>                                    

                  {emailList.map((x, i) => {
                            return (
                            <div key={i} className="side-by-side">
                                <input type="text" {...register("emails"+i, {required: true})} placeholder="Digite seu e-mail..." value={x.email} onChange={(e) => validateEmail(e, i)}/> 
                                {emailList.length !== 1 && <button className="mr10" type="button" id={i} onClick={() => handleEmailRemove(i)}>-</button>}
                                {emailList.length - 1 === i && <button type="button" onClick={(e) => handleEmailAdd(x, i)}>+</button>}
                            </div>
                            );
                        })}                
                  {errors.emails0?.type === 'required' && <span>Pelo menos um e-mail deve ser preenchido.<br/></span>}
                  <div className="side-by-side">
                    <button name="" value="Voltar" type="button" onClick={() => { window.location.replace("/"); }}> Voltar </button>
                    <input type="submit" name="" value="Registrar" />
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