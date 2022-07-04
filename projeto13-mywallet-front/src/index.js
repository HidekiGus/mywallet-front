import ReactDOM from "react-dom";
import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./reset.css";

import TelaLogin from "./components/TelaLogin";
import TelaCadastro from "./components/TelaCadastro";
import TelaHome from "./components/TelaHome";
import TelaNovaEntrada from "./components/TelaNovaEntrada";
import TelaNovaSaida from "./components/TelaNovaSaida";
import NameContext from "./contexts/NameContext";

export default function App() {

    const [ name, setName ] = useState('');
    const [ token, setToken ] = useState('');

    return(
        <NameContext.Provider value={{ name, setName, token, setToken }} >
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<TelaLogin />} />
                    <Route path="/sign-up" element={<TelaCadastro />} />
                    <Route path="/home" element={<TelaHome />} />
                    <Route path="/nova-entrada" element={<TelaNovaEntrada />} />
                    <Route path="/nova-saida" element={<TelaNovaSaida />} />
                </Routes>
            </BrowserRouter>
        </NameContext.Provider>
    );
};

ReactDOM.render(<App />, document.querySelector(".root"));