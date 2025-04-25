import { useNavigate } from 'react-router-dom';
import seta from "../../assets/arrow-left.svg";
import './producao.css';

function Producao() {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="producao-container">
      <button className="back-button" onClick={handleBack}>
        <img src={seta} alt="Voltar" />
      </button>
      <h1 className="producao-title">PRODUÇÃO</h1>

      <div className="filtros-container">
        <div className="filtro-campo">
          <label>Data Início</label>
          <input type="date" className="filtro-input" />
        </div>

        <div className="filtro-campo">
          <label>Data Fim</label>
          <input type="date" className="filtro-input" />
        </div>

        <div className="filtro-campo">
          <label>Tipo</label>
          <select className="filtro-input">
            <option value="">Tipo</option>
            <option value="tipo1">Tipo 1</option>
          </select>
        </div>

        <div className="filtro-campo">
          <label>Usuário</label>
          <select className="filtro-input">
            <option value="">Usuário</option>
            <option value="usuario1">Usuário 1</option>
          </select>
        </div>

        <div className="filtro-campo">
          <label>Placa</label>
          <input type="text" className="filtro-input" placeholder="Placa" />
        </div>

        <div className="filtro-acoes">
          <span className="filtro-quantidade">Registros: 0</span>
          <button className="filtro-btn limpar">Limpar Filtros</button>
          <button className="filtro-btn pesquisar">Pesquisar</button>
        </div>
      </div>

      <table className="producao-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Usuário</th>
            <th>Hora</th>
            <th>Placa</th>
            <th>Data do Leilão</th>
            <th>Modelo / Chassi</th>
            <th>Carro</th>
            <th>Score</th>
            <th>Reanálise</th>
            <th>Liberado</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>001</td>
            <td>usuario1</td>
            <td>10:00</td>
            <td>ABC1234</td>
            <td>20/05/2025</td>
            <td>Fiat Uno / 9BWZZZ...</td>
            <td>Uno 1.0</td>
            <td>85</td>
            <td>Não</td>
            <td>Sim</td>
            <td><button className="view-button">Visualizar</button></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default Producao;