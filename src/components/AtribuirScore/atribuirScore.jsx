import './atribuirScore.css';

function AtribuirScore() {
  return (
    <div className="atribuir-container">
      <div className="atribuirscore-esquerda">
          <div className="filtro-campo">
            <label htmlFor="base-select">Selecionar a base</label>
            <select id="base-select">
              <option value="">Escolha a base</option>
            </select>
          </div>
        
          <div className="filtro-campo">
            <label htmlFor="placa">Placa</label>
            <input type="text" id="placa" placeholder="Digite a placa" />
          </div>
        
          <div className="filtro-campo">
            <label htmlFor="data">Data</label>
            <input type="date" id="data" />
            <button className="btn-pesquisar">Pesquisar</button>
          </div>
        
          <div className="info-base">
            <p><strong>Base:</strong> Nome da Base</p>
            <p><strong>Fila:</strong> 10 registros</p>
          </div>
        
          <table className="mini-tabela">
            <tbody>
              <tr>
                <th>Placa</th>
                <td>ABC1D23</td>
              </tr>
              <tr>
                <th>Chassi</th>
                <td>9BWZZZ377VT004251</td>
              </tr>
              <tr>
                <th>Marca/Modelo</th>
                <td>Volkswagen Gol</td>
              </tr>
              <tr>
                <th>Data do Leilão</th>
                <td>25/04/2025</td>
              </tr>
              <tr>
                <th>Observação</th>
                <td>Sem observações</td>
              </tr>
            </tbody>
          </table>
        
          <div className="botoes-score">
            <button>Inteiro (sem dano)</button>
            <button>Pequeno (P)</button>
            <button>Médio (M)</button>
            <button>Grande (G)</button>
            <button>Sem Foto</button>
          </div>
        
          <div className="botoes-duplos">
            <div className="grupo">
              <button>Divergente</button>
              <button>Reanálise</button>
            </div>
            <div className="grupo">
              <button>Moto</button>
              <button>Caminhão/Ônibus</button>
            </div>
          </div>
        </div>
    </div>
  );
}

export default AtribuirScore;
