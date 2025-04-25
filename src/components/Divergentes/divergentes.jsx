import { useNavigate } from 'react-router-dom';
import seta from "../../assets/arrow-left.svg";
import './divergentes.css';

function Divergentes() {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="divergentes-container">
      <button className="back-button" onClick={handleBack}>
        <img src={seta}/>
      </button>
      <h1 className="divergentes-title">DIVERGENTES</h1>
      <table className="divergentes-table">
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

export default Divergentes;