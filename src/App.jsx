import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from 'react-toastify';

import Login from "./components/Login/login.jsx";
import Divergentes from "./components/Divergentes/divergentes.jsx"
import Reanalise from "./components/Reanalise/reanalise.jsx";
import Producao from "./components/Producao/producao.jsx";
import AtribuirScore from "./components/AtribuirScore/atribuirScore.jsx";
import VerLeilao from "./components/VerLeilao/verLeilao.jsx";
import VerScore from "./components/VerScore/verScore.jsx";
import PrivateRoute from "./components/PrivateRoute/privateRoute.jsx";

import './App.css'
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/score" element={<PrivateRoute><AtribuirScore /></PrivateRoute>} />
        <Route path="/producao" element={<PrivateRoute> <Producao /></PrivateRoute>} />
        <Route path="/reanalise"element={<PrivateRoute><Reanalise /></PrivateRoute>} />
        <Route path="/divergentes" element={<PrivateRoute><Divergentes /></PrivateRoute>} />
        <Route path="/verLeilao" element={<PrivateRoute><VerLeilao /></PrivateRoute>} />
        <Route path="/verScore" element={<PrivateRoute><VerScore /></PrivateRoute>} />
      </Routes>
      <ToastContainer />
    </Router>
  );
}

export default App;