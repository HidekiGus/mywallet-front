import ReactDOM from "react-dom";
import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";

export default function TelaCadastro() {

    const [ name, setName ] = useState('');
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ confirmPassword, setConfirmPassword ] = useState('');
    const [ isDisabled, setIsDisabled ] = useState(false);
    const navigate = useNavigate();

    function Cadastrar(event) {

        event.preventDefault();

        setIsDisabled(true);

        const corpo = {
            email,
            name,
            password: password
        }


        const promessa = axios.post("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/sign-up", corpo);

        promessa.then(() => navigate("/"))

        promessa.catch(() => setIsDisabled(false))
            
    }


    return (
            <Tela>
                <form onSubmit={Cadastrar}>
                    <input required type="text" disabled={isDisabled} placeholder="Nome" value={name} onChange={(e) => setName(e.target.value)}/>
                    <input required type="text" disabled={isDisabled} placeholder="E-mail" value={email} onChange={(e) => setEmail(e.target.value)}/>
                    <input required type="password" disabled={isDisabled} placeholder="Senha" value={password} onChange={(e) => setPassword(e.target.value)}/>
                    <input required type="password" disabled={isDisabled} placeholder="Confirme a senha" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}/>
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
    background-color: #FFFFFF;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: flex-start;
    form {
        display: flex;
        flex-direction: column; 
    }
    img {
        width: 50vw;
        height: fit-content;
        margin-top: 10vh;
        margin-bottom: 8vh;
    }
    input {
    width: 80vw;
    height: 8vh;
    
    border: 1px solid #D4D4D4;
    border-radius: 5px;
    font-family: 'Lexend Deca';
    font-weight: 400;
    font-size: 30px;
    box-sizing: border-box;
    padding-left: 10px;
    margin-bottom: 10px;
    ::placeholder {
        color: #DBDBDB;
        }
    }
    button {
    width: 80vw;
    height: 8vh;
    border-radius: 5px;
    border: 1px solid #52b6ff;
    background-color: #52B6FF;
    font-family: 'Lexend Deca';
    font-weight: 400;
    font-size: 31px;
    color: #FFFFFF;
    display: flex;
    justify-content: center;
    align-items: center;
    }
`

const Cadastro = styled.div`
    font-family: 'Lexend Deca';
    font-weight: 400;
    font-size: 18px;
    text-align: center;
    text-decoration-line: underline;
    color: #52B6FF;
    margin-top: 30px;
`