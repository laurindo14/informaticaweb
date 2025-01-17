import React, { useEffect, useState } from "react";
import api from "../../services/axiosConfig"; // Caminho correto para o axiosConfig

const FluxoFinanceiroSaldo = () => {
  const [fluxosFinanceiros, setFluxosFinanceiros] = useState([]);

  useEffect(() => {
    const fetchFluxosFinanceiros = async () => {
      try {
        const response = await api.get('/fluxoFinanceiro');
        const data = Array.isArray(response.data) ? response.data : [];
        setFluxosFinanceiros(data);
      } catch (error) {
        console.error('Erro ao buscar fluxos financeiros:', error);
      }
    };

    fetchFluxosFinanceiros();
  }, []);

  // Função para calcular o saldo total (somente as entradas)
  const calcularSaldoTotal = () => {
    return fluxosFinanceiros.reduce((total, fluxo) => {
      // Apenas somar os valores das entradas
      if (fluxo.tipo === 'Entrada') {
        return total + fluxo.valor;
      }
      return total;
    }, 0);
  };

  // Função para formatar valores monetários
  const formatCurrency = (value) =>
    new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);

  return (
    <div>
      <h3>Saldo Total: {formatCurrency(calcularSaldoTotal())}</h3>
    </div>
  );
};

export default FluxoFinanceiroSaldo;
