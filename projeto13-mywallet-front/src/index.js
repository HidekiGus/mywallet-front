import ReactDOM from "react-dom";
import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Link, useParams } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";

import "./reset.css";

import TelaLogin from "./components/TelaLogin";
import TelaCadastro from "./components/TelaCadastro";
import TelaHome from "./components/TelaHome";
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
                </Routes>
            </BrowserRouter>
        </NameContext.Provider>
    );
};

ReactDOM.render(<App />, document.querySelector(".root"));