import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";

export default function TelaCadastro() {

    const [ name, setName ] = useState('');
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ passwordCheck, setPasswordCheck ] = useState('');
    const [ isDisabled, setIsDisabled ] = useState(false);
    const navigate = useNavigate();

    function Cadastrar(event) {

        event.preventDefault();

        setIsDisabled(true);

        const corpo = {
            name,
            email,
            password,
            passwordCheck
        }

        const promessa = axios.post("https://back-projeto13-wallet.herokuapp.com/signup", corpo);

        promessa.then(() => navigate("/"));

        promessa.catch((err) => {
            setIsDisabled(false)
            if (err.response.status === 400) {
                alert("As senhas não coincidem!");
            } else if (err.response.status === 422) {
                alert("Confira os dados e tente novamente!");
            } else if (err.response.status === 409) {
                alert("Email já está em uso!");
            }
        });
    }


    return (
            <Tela>
                <h1>MyWallet</h1>
                <form onSubmit={Cadastrar}>
                    <input required type="text" disabled={isDisabled} placeholder="Nome" value={name} onChange={(e) => setName(e.target.value)}/>
                    <input required type="text" disabled={isDisabled} placeholder="E-mail" value={email} onChange={(e) => setEmail(e.target.value)}/>
                    <input required type="password" disabled={isDisabled} placeholder="Senha" value={password} onChange={(e) => setPassword(e.target.value)}/>
                    <input required type="password" disabled={isDisabled} placeholder="Confirme a senha" value={passwordCheck} onChange={(e) => setPasswordCheck(e.target.value)}/>
                    <button type="submit">Cadastrar</button>
                </form>
                <Link to="/" style={{ textDecoration: "none" }}>
                    <Cadastro>Já tem uma conta? Entre agora!</Cadastro>
                </Link>
            </Tela>
    );
}



const Tela = styled.div`
    width: 100vw;
    height: 100vh;
    background-color: #8C11BE;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: flex-start;

    h1 {
        font-family: 'Saira Stencil One';
        font-size: 32px;
        font-weight: 400;
        color: #FFFFFF;
        padding-bottom: 5vh;
        padding-top: 20vh;
    }

    form {
        display: flex;
        flex-direction: column; 
    }
    
    input {
    width: 80vw;
    height: 8vh;
    
    border: 1px solid #D4D4D4;
    border-radius: 5px;
    font-family: 'Raleway';
    font-weight: 400;
    font-size: 20px;
    box-sizing: border-box;
    padding-left: 10px;
    margin-bottom: 10px;

    ::placeholder {
        color: #000000;
        }

    }

    button {
    width: 80vw;
    height: 6vh;
    border-radius: 5px;
    border: 1px solid #A328D6;
    background-color: #A328D6;
    font-family: 'Raleway';
    font-weight: 700;
    font-size: 20px;
    color: #FFFFFF;
    display: flex;
    justify-content: center;
    align-items: center;
    }
`

const Cadastro = styled.div`
    font-family: 'Raleway';
    font-weight: 700;
    font-size: 18px;
    text-align: center;
    color: #FFFFFF;
    margin-top: 30px;
`