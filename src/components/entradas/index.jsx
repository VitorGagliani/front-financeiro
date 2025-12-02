import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './style.css';
import { ModalAdicionarEntrada } from "../modalAdicionarEntrada";



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




export const Entradas = () => {

  const [modalOpen, setModalOpen] = useState(false);

  const [dadosFinanceiros, setDadosFinanceiros] = useState({
    totalEntradas: 0,
    totaisPorMes: [],
    totalPorCategoria: [],
    maiorMes: [],
    maiorEntradaCategoria: 'Carregando...',
    todasEntradas: [],
  });
  


  const [isLoading, setIsLoading] = useState(true);
  const [setError] = useState(null);

  const carregarDados = async () => {
  try {
    const response = await axios.get('http://localhost:8080/gastos/entradas');

    const { totalEntradas, totaisPorMes, maiorMes, totalPorCategoria, todasEntradas } = response.data;

    let maiorMesDisplay = "—";
    if (maiorMes && typeof maiorMes === "object") {
      const entries = Object.entries(maiorMes);
      const [mes] = entries.reduce((a, b) => (a[1] > b[1] ? a : b));
      maiorMesDisplay = mes;
    }

    setDadosFinanceiros({
      totalEntradas: totalEntradas || 0,
      totaisPorMes: totaisPorMes || [],
      totalPorCategoria: totalPorCategoria || [],
      maiorMesDisplay,
      todasEntradas: todasEntradas || [],
    });

    setIsLoading(false);
  } catch (err) {
    console.error("Erro ao buscar dados:", err);
    setError("Não foi possível carregar os dados.");
    setIsLoading(false);
  }
};

useEffect(() => {
  carregarDados();
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
      label: "Entradas por mês",
      data: dadosFinanceiros.totaisPorMes,
      backgroundColor: [
        "#a32e47ff", "#36A2EB", "#FFCE56", "#4BC0C0",
        "#9966FF", "#b99b7cff", "#E7E9ED", "#98c9eaff",
        "#ffc6d2ff", "#4bc095ff", "#ff4aabff", "#FFCE56"
      ],
      borderWidth: 1,
    },
  ],
};


//fazer o post

const salvarEntrada = async (form) => {

    const payload = {
        descricao: form.descricao,
        valor: Number(form.valor),
        data: form.data,
        tipo: "ENTRADA",
        forma: form.forma.toUpperCase(),
        categoriaId: Number(form.categoriaId)

    };  

    console.log("Payload enviado:", payload);

  try {
    await axios.post("http://localhost:8080/gastos", payload);
    alert("Entrada salva com sucesso!");
    carregarDados();
  } catch (error) {
    console.error("Erro ao salvar entrada:", error);
    alert("Erro ao salvar entrada");
  }
};



  

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
            <img src='./add_circle_orange.svg' alt='Círculo de adição'></img>
            <div className='card-txt'>
       
              <h2>{dadosFinanceiros.maiorMesDisplay}</h2>
              <p className='desc-card'>Mais entradas</p>
            </div>
          </div>
        </div>

         <div className='cards'>
          <div className='card-content' onClick={() => setModalOpen(true)}>
            <img src='./add_circle_orange.svg' alt='Círculo de adição'></img>
            <div className='card-txt'>
              <p className='desc-card'>Adicionar entrada</p>
            </div>
            
          </div>
        </div>

      </div>

      <div className='graficos'>
        <div className='grafico-barra'>
          <Bar data={data} />
        </div>
        <div className='grafico-pizza'>
          <Pie data={dataPizza} />
        </div>
      
        
      </div>


{/* //tabela de entradas */}

      <div className="grid">
       
        <table className="tabela">
          
            <thead className=''>
                <tr>
                    <th className='th-valor'>Valor</th>
                    <th className='th-categoria'>Categoria</th>
                    <th className='th-desc'>Descrição</th>
                    <th className='th-data'>Data</th>
                    <th className='th-forma'>Forma</th> 
                </tr>
            </thead>
            <tbody>
               
                {dadosFinanceiros.todasEntradas.map((transacao) => (
                    <tr key={transacao.id}>

                      {/* aqui to percorrendo o array de entradas e mostrando na tabela */}
                        <td className="td-valor">{formatarParaReal(transacao.valor)}</td> 
                  
                        <td className='td-categoria'>{transacao.categoria?.descricao || 'Sem Categoria'}</td>
                        
                        <td className='td-desc'>{transacao.descricao}</td>
                        <td className='td-data'>{transacao.data}</td> 
                        <td className='td-forma'>{transacao.forma}</td> 
                    </tr>
                ))}
               
            </tbody>
        </table>

        
      </div>

        <ModalAdicionarEntrada
  isOpen={modalOpen}
  onClose={() => setModalOpen(false)}
  onSalvar={salvarEntrada}
/>
    </div>
  );
}