export async function getDivergentes() {
    try {
      const response = await fetch('${link}');
      if (response.status === 200) {
        const data = await response.json();
        return data;
      } else {
        throw new Error('Erro ao buscar dados de divergentes');
      }
    } catch (error) {
      console.error('Erro na requisição:', error);
      return null;
    }
}