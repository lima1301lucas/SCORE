import { useNavigate } from 'react-router-dom';
import seta from "../../assets/arrow-left.svg";
import './VerScore.css';

function VerScore() {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="verscore-container">
      <button className="back-button" onClick={handleBack}>
        <img src={seta}/>
      </button>
      <h1 className="verscore-title">INFORMAÇÕES DO VEÍCULO</h1>

      <table className="verscore-table">
        <tbody>
          <tr>
            <th>Placa</th>
            <td>ABC1234</td>
          </tr>
          <tr>
            <th>Chassi</th>
            <td>9BWZZZ377VT004251</td>
          </tr>
          <tr>
            <th>Ano</th>
            <td>2019</td>
          </tr>
          <tr>
            <th>Marca/Modelo</th>
            <td>VW Gol</td>
          </tr>
          <tr>
            <th>Cor</th>
            <td>Prata</td>
          </tr>
          <tr>
            <th>Leiloeiro</th>
            <td>Leilões BR</td>
          </tr>
          <tr>
            <th>Comitente</th>
            <td>Banco XPTO</td>
          </tr>
          <tr>
            <th>Lote</th>
            <td>42</td>
          </tr>
          <tr>
            <th>Data do Leilão</th>
            <td>15/05/2025</td>
          </tr>
          <tr>
            <th>Detalhes</th>
            <td>Sem avarias</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default VerScore;