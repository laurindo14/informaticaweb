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
  CFormSelect,
} from '@coreui/react';
import api from '../../services/axiosConfig';
import { useLocation } from 'react-router-dom';

const ItemVendaAdd = () => {
  const [quantidade, setQuantidade] = useState('');
  const [precoUnitario, setPrecoUnitario] = useState('');
  const [produtoEstoqueId, setProdutoEstoqueId] = useState('');
  const [entregaId, setEntregaId] = useState('');
  const [vendaId, setVendaId] = useState('');
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const itemVendaId = searchParams.get('id');
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    if (itemVendaId) {
      const fetchItemVenda = async () => {
        try {
          const response = await api.get(`/itemVenda/${itemVendaId}`);
          const { quantidade, precoUnitario } = response.data;
          setQuantidade(quantidade);
          setPrecoUnitario(precoUnitario);
          setProdutoEstoqueId(produtoEstoqueId);
          setEntregaId(entregaId);
          setVendaId(vendaId);
        } catch (error) {
          console.error("Erro ao buscar item de venda:", error);
        }
      };
      fetchItemVenda();
    }
  }, [itemVendaId]);

  const handleSave = async (e) => {
    e.preventDefault();
    const itemVendaData = {
      quantidade,
      precoUnitario,
      produtoEstoqueId,
      entregaId,
      vendaId,
    };
    try {
      if (itemVendaId) {
        await api.put(`/itemVenda/${itemVendaId}`, itemVendaData);
      } else {
        await api.post('/itemVenda', itemVendaData);
      }
      setModalVisible(true);
      resetForm();
    } catch (error) {
      console.error("Erro ao salvar o item de venda:", error);
      alert('Erro ao salvar o item de venda');
    }
  };

  const resetForm = () => {
    setQuantidade('');
    setPrecoUnitario('');
    setProdutoEstoqueId('');
    setEntregaId('');
    setVendaId('');
  };

  return (
    <>
      <CCard>
        <CCardBody>
          <h4>{itemVendaId ? 'Editar Item de Venda' : 'Adicionar Item de Venda'}</h4>
          <CForm onSubmit={handleSave}>
            <div className="mb-3">
              <CFormLabel htmlFor="quantidadeItemVenda">Quantidade</CFormLabel>
              <CFormInput
                type="number"
                id="quantidade"
                value={quantidade}
                onChange={(e) => setQuantidade(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <CFormLabel htmlFor="precoUnitarioItemVenda">Preço Unitário</CFormLabel>
              <CFormInput
                type="number"
                step="0.01"
                id="precoUnitario"
                value={precoUnitario}
                onChange={(e) => setPrecoUnitario(e.target.value)}
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
        <CModalBody>Item de venda salvo com sucesso!</CModalBody>
        <CModalFooter>
          <CButton color="primary" onClick={() => setModalVisible(false)}>
            Fechar
          </CButton>
        </CModalFooter>
      </CModal>
    </>
  );
};

export default ItemVendaAdd;
