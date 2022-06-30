import ReactDOM from "react-dom";
import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import { useContext } from "react";

export default function TelaLogin() {

    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ isDisabled, setIsDisabled ] = useState(false);

    function Logar() {
        console.log("logando")
    }

    return (
        <Tela>
                <h1>MyWallet</h1>
                <form onSubmit={Logar}>
                    <input required placeholder="E-mail" type="text" disabled={isDisabled} value={email} onChange={(e) => setEmail(e.target.value)} />
                    <input required placeholder="Senha" type="password" disabled={isDisabled} value={password} onChange={(e) => setPassword(e.target.value)} />
                    <button disabled={isDisabled} type="submit">Entrar</button> 
                </form>
                <Link to="/cadastro" style={{ textDecoration: "none" }}>
                    <Cadastro>Primeira vez? Cadastre-se!</Cadastro>
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
        padding-top: 25vh;
    }

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
    font-family: 'Raleway';
    font-weight: 400;
    font-size: 20px;
    box-sizing: border-box;
    padding-left: 20px;
    margin-bottom: 10px;

        ::placeholder {
            color: #000000;
        }

    }

    button {
    width: 80vw;
    height: 8vh;
    border-radius: 5px;
    border: 1px solid #A328D6;
    background-color: #A328D6;
    font-family: 'Raleway';
    font-weight: 700;
    font-size: 25px;
    color: #FFFFFF;
    display: flex;
    justify-content: center;
    align-items: center;
    }
`;

const Cadastro = styled.div`
    font-family: 'Raleway';
    font-weight: 700;
    font-size: 18px;
    text-align: center;
    color: #FFFFFF;
    margin-top: 5vh;
`