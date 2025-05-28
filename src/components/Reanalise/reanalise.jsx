import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getReanalise } from './reanalise';
import seta from "../../assets/arrow-left.svg";
import './reanalise.css';

function Reanalise() {
  const navigate = useNavigate();
  const [dados, setDados] = useState([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const resultado = await getReanalise();
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
    <div className="reanalise-container">
      <button className="back-button" onClick={handleBack}>
        <img src={seta} alt="Voltar" />
      </button>
      <h1 className="reanalise-title">REANÁLISE</h1>

      {carregando ? (
        <div className="loading-spinner"></div>
      ) : (
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
            {dados.map((item, index) => (
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
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Reanalise;