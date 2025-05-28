import semFoto from "../assets/sem-foto.png";

export const corrigirCaminhoImagem = (caminho) => {
    if (caminho) {
      let caminhoCorrigido = caminho.replace(/\\\\192.168.0.221\\dados_leilao\\/, '');
      caminhoCorrigido = caminhoCorrigido.split('\\').join('/');
      return `${link}${caminhoCorrigido}`;
    }
    return semFoto;
};