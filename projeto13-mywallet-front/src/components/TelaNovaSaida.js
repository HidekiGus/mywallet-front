import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";

import NameContext from "../contexts/NameContext";

export default function TelaNovaSaida() {

    const { token } = useContext(NameContext);
    const [ description, setDescription ] = useState('');
    const [ amount, setAmount ] = useState('');
    const navigate = useNavigate();

    function enviar(event) {
        event.preventDefault();

        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }

        const body = {
            description,
            amount: amount.replace(",", "."),
            type: "saida"
        }
    
        const promise = axios.post("https://back-projeto13-wallet.herokuapp.com/transactions", body, config);

        promise.then(() => navigate("/home"));
        promise.catch(() => alert("Confira os dados e tente novamente!"));
    }
    

    return(
        <Tela>
            <h1>Nova saída</h1>
            <ContainerBotoes>
                <form onSubmit={enviar}>
                    <input required placeholder="Valor" value={amount} onChange={(e) => setAmount(e.target.value)} />
                    <input required placeholder="Descrição" value={description} onChange={(e) => setDescription(e.target.value)}/>
                    <button type="submit">Salvar saída</button>
                </form>
            </ContainerBotoes>
        </Tela>
    );
}

const Tela = styled.div`
    width: 100vw;
    height: 100vh;
    background-color: #8C11BE;

    display: flex;
    align-items: center;
    justify-content: flex-start;
    flex-direction: column;

    h1 {
        font-family: "Raleway";
        font-size: 26px;
        font-weight: 700;
        color: #FFFFFF;
        padding: 5vh 40vw 5vh 0;
        text-align: right;
    }
`

const ContainerBotoes = styled.div`
    form {
        width: 90vw;
        height: 26vh;

        display: flex;
        align-items: center;
        justify-content: space-between;
        flex-direction: column;
    }

    input {
        width: 86vw;
        height: 8vh;

        border: 1px solid #FFFFFF;
        border-radius: 5px;
        background-color: #FFFFFF;

        font-family: "Raleway";
        font-size: 20px;
        font-weight: 400;
        padding-left: 10px;

        ::placeholder {
            color: #000000;
            font-family: "Raleway";
            font-size: 20px;
            font-weight: 400;
            padding-left: 10px;
        }
    }

    button {
        width: 90vw;
        height: 6vh;

        color: #FFFFFF;
        background-color: #a328d6;
        border-radius: 5px;
        border: 1px solid #a328d6;

        font-family: "Raleway";
        font-size: 20px;
        font-weight: 700;
    }
`