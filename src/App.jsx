import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from 'react-toastify';

import Login from "./components/Login/login.jsx";
import VerScore from "./components/VerScore/verScore.jsx";
import Divergentes from "./components/Divergentes/divergentes.jsx"
import Reanalise from "./components/Reanalise/reanalise.jsx";
import Producao from "./components/Producao/producao.jsx";
import AtribuirScore from "./components/AtribuirScore/atribuirScore.jsx";

import './App.css'
import 'react-toastify/dist/ReactToastify.css';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AtribuirScore />}/>
        <Route path="/" element={<Producao />} />
        <Route path="/" element={<Reanalise />} />
        <Route path="/" element={<Divergentes />} />
        <Route path="/" element={<VerScore />} />
        <Route path="/" element={<Login />} />
      </Routes>
      <ToastContainer />
    </Router>
  )
}

export default App