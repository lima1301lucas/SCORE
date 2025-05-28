import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import './VerScore.css';
import seta from "../../assets/arrow-left.svg";
import semFoto from "../../assets/sem-foto.png";
import { getLeilaoInfo } from './verScore';
import { corrigirCaminhoImagem } from '../../utils/imagem.jsx';
import { enviarScoreSemFoto, enviarScore } from '../../utils/score.jsx';

function VerScore() {
  const navigate = useNavigate();
  const irParaHome = () => navigate('/score');
  const irParaProducao = () => navigate('/producao');
  const irParaDivergentes = () => navigate('/divergentes');
  const irParaReanalise = () => navigate('/reanalise');
  
  const location = useLocation();
  const { placa, dataLeilao } = location.state || {}; 
  const [scoreData, setScoreData] = useState(null);
  const [carregando, setCarregando] = useState(true);
  const [imagemPrincipal, setImagemPrincipal] = useState(''); 

  useEffect(() => {
    if (!placa || !dataLeilao) {
      toast.error('Placa e data do leilão são obrigatórios!');
      return;
    }

    async function fetchScoreData() {
      setCarregando(true);

      try {
        const resultado = await getLeilaoInfo(placa, dataLeilao); 

        if (resultado) {
          setScoreData(resultado);
          setImagemPrincipal(resultado.imagesDirectories[0] || '');
        } else {
          toast.error('Erro ao carregar informações do veículo');
        }
      } catch (error) {
        toast.error('Não foi possível carregar as informações do veículo');
      } finally {
        setCarregando(false);
      }
    }

    fetchScoreData();
  }, [placa, dataLeilao]);

  const handleBack = () => {
    navigate(-1);
  };

  const handleMiniaturaClick = (imagem) => {
    setImagemPrincipal(imagem);
  };

  if (carregando) {
    return <div className="loading-spinner"></div>;
  }

  if (!scoreData) {
    return null;
  }

  const handleAtualizarScore = async (valor) => {
    let base = localStorage.getItem('baseSelecionada');
    let usuario = localStorage.getItem('usuarioLogado');
    let dataAtual = scoreData.auctionDate;
    let placaAtual = scoreData.vin;
    let chassi = scoreData.chassis;
    let valorScore = String(valor);
    let eCarro = "S";
    let eReanalise = "N";
    let finalizado = "S";
  
    try {
      if (valor >= 0 && valor <= 3) {
        await enviarScore(base, usuario, dataAtual, placaAtual, chassi, valorScore, eCarro, eReanalise, finalizado);
      } else if (valor === 4) {
        await enviarScoreSemFoto(placaAtual, dataAtual, base); // corrigido aqui para chamar enviarScoreSemFoto!
      } else if (valor === 5) {
        valorScore = "N";
        eReanalise = "D";
        await enviarScore(base, usuario, dataAtual, placaAtual, chassi, valorScore, eCarro, eReanalise, finalizado);
      } else if (valor === 6) {
        valorScore = "N";
        eReanalise = "R";
        await enviarScore(base, usuario, dataAtual, placaAtual, chassi, valorScore, eCarro, eReanalise, finalizado);
      } else if (valor === 7) {
        valorScore = "N";
        eCarro = "M";
        await enviarScore(base, usuario, dataAtual, placaAtual, chassi, valorScore, eCarro, eReanalise, finalizado);
      } else {
        valorScore = "N";
        eCarro = "O";
        await enviarScore(base, usuario, dataAtual, placaAtual, chassi, valorScore, eCarro, eReanalise, finalizado);
      }
  
      setTimeout(() => {
        navigate('/producao');
      }, 4000);
    } 
    catch (error) {
      console.error('Erro ao atualizar score:', error);
      toast.error('Erro. Tente novamente!');
    }
  };
  
  return (
    <div className="verscore-layout">
      <div className="verscore-esquerda">
        <button className="verscore-back-button" onClick={handleBack}>
          <img src={seta} alt="Voltar" />
        </button>

        <table className="verscore-mini-tabela">
          <tbody>
            <tr>
              <th>Placa</th>
              <td>{scoreData?.vin || ''}</td>
            </tr>
            <tr>
              <th>Chassi</th>
              <td>{scoreData?.chassis || ''}</td>
            </tr>
            <tr>
              <th>Marca/Modelo</th>
              <td>{scoreData?.model || ''}</td>
            </tr>
            <tr>
              <th>Data do Leilão</th>
              <td>{scoreData?.auctionDate || ''}</td>
            </tr>
            <tr>
              <th>Observação</th>
              <td>{scoreData?.observations || ''}</td>
            </tr>
          </tbody>
        </table>

        <div className="verscore-botoes-score">
          <button value={0} onClick={() => handleAtualizarScore(0)}>Inteiro (Sem Dano)</button>
          <button value={1} onClick={() => handleAtualizarScore(1)}>Pequeno (P)</button>
          <button value={2} onClick={() => handleAtualizarScore(2)}>Médio (M)</button>
          <button value={3} onClick={() => handleAtualizarScore(3)}>Grande (G)</button>
          <button value={4} onClick={() => handleAtualizarScore(4)}>Sem Foto</button>
        </div>

        <div className="verscore-botoes-acao">
          <div className="verscore-linha">
            <button value={5} onClick={() => handleAtualizarScore(5)}>Divergente</button>
            <button value={6} onClick={() => handleAtualizarScore(6)}>Reanálise</button>
          </div>
          <div className="verscore-linha">
            <button value={7} onClick={() => handleAtualizarScore(7)}>Moto</button>
            <button value={8} onClick={() => handleAtualizarScore(8)}>Caminhão/Ônibus</button>
          </div>
        </div>
      </div>

      <div className="verscore-coluna-meio">
        <div className="verscore-botoes-topo">
          <button onClick={irParaHome}>Página inicial</button>
          <button onClick={irParaProducao}>Ver Produção</button>
          <button onClick={irParaDivergentes}>Ver Divergentes</button>
          <button onClick={irParaReanalise}>Ver Reanálise</button>
        </div>

        <div className="verscore-imagem-quadrada">
          <img src={corrigirCaminhoImagem(imagemPrincipal || '')} alt="Principal" />
        </div>
      </div>

      <div className="verscore-coluna-direita">
        <div className="verscore-galeria">
          {scoreData.imagesDirectories.length === 0 ? (
            <div className="verscore-item-galeria">
              <img src={semFoto} />
            </div>
          ) : (
            scoreData.imagesDirectories.map((imgUrl, index) => (
              <div key={index} className="verscore-item-galeria">
                <img
                  src={corrigirCaminhoImagem(imgUrl)}
                  alt={`Miniatura ${index + 1}`}
                  onClick={() => handleMiniaturaClick(imgUrl)}
                />
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default VerScore;