import { useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getLeilaoInfo } from './verLeilao';
import seta from "../../assets/arrow-left.svg";
import './VerLeilao.css';

function VerLeilao() {
  const navigate = useNavigate();
  const location = useLocation();
  const [info, setInfo] = useState(null);

  const queryParams = new URLSearchParams(location.search);
  const placa = queryParams.get('placa');
  const dataLeilao = queryParams.get('dataLeilao');

  useEffect(() => {
    async function carregarDados() {
      if (placa && dataLeilao) {
        try {
          const lista = await getLeilaoInfo(placa, dataLeilao);
          setInfo(lista);
        } catch (err) {
          console.log('Erro ao carregar: ', err);
        }
      } else {
        console.error('Placa ou data não fornecida.');
      }
    }

    carregarDados();
  }, [placa, dataLeilao]);

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="verscore-container">
      <button className="back-button" onClick={handleBack}>
        <img src={seta} alt="Voltar" />
      </button>
      <h1 className="verscore-title">INFORMAÇÕES DO VEÍCULO</h1>

      {info ? (
        <table className="verscore-table">
          <tbody>
            <tr>
              <th>Placa</th>
              <td>{info.vin}</td>
            </tr>
            <tr>
              <th>Chassi</th>
              <td>{info.chassis}</td>
            </tr>
            <tr>
              <th>Ano</th>
              <td>{info.fabricationDate}</td>
            </tr>
            <tr>
              <th>Marca/Modelo</th>
              <td>{info.model}</td>
            </tr>
            <tr>
              <th>Cor</th>
              <td>{info.color}</td>
            </tr>
            <tr>
              <th>Leiloeiro</th>
              <td>{info.auctioneer}</td>
            </tr>
            <tr>
              <th>Comitente</th>
              <td>{info.comitent}</td>
            </tr>
            <tr>
              <th>Lote</th>
              <td>{info.number}</td>
            </tr>
            <tr>
              <th>Data do Leilão</th>
              <td>{info.auctionDate}</td>
            </tr>
            <tr>
              <th>Detalhes</th>
              <td>{info.observations}</td>
            </tr>
          </tbody>
        </table>
      ) : (
        ''
      )}
    </div>
  );
}

export default VerLeilao;
