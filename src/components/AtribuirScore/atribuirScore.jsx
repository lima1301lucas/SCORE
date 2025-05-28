import './AtribuirScore.css';
import semFoto from "../../assets/sem-foto.png";
import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { fetchBases, getWorkloadCount, getWork, getVehicleInfo } from './getWork';
import { enviarScoreSemFoto, enviarScore } from '../../utils/score.jsx';
import { corrigirCaminhoImagem } from '../../utils/imagem.jsx';
import { formatarData } from '../../utils/data.jsx';

function AtribuirScore() {
  const [bases, setBases] = useState([]);  
  const [workloadCount, setWorkloadCount] = useState(null);
  const [baseSelecionada, setBaseSelecionada] = useState('');
  const [placa, setPlaca] = useState('');
  const [dataLeilao, setDataLeilao] = useState('');
  const [veiculo, setVeiculo] = useState(null);
  const [imagemSelecionada, setImagemSelecionada] = useState(null);
  const [galeria, setGaleria] = useState([]);
  const [carregando, setCarregando] = useState(false);  

  const navigate = useNavigate();
  const irParaProducao = () => navigate('/producao');
  const irParaDivergentes = () => navigate('/divergentes');
  const irParaReanalise = () => navigate('/reanalise');

  useEffect(() => {
    async function carregarBases() {
      try {
        const listaBases = await fetchBases();
        if (Array.isArray(listaBases) && listaBases.length > 0) {
          setBases(listaBases);
        } else {
          console.log('Nenhuma base retornada.');
        }
      } catch (err) {
        console.log('Erro ao carregar as bases: ', err);
      }
    }
    carregarBases();
  }, []);

  useEffect(() => {
    async function carregarWorkloadCount() {
      try {
        const count = await getWorkloadCount();
        setWorkloadCount(count);
      } catch (error) {
        console.error('Erro ao carregar a quantidade de registros:', error);
      }
    }
    carregarWorkloadCount();
  }, []);

  const limparFiltros = () => {
    setBaseSelecionada('');
    setPlaca('');
    setDataLeilao('');
  };

  const handlePesquisar = async () => {
    try {
      if (placa && dataLeilao) {
        const [ano, mes, dia] = dataLeilao.split('-');
        const dataFormatada = `${dia}/${mes}/${ano}`;

        const resposta = await getVehicleInfo(placa, dataFormatada);

        if (resposta) {
          if (resposta.vin) {
            setVeiculo(resposta);
            if (resposta.imagesDirectories && resposta.imagesDirectories.length > 0) {
              setGaleria(resposta.imagesDirectories);
              setImagemSelecionada(corrigirCaminhoImagem(resposta.imagesDirectories[0]));
            } else {
              setGaleria([]);
              setImagemSelecionada(semFoto);
            }
          } else {
            toast.error(`Erro ao realizar a busca: ${resposta.message || 'Dados do veículo não encontrados.'}`);
          }
        } else {
          toast.error('Erro ao realizar a busca: Placa e data não batem.');
        }
      } else {
        toast.error('Preencha tanto a placa quanto a data para buscar o veículo.');
      }
    } catch (error) {
      console.error('Erro na pesquisa:', error);
      toast.error('Erro ao realizar a pesquisa. Tente novamente.');
    }
  };

  const handleSelecionarImagem = (imagem) => {
    setImagemSelecionada(corrigirCaminhoImagem(imagem));
  };

  const handleVerLeilao = () => {
    const placaFinal = placa || (veiculo ? veiculo.vin : '');
    let dataLeilaoFinal = dataLeilao || (veiculo ? veiculo.auctionDate : '');

    if (dataLeilaoFinal && dataLeilaoFinal.includes('-')) {
      dataLeilaoFinal = formatarData(dataLeilaoFinal);
    }

    if (placaFinal && dataLeilaoFinal) {
      const [dia, mes, ano] = dataLeilaoFinal.split('/');
      const dataFormatada = `${dia}/${mes}/${ano}`;
      window.open(`/verLeilao?placa=${placaFinal}&dataLeilao=${dataFormatada}`, '_blank');
    } else {
      toast.error('Preencha a placa e a data do leilão para visualizar.');
    }
  };

  const handleAvaliaScore = async (valor) => {
    if ((placa && dataLeilao) || veiculo) {
      let base = baseSelecionada;
      let usuario = localStorage.getItem('usuarioLogado');
      let dataAtual = dataLeilao || veiculo.auctionDate;
      let placaAtual = placa || veiculo.vin;
      let chassi = veiculo?.chassis || '';
      let valorScore = String(valor);
      let eCarro = "S";
      let eReanalise = "N";
      let finalizado = "S";
  
      try {
        if (valor >= 0 && valor <= 3) {
          await enviarScore(base, usuario, dataAtual, placaAtual, chassi, valorScore, eCarro, eReanalise, finalizado);
        } else if (valor === 4) {
          await enviarScoreSemFoto(placaAtual, dataAtual, base);
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

        setCarregando(true);

        const resultado = await getWork(baseSelecionada);
        if (resultado) {
          setVeiculo(resultado);
          if (resultado.imagesDirectories && resultado.imagesDirectories.length > 0) {
            setGaleria(resultado.imagesDirectories);
            setImagemSelecionada(corrigirCaminhoImagem(resultado.imagesDirectories[0]));
          } else {
            setGaleria([]);
            setImagemSelecionada(semFoto);
          }
        }
      } 
      catch (error) {
        console.error('Erro ao enviar o score:', error);
        toast.error('Erro ao buscar a fila! Limpe os filtros e selecione a base ou placa e data novamente.');
      } finally {
        setCarregando(false);
      }
    }
  };  

  return (
    <div className="layout">
      <div className="atribuirscore-esquerda">
        <div className="campo">
          <label>Selecionar a base</label>
          <select
            value={baseSelecionada}
            onChange={async (e) => {
              const novaBase = e.target.value;
              setBaseSelecionada(novaBase);
              localStorage.setItem('baseSelecionada', novaBase);
              if (novaBase) {
                try {
                  const resultado = await getWork(novaBase);
                  if (resultado) {
                    setVeiculo(resultado);
                    if (resultado.imagesDirectories && resultado.imagesDirectories.length > 0) {
                      setGaleria(resultado.imagesDirectories);
                      setImagemSelecionada(corrigirCaminhoImagem(resultado.imagesDirectories[0]));
                    } else {
                      setGaleria([]);
                      setImagemSelecionada(semFoto);
                    }
                  } else {
                    toast.error('Nenhum veículo encontrado para a base selecionada.');
                  }
                } catch (error) {
                  console.error('Erro ao buscar a base:', error);
                  toast.error('Erro ao buscar a base.');
                }
              }
            }}>
            <option value="" disabled>Selecione a base</option>
            {bases.map((base, index) => (
              <option key={index} value={base}>{base}</option>
            ))}
          </select>
        </div>

        <div className="linha-inputs">
          <div className="campo pequeno">
            <label>Placa</label>
            <input
              type="text"
              placeholder="Digite a placa"
              value={placa}
              onChange={(e) => setPlaca(e.target.value)}
              maxLength={7}
            />
          </div>
          <div className="campo pequeno">
            <label>Data</label>
            <input
              type="date"
              value={dataLeilao}
              onChange={(e) => setDataLeilao(e.target.value)}
            />
          </div>
        </div>

        <div className="botoes">
          <button className="botao-limpar" onClick={limparFiltros}>Limpar Filtros</button>
          <button className="botao-pesquisar" onClick={handlePesquisar}>Pesquisar</button>
        </div>

        <div className="info-base">
          <p><strong>Base:</strong> {baseSelecionada || ''}</p>
          <p><strong>Fila:</strong> {workloadCount !== null ? `${workloadCount} registros` : ''}</p>
        </div>

        <table className="mini-tabela">
          <tbody>
            <tr>
              <th>Placa</th>
              <td>{veiculo ? veiculo.vin : ''}</td>
            </tr>
            <tr>
              <th>Chassi</th>
              <td>{veiculo ? veiculo.chassis : ''}</td>
            </tr>
            <tr>
              <th>Marca/Modelo</th>
              <td>{veiculo ? veiculo.model : ''}</td>
            </tr>
            <tr>
              <th>Data do Leilão</th>
              <td>{veiculo ? veiculo.auctionDate : ''}</td>
            </tr>
            <tr>
              <th>Observação</th>
              <td>{veiculo ? veiculo.observations : ''}</td>
            </tr>
          </tbody>
        </table>

        <div className="botoes-score">
          <button value={0} onClick={() => handleAvaliaScore(0)}>Inteiro (Sem Dano)</button>
          <button value={1} onClick={() => handleAvaliaScore(1)}>Pequeno (P)</button>
          <button value={2} onClick={() => handleAvaliaScore(2)}>Médio (M)</button>
          <button value={3} onClick={() => handleAvaliaScore(3)}>Grande (G)</button>
          <button value={4} onClick={() => handleAvaliaScore(4)}>Sem Foto</button>
        </div>

        <div className="botoes-acao">
          <div className="linha">
            <button value={5} onClick={() => handleAvaliaScore(5)}>Divergente</button>
            <button value={6} onClick={() => handleAvaliaScore(6)}>Reanálise</button>
          </div>
          <div className="linha">
            <button value={7} onClick={() => handleAvaliaScore(7)}>Moto</button>
            <button value={8} onClick={() => handleAvaliaScore(8)}>Caminhão/Ônibus</button>
          </div>
        </div>
      </div>

      <div className="coluna-meio">
        <div className="botoes-topo">
          <button onClick={irParaProducao}>Ver Produção</button>
          <button onClick={irParaDivergentes}>Ver Divergentes</button>
          <button onClick={irParaReanalise}>Ver Reanálise</button>
          <button onClick={handleVerLeilao}>Ver no Leilão</button>
        </div>
        <div className="imagem-quadrada">
          {carregando ? (
            <div className="spinner"></div>
          ) : (
          <img src={imagemSelecionada} />
          )}
        </div>
      </div>

      <div className="coluna-direita">
        <div className="galeria">
          {galeria.length > 0 ? (
            galeria.map((img, index) => (
              <div
                key={index}
                className="item-galeria"
                onClick={() => handleSelecionarImagem(img)}
              >
                <img src={corrigirCaminhoImagem(img)} alt={`Galeria ${index + 1}`} />
              </div>
            ))
          ) : (
            ''
          )}
        </div>
      </div>
    </div>
  );
}

export default AtribuirScore;