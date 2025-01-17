import React, { useState, useEffect } from 'react';
import {
  CButton,
  CCard,
  CCardBody,
  CForm,
  CFormInput,
  CFormLabel,
  CFormSelect,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
} from '@coreui/react';
import api from '../../services/axiosConfig';
import { useLocation } from 'react-router-dom';

const FluxoFinanceiroAdd = () => {
  const [descricao, setDescricao] = useState('');
  const [valor, setValor] = useState('');
  const [fluxo, setFluxo] = useState(''); // 'Entrada' ou 'Saída'
  const [dataVencimento, setDataVencimento] = useState('');
  const [dataPagamento, setDataPagamento] = useState('');
  const [tipo, setTipo] = useState(''); // 'Venda' ou 'Outra coisa'
  const [quantidade, setQuantidade] = useState('');
  const [saldo, setSaldo] = useState(0); // Saldo total
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const fluxoFinanceiroId = searchParams.get('id');
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    if (fluxoFinanceiroId) {
      const fetchFluxoFinanceiro = async () => {
        try {
          const response = await api.get(`/fluxoFinanceiro/${fluxoFinanceiroId}`);
          const {
            descricao = '',
            valor = '',
            fluxo = '',
            dataVencimento = '',
            dataPagamento = '',
            tipo = '',
            quantidade = '',
          } = response.data;

          setDescricao(descricao);
          setValor(valor);
          setFluxo(fluxo);
          setDataVencimento(dataVencimento);
          setDataPagamento(dataPagamento);
          setTipo(tipo);
          setQuantidade(tipo === 'Venda' ? quantidade : '');
        } catch (error) {
          console.error('Erro ao buscar fluxo financeiro:', error);
        }
      };
      fetchFluxoFinanceiro();
    }
  }, [fluxoFinanceiroId]);

  const handleSave = async (e) => {
    e.preventDefault();

    // Prepare data for submission
    const fluxoFinanceiroData = {
      descricao,
      valor,
      fluxo,
      dataVencimento,
      dataPagamento,
      tipo,
      quantidade: tipo === 'Venda' ? quantidade : null,
    };

    try {
      // Save data (PUT if editing, POST if adding)
      if (fluxoFinanceiroId) {
        await api.put(`/fluxoFinanceiro/${fluxoFinanceiroId}`, fluxoFinanceiroData);
      } else {
        await api.post('/fluxoFinanceiro', fluxoFinanceiroData);
      }

      // Convert value to float and update the saldo accordingly
      const valorFloat = parseFloat(valor) || 0;

      // Debug logs to check values
      console.log('Fluxo:', fluxo);
      console.log('Valor:', valor);
      console.log('Valor Float:', valorFloat);

      if (fluxo === 'Entrada') {
        // If fluxo is "Entrada", add the value to saldo
        setSaldo((prevSaldo) => prevSaldo + valorFloat);
      } else if (fluxo === 'Saída') {
        // If fluxo is "Saída", subtract the value from saldo
        setSaldo((prevSaldo) => prevSaldo - valorFloat);
      }

      // Show success modal
      setModalVisible(true);

      // Reset form after submission
      resetForm();
    } catch (error) {
      console.error('Erro ao salvar o fluxo financeiro:', error);
      alert('Erro ao salvar o fluxo financeiro');
    }
  };

  const resetForm = () => {
    setDescricao('');
    setValor('');
    setFluxo('');
    setDataVencimento('');
    setDataPagamento('');
    setTipo('');
    setQuantidade('');
  };

  return (
    <>
      <CCard>
        <CCardBody>
          <h4>{fluxoFinanceiroId ? 'Editar Fluxo Financeiro' : 'Adicionar Fluxo Financeiro'}</h4>
          <p>Saldo Total: R$ {saldo.toFixed(2)}</p>
          <CForm onSubmit={handleSave}>
            <div className="mb-3">
              <CFormLabel htmlFor="tipo">Tipo</CFormLabel>
              <CFormSelect
                id="tipo"
                value={tipo}
                onChange={(e) => setTipo(e.target.value)}
                required
              >
                <option value="">Selecione</option>
                <option value="Venda">Venda</option>
                <option value="Outra coisa">Outra coisa</option>
              </CFormSelect>
            </div>

            {tipo === 'Venda' && (
              <>
                <div className="mb-3">
                  <CFormLabel htmlFor="descricao">Descrição</CFormLabel>
                  <CFormInput
                    type="text"
                    id="descricao"
                    value={descricao}
                    onChange={(e) => setDescricao(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <CFormLabel htmlFor="quantidade">Quantidade</CFormLabel>
                  <CFormInput
                    type="number"
                    id="quantidade"
                    value={quantidade}
                    onChange={(e) => setQuantidade(e.target.value)}
                    required
                  />
                </div>
              </>
            )}

            <div className="mb-3">
              <CFormLabel htmlFor="valor">Valor</CFormLabel>
              <CFormInput
                type="number"
                id="valor"
                value={valor}
                onChange={(e) => setValor(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <CFormLabel htmlFor="fluxo">Fluxo</CFormLabel>
              <CFormSelect
                id="fluxo"
                value={fluxo}
                onChange={(e) => setFluxo(e.target.value)}
                required
              >
                <option value="">Entrada ou Saída</option>
                <option value="Entrada">Entrada</option>
                <option value="Saída">Saída</option>
              </CFormSelect>
            </div>
            <div className="mb-3">
              <CFormLabel htmlFor="dataVencimento">Data de Vencimento</CFormLabel>
              <CFormInput
                type="date"
                id="dataVencimento"
                value={dataVencimento}
                onChange={(e) => setDataVencimento(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <CFormLabel htmlFor="dataPagamento">Data de Pagamento</CFormLabel>
              <CFormInput
                type="date"
                id="dataPagamento"
                value={dataPagamento || ''} // Controlado
                onChange={(e) => setDataPagamento(e.target.value)}
              />
            </div>
            <CButton type="submit" color="primary">
              Salvar
            </CButton>
          </CForm>
        </CCardBody>
      </CCard>

      <CModal visible={modalVisible} onClose={() => setModalVisible(false)}>
        <CModalHeader>
          <CModalTitle>Sucesso</CModalTitle>
        </CModalHeader>
        <CModalBody>Fluxo financeiro salvo com sucesso!</CModalBody>
        <CModalFooter>
          <CButton color="primary" onClick={() => setModalVisible(false)}>
            Fechar
          </CButton>
        </CModalFooter>
      </CModal>
    </>
  );
};

export default FluxoFinanceiroAdd;
