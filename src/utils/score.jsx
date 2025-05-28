import { toast } from "react-toastify";

export async function enviarScoreSemFoto(placa, auctionDate, baseSelecionada){
    const scoreSemFoto = {
        vin: placa,
        auctionDate: auctionDate,
        table: baseSelecionada
    };

    try {
        const response = await fetch('', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(scoreSemFoto),
    });
        if (response.status === 200) {
            toast.success("Score registrado como sem foto")
          }
          else{
            toast.error("Erro ao enviar o Score");
          }
      
          const data = await response.text();
          console.log('Resposta do servidor:', data);
          return data;
    } catch (error) {
        console.error('Erro na requisição:', error);
    }
}

export async function enviarScore(baseSelecionada, usuario, dataLeilao, placa, chassi, valorScore, eCarro, eReanalise, finalizado){
  const score = {
      table: baseSelecionada,
      operatorUsername: usuario,
      auctionDate: dataLeilao,
      vin: placa,
      chassis: chassi,
      vehicleScoreGrade: valorScore,
      isCar: eCarro,
      isReanalysis: eReanalise,
      isFinished: finalizado
  };

  try {
      const response = await fetch('', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(score),
  });
      if (response.status === 200) {
          toast.success("Score registrado com sucesso")
        }
        else{
          toast.error("Erro ao enviar o Score");
        }
    
        const data = await response.text();
        console.log('Resposta do servidor:', data);
        return data;
  } catch (error) {
      console.error('Erro na requisição:', error);
  }
}