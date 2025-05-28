export async function getProducao(filtros = {}) {
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
      return data;
    } else {
      throw new Error('Erro ao buscar dados de produção');
    }
  } catch (error) {
    console.error('Erro na requisição:', error);
    return null;
  }
}