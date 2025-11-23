import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './style.css';

const formatarParaReal = (valor) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(valor);
};

export const Dashboard = () => {

  const [dadosFinanceiros, setDadosFinanceiros] = useState({
    totalEntradas: 0,
    totalSaidas: 0,
    diferenca: 0,
    maiorGastoCategoria: 'Carregando...',
  });


  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const buscarDados = async () => {
      try {
       
        const response = await axios.get('http://localhost:8080/gastos/resumo');
        console.log("Dados da API:", response.data);
     
        const { totalEntradas, totalSaidas, maiorGastoCategoria } = response.data;
        console.log("Entradas:", totalEntradas, "Saídas:", totalSaidas);

        setDadosFinanceiros({
          totalEntradas: totalEntradas || 0,
          totalSaidas: totalSaidas || 0,
          diferenca: (totalEntradas || 0) - (totalSaidas || 0),
          maiorGastoCategoria: maiorGastoCategoria || 'N/A',
        });
        setIsLoading(false);
      } catch (err) {
        console.error("Erro ao buscar dados da API:", err);
        setError("Não foi possível carregar os dados.");
        setIsLoading(false);
      }
    };

    buscarDados();
  }, []); 

  

  if (isLoading) {
    return <h1 className='title'>Carregando dados...</h1>;
  }

  if (error) {
    return <h1 className='title' style={{ color: 'red' }}>{error}</h1>;
  }

  

  return (
    <div className="dashboard">
      <h1 className='title'>Visão Geral</h1>
      <div className="infos-cards">

    
        <div className='cards'>
          <div className='card-content'>
            <img src='./arrow_card_orange.svg' alt='Seta para cima'></img>
            <div className='card-txt'>
   
              <h2>{formatarParaReal(dadosFinanceiros.totalEntradas)}</h2>
              <p className='desc-card'>De entradas</p>
            </div>
          </div>
        </div>

        <div className='cards'>
          <div className='card-content'>
            <img src='./arrow_down_orange.svg' alt='Seta para baixo'></img>
            <div className='card-txt'>
      
              <h2>{formatarParaReal(dadosFinanceiros.totalSaidas)}</h2>
              <p className='desc-card'>De saídas</p>
            </div>
          </div>
        </div>

        <div className='cards'>
          <div className='card-content'>
            <img src='./add_circle_orange.svg' alt='Círculo de adição'></img>
            <div className='card-txt'>
       
              <h2>{formatarParaReal(dadosFinanceiros.diferenca)}</h2>
              <p className='desc-card'>Diferença</p>
            </div>
          </div>
        </div>

         <div className='cards'>
          <div className='card-content'>
            <img src='./add_circle_orange.svg' alt='Círculo de adição'></img>
            <div className='card-txt'>
       
              <h2>{dadosFinanceiros.maiorGastoCategoria}</h2>
              <p className='desc-card'>Maior gasto</p>
            </div>
          </div>
        </div>

      </div>

      <div className='graficos'>
        <div className='grafico-pizza'>
          {/*  */}
        </div>
        <div className='grafico-barra'>
          {/*  */}
        </div>
      </div>
    </div>
  );
}