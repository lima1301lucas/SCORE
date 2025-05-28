export async function getLeilaoInfo(placaLeilao, dataLeilao) {
    const filtros = {
      vin: placaLeilao,
      auctionDate: dataLeilao
    };
  
    try {
      const response = await fetch('${link}', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(filtros)
      });
  
      if (response.ok) {
        const data = await response.json();
        return data;
      } else {
        throw new Error('Erro ao buscar informações do leilão');
      }
    } catch (error) {
      console.error('Erro na requisição:', error);
      return null;
    }
}  