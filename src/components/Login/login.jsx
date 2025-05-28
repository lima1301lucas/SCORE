import { toast } from 'react-toastify';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fazerLogin, buscarUsuarios } from './login.js';
import './Login.css';

function Login() {
  const [usuarios, setUsuarios] = useState([]);
  
  useEffect(() => {
    async function carregarUsuarios() {
      try {
        const lista = await buscarUsuarios();
        setUsuarios(lista);
      } catch (err) {
        console.log('Erro ao carregar usuários: ', err);
      }
    }

    carregarUsuarios();
  }, []);

  const [usuario, setUsuario] = useState('');
  const [senha, setSenha] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!usuario || !senha) {
      toast.warn('Selecione um usuário e digite a senha');
      return;
    }

    try {
      const result = await fazerLogin(usuario, senha);

      if (result.success) {
        localStorage.setItem('usuarioLogado', usuario);
        navigate('/score');
      } else {
        toast.error('Usuário ou senha inválidos');
      }
    } catch (error) {
      toast.error('Erro ao tentar fazer login');
      console.error(error);
    }
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h1 className="login-title">SCORE INFOCAR</h1>
        <div className="form-group">
          <label htmlFor="usuario" className="form-label">Usuário</label>
          <select id="usuario" className="form-input" value={usuario} onChange={(e) => setUsuario(e.target.value)}>
            <option value="" disabled>Selecione seu usuário</option>
            {usuarios.map((usuarioObj, index) => (
              <option key={index} value={usuarioObj.username}>{usuarioObj.username}</option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="senha" className="form-label">Senha</label>
          <input type="password" id="senha" className="form-input" placeholder="Digite sua senha" value={senha} onChange={(e) => setSenha(e.target.value)} />
        </div>
        <button className="form-button" onClick={handleLogin}>Entrar</button>
      </div>
    </div>
  );
}

export default Login;