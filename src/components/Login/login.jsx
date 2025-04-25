import { toast } from 'react-toastify';
import { useState } from 'react';
import './Login.css';

function Login() {
    const [usuario, setUsuario] = useState('');
    const [senha, setSenha] = useState('');
    
    const handleLogin = () => {
        if (!usuario || !senha) {
            toast.warn('Selecione um usuário e digite a senha');
            return;
        }
        
        if (usuario !== 'usuario1' || senha !== '123') {
            toast.error('Usuário ou senha inválidos');
            return;
        }
      // Redirecionamento
    };

    return (
      <div className="login-container">
        <div className="login-form">
          <h1 className="login-title">SCORE INFOCAR</h1>
          <div className="form-group">
            <label htmlFor="usuario" className="form-label">Usuário</label>
            <select id="usuario" className="form-input" value={usuario} onChange={(e) => setUsuario(e.target.value)}>
              <option value="" disabled>Selecione seu usuário</option>
              <option value="usuario1">Usuário 1</option>
              <option value="usuario2">Usuário 2</option>
              <option value="usuario3">Usuário 3</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="senha" className="form-label">Senha</label>
            <input type="password" id="senha" className="form-input" placeholder="Digite sua senha" value={senha} onChange={(e) => setSenha(e.target.value)}/>
          </div>
          <button className="form-button" onClick={handleLogin}>Entrar</button>
        </div>
      </div>
    );
}

export default Login;