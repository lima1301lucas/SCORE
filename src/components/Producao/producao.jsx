import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getProducao } from './producao';
import { buscarUsuarios } from '../../components/Login/login';
import { toast } from 'react-toastify';
import seta from "../../assets/arrow-left.svg";
import './producao.css';

function Producao() {
  const navigate = useNavigate();
  const [dados, setDados] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [usuarios, setUsuarios] = useState([]);
  const [usuarioSelecionado, setUsuarioSelecionado] = useState("");
  const [tipoSelecionado, setTipoSelecionado] = useState("");
  const [placa, setPlaca] = useState("");
  const [dataInicio, setDataInicio] = useState("");
  const [dataFim, setDataFim] = useState("");

  useEffect(() => {
    async function carregarUsuarios() {
      try {
        const lista = await buscarUsuarios();
        setUsuarios(lista);
      } catch (err) {
        console.log('Erro ao carregar usuários: ', err);
      }
    }
    carregarUsuarios();
  }, []);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData(filtros = {}) {
    setCarregando(true);
    const resultado = await getProducao(filtros);
    if (resultado) {
      setDados(resultado);
    }
    setCarregando(false);
  }

  const handleBack = () => {
    navigate(-1);
  };

  const handleView = (placa, dataLeilao) => {
    navigate('/verScore', {
      state: { placa, dataLeilao }
    });
  };

  const limparFiltros = () => {
    setUsuarioSelecionado("");
    setTipoSelecionado("");
    setPlaca("");
    setDataInicio("");
    setDataFim("");
    fetchData();
  };

  const pesquisarComFiltros = async () => {
    if (
      !usuarioSelecionado &&
      !tipoSelecionado &&
      !placa &&
      !dataInicio &&
      !dataFim
    ) {
      toast.error("Por favor, preencha ao menos um filtro.");
      return;
    }

    const filtros = {};

    if (usuarioSelecionado) filtros.username = usuarioSelecionado;
    if (placa) filtros.vin = placa;

    if (tipoSelecionado === "divergent") filtros.divergent = true;
    if (tipoSelecionado === "reanalysis") filtros.reanalysis = true;

    if (dataInicio || dataFim) {
      if (!dataInicio || !dataFim) {
        toast.error("Preencha a data de início e a data de fim.");
        return;
      }
      filtros.initialDate = dataInicio;
      filtros.endDate = dataFim;
    }

    await fetchData(filtros);
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
          <input
            type="date"
            className="filtro-input"
            value={dataInicio}
            onChange={(e) => setDataInicio(e.target.value)}
          />
        </div>

        <div className="filtro-campo">
          <label>Data Fim</label>
          <input
            type="date"
            className="filtro-input"
            value={dataFim}
            onChange={(e) => setDataFim(e.target.value)}
          />
        </div>

        <div className="filtro-campo">
          <label>Tipo</label>
          <select
            className="filtro-input"
            value={tipoSelecionado}
            onChange={(e) => setTipoSelecionado(e.target.value)}
          >
            <option value="">Tipo</option>
            <option value="divergent">Divergente</option>
            <option value="reanalysis">Reanálise</option>
          </select>
        </div>

        <div className="filtro-campo">
          <label>Usuário</label>
          <select
            id="usuario"
            className="filtro-input"
            value={usuarioSelecionado}
            onChange={(e) => setUsuarioSelecionado(e.target.value)}
          >
            <option value="" disabled>Selecione seu usuário</option>
            {usuarios.map((usuarioObj, index) => (
              <option key={index} value={usuarioObj.username}>
                {usuarioObj.username}
              </option>
            ))}
          </select>
        </div>

        <div className="filtro-campo">
          <label>Placa</label>
          <input
            type="text"
            className="filtro-input"
            placeholder="Placa"
            value={placa}
            onChange={(e) => setPlaca(e.target.value)}
          />
        </div>

        <div className="filtro-acoes">
          <span className="filtro-quantidade">Registros: {dados.length}</span>
          <button className="filtro-btn limpar" onClick={limparFiltros}>
            Limpar Filtros
          </button>
          <button className="filtro-btn pesquisar" onClick={pesquisarComFiltros}>
            Pesquisar
          </button>
        </div>
      </div>

      {carregando ? (
        <div className="loading-spinner"></div>
      ) : (
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
            {dados.map((item, index) => (
              <tr key={index}>
                <td>{item.id}</td>
                <td>{item.user}</td>
                <td>{item.processedDate}</td>
                <td>{item.vin}</td>
                <td>{item.auctionDate}</td>
                <td>{item.chassis}</td>
                <td>{item.isCar ? "S" : "N"}</td>
                <td>{item.vehicleScoreGrade}</td>
                <td>{item.reanalysisStatus}</td>
                <td>{item.isFinished ? "S" : "N"}</td>
                <td>
                  <button
                    className="view-button"
                    onClick={() => handleView(item.vin, item.auctionDate)}
                  >
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

export default Producao;