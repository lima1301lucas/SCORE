import { useNavigate } from 'react-router-dom';
import seta from "../../assets/arrow-left.svg";
import './reanalise.css';

function Reanalise() {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="reanalise-container">
      <button className="back-button" onClick={handleBack}>
        <img src={seta} alt="Voltar" />
      </button>
      <h1 className="reanalise-title">REANÁLISE</h1>
      <table className="reanalise-table">
        <thead>
          <tr>
            <th>Placa</th>
            <th>Data do Leilão</th>
            <th>Data do Score</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>ABC1234</td>
            <td>15/05/2025</td>
            <td>14/05/2025 23:59:59</td>
            <td><button className="view-button" onClick={() => handleView("ABC1234")}>Visualizar</button></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default Reanalise;