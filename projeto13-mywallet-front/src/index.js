import ReactDOM from "react-dom";
import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Link, useParams } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";

import "./reset.css";

import TelaLogin from "./components/TelaLogin";
import NameContext from "./contexts/NameContext";

export default function App() {

    const [ name, setName ] = useState('');

    return(
        <NameContext.Provider value={{ name, setName }} >
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<TelaLogin />} />
                </Routes>
            </BrowserRouter>
        </NameContext.Provider>
    );
};

ReactDOM.render(<App />, document.querySelector(".root"));