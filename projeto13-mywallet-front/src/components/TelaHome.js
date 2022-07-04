import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";

import NameContext from "../contexts/NameContext";
import ExitImage from "../assets/saida.svg";
import PlusImage from "../assets/mais.svg";
import MinusImage from "../assets/menos.svg";


export default function TelaHome() {

    const navigate = useNavigate();

    const { name, token } = useContext(NameContext);

    const [ transactions, setTransactions ] = useState([]);
    const [ saldo, setSaldo ] = useState(0);

    useEffect(() => {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }

        const promise = axios.get("http://localhost:5000/transactions", config);

        promise.then(response => {
            setTransactions(response.data.userTransactions);
            setSaldo(response.data.userBalance);
        });
        promise.catch((err) => {
            if (err.response.status === 401) {
                alert("Sessão expirada. Faça login novamente!");
                navigate("/");
            } else if (err.response.status === 422) {
                alert("Confira os dados e tente novamente!");
            };
        });
    }, []);

    function renderTransactions({ date, amount, description, type }) {
        return (
            <ContainerTransacoes>
                <Informacoes>
                    <h1>{date}</h1>
                    <h2>{description}</h2>
                </Informacoes>
                <Valor tipo={type === "entrada"}>
                    <h1>{parseFloat(amount).toFixed(2).replace(".", ",")}</h1>
                </Valor>
            </ContainerTransacoes>
        );
    };

    function sair() {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }

        const promise = axios.delete("http://localhost:5000/sessions", config);

        promise.then(() => navigate("/"));
        promise.catch(() => alert("Algo deu errado! Tente novamente."));
    }

    return(
        <Tela>
            <ContainerTopo>
                <h1>Olá, {name}</h1>
                <img onClick={sair} src={ExitImage} />
            </ContainerTopo>
            <ContainerDados>
                <ContainerRegistros>
                    {transactions.length === 0 ? 
                    <h1>Não há registros de<br/>entrada ou saída</h1> : 
                    transactions.map(transaction => renderTransactions(transaction))}
                </ContainerRegistros>
                {transactions.length === 0 ? "" : 
                <ContainerSaldo>
                    <h1>SALDO</h1>
                    <h2>{saldo.toFixed(2).replace(".", ",")}</h2>
                </ContainerSaldo>
                }
            </ContainerDados>
            <ContainerBotoes>
                <button onClick={() => console.log("mais")}>
                    <img src={PlusImage} />
                    <h1>Nova <br/> entrada</h1>
                </button>
                <button onClick={() => console.log("menos")}>
                    <img src={MinusImage} />
                    <h1>Nova <br/> saída</h1>
                </button>
            </ContainerBotoes>
        </Tela>
    );
};

const Tela = styled.div`
    width: 100vw;
    height: 100vh;
    background-color: #8C11BE;

    display: flex;
    align-items: center;
    justify-content: space-evenly;
    flex-direction: column;
`

const ContainerTopo = styled.div`
    width: 90vw;
    height: 10vh;

    display: flex;
    align-items: center;
    justify-content: space-between;

    h1 {
        font-family: "Raleway";
        font-size: 26px;
        font-weight: 700;
        color: #FFFFFF;
    }

    img {
        width: 23px;
        height: 23px;
    }
`

const ContainerDados = styled.div`
    width: 90vw;
    height: 70vh;
    background-color: #FFFFFF;

    border-radius: 5px;
    padding-top: 10px;

    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-direction: column;

    h1 {
        font-family: "Raleway";
        font-size: 20px;
        font-weight: 400;
        line-height: 24px;
        color: #868686;
        text-align: center;
    }
`

const ContainerBotoes = styled.div`
    width: 90vw;
    height: 20vh;

    display: flex;
    align-items: center;
    justify-content: space-between;

    button {
        width: 42vw;
        height: 16vh;
        background-color: #A328D6;
        border: 1px solid #A328D6;
        border-radius: 5px;
        padding: 1vh 3vw;

        display: flex;
        align-items: flex-start;
        justify-content: space-between;
        flex-direction: column;

        h1 {
            font-family: "Raleway";
            font-size: 20px;
            font-weight: 700;
            color: #FFFFFF;
            text-align: left;
        }

        img {
            width: 27px;
            height: 27px;
        }
    }
`

const ContainerTransacoes = styled.div`
    width: 82vw;
    height: 3vh;

    display: flex;
    align-items: center;
    justify-content: space-between;

    margin: 6px 0;
`

const ContainerRegistros = styled.div`
    overflow-y: scroll;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    flex-direction: column;
`

const Informacoes = styled.div`
    min-width: 10vw;
    height: 3vh;

    display: flex;
    align-items: center;
    justify-content: flex-start;

    h1 {
        font-family: "Raleway";
        font-size: 16px;
        font-weight: 400;
        color: #C6C6C6;
        margin-right: 5px;
    }

    h2 {
        font-family: "Raleway";
        font-size: 16px;
        font-weight: 400;
        color: #000000;
    }
`

const Valor = styled.div`

    h1 {
        font-family: "Raleway";
        font-size: 16px;
        font-weight: 400;
        color: ${props => props.tipo ? "#03AC00" : "#C70000"};
    }
    
`

const ContainerSaldo = styled.div`
    width: 82vw;
    height: 8vh;
    background-color: #FFFFFF;

    display: flex;
    align-items: center;
    justify-content: space-between;

    h1 {
        font-family: "Raleway";
        font-size: 17px;
        font-weight: 700;
        color: #000000;
    }

    h2 {
        font-family: "Raleway";
        font-size: 17px;
        font-weight: 400;
        color: #03AC00;
    }
`