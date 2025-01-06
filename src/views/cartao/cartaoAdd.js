import React, { useState, useEffect } from 'react';
import {
  CButton,
  CCard,
  CCardBody,
  CForm,
  CFormInput,
  CFormLabel,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
} from '@coreui/react';
import api from '../../services/axiosConfig';
import { useLocation } from 'react-router-dom';

const CartaoAdd = () => {
  const [numeroCartao, setNumeroCartao] = useState('');
  const [validade, setValidade] = useState('');
  const [nome, setNome] = useState('');
  const [clienteId, setClienteId] = useState(''); // Ajustado o nome do campo
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const cartaoId = searchParams.get('id');
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    if (cartaoId) {
      const fetchCartao = async () => {
        try {
          const response = await api.get(`/cartao/${cartaoId}`);
          const { numeroCartao, validade, nome, clienteId } = response.data; // Certifique-se de que "clienteId" existe na API
          setNumeroCartao(numeroCartao);
          setValidade(validade);
          setNome(nome);
          setClienteId(clienteId || ''); // Prevenir valores nulos/undefined
        } catch (error) {
          console.error("Erro ao buscar cartão:", error);
        }
      };
      fetchCartao();
    }
  }, [cartaoId]);

  const handleSave = async (e) => {
    e.preventDefault();

    // Validar dados antes do envio
    if (!numeroCartao || !validade || !nome || !clienteId) {
      alert('Preencha todos os campos obrigatórios.');
      return;
    }

    const cartaoData = {
      numeroCartao,
      validade,
      nome,
      clienteId, // Certifique-se de que este campo é esperado pela API
    };

    try {
      if (cartaoId) {
        await api.put(`/cartao/${cartaoId}`, cartaoData);
      } else {
        await api.post('/cartao', cartaoData);
      }
      setModalVisible(true);
      resetForm();
    } catch (error) {
      console.error("Erro ao salvar o cartão:", error);
      alert('Erro ao salvar o cartão. Verifique os dados enviados.');
    }
  };

  const resetForm = () => {
    setNumeroCartao('');
    setValidade('');
    setNome('');
    setClienteId('');
  };

  return (
    <>
      <CCard>
        <CCardBody>
          <h4>{cartaoId ? 'Editar Cartão' : 'Adicionar Cartão'}</h4>
          <CForm onSubmit={handleSave}>
            <div className="mb-3">
              <CFormLabel htmlFor="numeroCartao">Número do Cartão</CFormLabel>
              <CFormInput
                type="text"
                id="numeroCartao"
                value={numeroCartao}
                onChange={(e) => setNumeroCartao(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <CFormLabel htmlFor="validadeCartao">Validade (MM/AAAA)</CFormLabel>
              <CFormInput
                type="text"
                id="validadeCartao"
                value={validade}
                onChange={(e) => setValidade(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <CFormLabel htmlFor="nomeCartao">Nome</CFormLabel>
              <CFormInput
                type="text"
                id="nomeCartao"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <CFormLabel htmlFor="clienteId">Cliente</CFormLabel>
              <CFormInput
                type="text"
                id="clienteId"
                value={clienteId}
                onChange={(e) => setClienteId(e.target.value)}
                required
              />
            </div>
            <CButton type="submit" color="primary">Salvar</CButton>
          </CForm>
        </CCardBody>
      </CCard>

      <CModal visible={modalVisible} onClose={() => setModalVisible(false)}>
        <CModalHeader>
          <CModalTitle>Sucesso</CModalTitle>
        </CModalHeader>
        <CModalBody>Cartão salvo com sucesso!</CModalBody>
        <CModalFooter>
          <CButton color="primary" onClick={() => setModalVisible(false)}>
            Fechar
          </CButton>
        </CModalFooter>
      </CModal>
    </>
  );
};

export default CartaoAdd;
