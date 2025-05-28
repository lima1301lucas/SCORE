import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getDivergentes } from './divergentes';
import seta from "../../assets/arrow-left.svg";
import './divergentes.css';

function Divergentes() {
  const navigate = useNavigate();
  const [dados, setDados] = useState([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const resultado = await getDivergentes();
      if (resultado) {
        setDados(resultado);
      }
      setCarregando(false);
    }
    fetchData();
  }, []);

  const handleBack = () => {
    navigate(-1);
  };

  const handleView = (placa, dataLeilao) => {
    navigate('/verScore', {
      state: { placa, dataLeilao }
    });
  };

  return (
    <div className="divergentes-container">
      <button className="back-button" onClick={handleBack}>
        <img src={seta} alt="Voltar" />
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
          {carregando ? (
            <tr>
              <td colSpan="4" style={{ textAlign: 'center' }}>
                <div className="loading-spinner"></div>
              </td>
            </tr>
          ) : (
            dados.map((item, index) => (
              <tr key={index}>
                <td>{item.vin}</td>
                <td>{item.date}</td>
                <td>{item.hour}</td>
                <td>
                  <button className="view-button" onClick={() => handleView(item.vin, item.date)}>
                    Visualizar
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Divergentes;