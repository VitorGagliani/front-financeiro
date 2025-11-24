import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './style.css';

//dos graficos

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  ArcElement,
  BarElement,
  Tooltip,
  Legend
} from "chart.js";

import { Bar } from "react-chartjs-2";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend
);



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
    totaisPorMes: [],
    maiorGastoCategoria: 'Carregando...',
  });


  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const buscarDados = async () => {
      try {
       
        const response = await axios.get('http://localhost:8080/gastos/resumo');
        console.log("totaisPorMes recebido:", response.data.totaisPorMes);

     
        const { totalEntradas, totalSaidas, maiorGastoCategoria, totaisPorMes } = response.data;
        console.log("Entradas:", totalEntradas, "Saídas:", totalSaidas);

        setDadosFinanceiros({
          totalEntradas: totalEntradas || 0,
          totalSaidas: totalSaidas || 0,
          totaisPorMes: totaisPorMes || [],
          diferenca: (totalEntradas || 0) - (totalSaidas || 0),
          maiorGastoCategoria: maiorGastoCategoria || 'N/A',
        });
        console.log("API:", response.data);

        setIsLoading(false);
      } catch (err) {
        console.error("Erro ao buscar dados da API:", err);
        setError("Não foi possível carregar os dados.");
        setIsLoading(false);
      }
    };

    buscarDados();
  }, []); 


  const data = {
    labels: ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"],
    datasets: [
      {
        label: "Entradas",
        data: dadosFinanceiros.totaisPorMes,
        backgroundColor: "#B5F49C",
      },
    ],
  };

  const dataPizza = {
  labels: [
    "Jan", "Fev", "Mar", "Abr", "Mai", "Jun",
    "Jul", "Ago", "Set", "Out", "Nov", "Dez"
  ],

  datasets: [
    {
      label: "Gastos por mês",
      data: dadosFinanceiros.totaisPorMes,
      backgroundColor: [
        "#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0",
        "#9966FF", "#FF9F40", "#E7E9ED", "#36A2EB",
        "#FF6384", "#4BC0C0", "#9966FF", "#FFCE56"
      ],
      borderWidth: 1,
    },
  ],
};


  ///////


  

  if (isLoading) {
    return <h1 className='title'>Carregando dados...</h1>;
  }

  // if (error) {
  //   return <h1 className='title' style={{ color: 'red' }}>{error}</h1>;
  // }

  //


  

  

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
            <img src='./diferenca_circle.svg' alt='Círculo de adição'></img>
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
        <div className='grafico-barra'>
          <Bar data={data} />;
        </div>
        <div className='grafico-pizza'>
          <Pie data={dataPizza} />
        </div>
      </div>
    </div>
  );
}