export async function buscarUsuarios() {
  try {
    const response = await fetch("${link}");

    if (response.status === 200) {
      const data = await response.json();
      return data;
    } else {
      throw new Error('Erro ao buscar usuários');
    }
  } catch (error) {
    throw error;
  }
}

export async function fazerLogin(usuario, senha) {
    const loginData = {
      username: usuario,
      password: senha
    };
  
    try {
      const response = await fetch('${link}', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(loginData)
      });
  
      if (response.status === 200) {
        const data = await response.json();
        return { success: true, data };
      } else {
        return { success: false };
      }
    } catch (error) {
      throw error;
    }
}  