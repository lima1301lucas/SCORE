export async function fetchBases() {
    const url = "${link}";
  
    try {
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        return data;
      } else {
        throw new Error('Erro ao buscar as bases');
      }
    } catch (error) {
      console.error('Erro na requisição das bases:', error);
      throw error;
    }
}

export async function getWorkloadCount() {
    const url = "${link}";
  
    try {
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        return data;
      } else {
        throw new Error('Erro ao buscar as bases');
      }
    } catch (error) {
      console.error('Erro na requisição das bases:', error);
      throw error;
    }
}

export async function getWork(filtroBase) {
  const response = await fetch('${link}', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(filtroBase),
  });
  if (!response.ok) {
    throw new Error('Erro ao buscar a base');
  }
  return await response.json();
}

export async function getVehicleInfo(placa, dataLeilao) {
  const filtros = {
    vin: placa,
    auctionDate: dataLeilao,
  };

  try {
    const response = await fetch('${link}', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(filtros),
    });

    if (response.status === 200) {
      const data = await response.json();
      return data;  // Retorna os dados da API
    } else if (response.status === 500) {
      console.log("Placa e data não coincidem! Verifique as informações novamente.");
    } else {
      console.log("Erro inesperado, por favor tente novamente.");
    }
  } catch (error) {
    console.error('Erro na requisição:', error);
  }
}