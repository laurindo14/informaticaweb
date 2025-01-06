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

const ProdutoEstoqueAdd = () => {
  const [produtoId, setProdutoId] = useState('');
  const [preco, setPreco] = useState('');
  const [estoqueId, setEstoqueId] = useState('');
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const produtoEstoqueId = searchParams.get('id');
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    if (produtoEstoqueId) {
      const fetchProdutoEstoque = async () => {
        try {
          const response = await api.get(`/produtoEstoque/${produtoEstoqueId}`);
          const { preco } = response.data;
          setProdutoId(produto?.id || '');
          setPreco(preco);
          setEstoqueId(estoque?.id || '');
        } catch (error) {
          console.error('Erro ao buscar produto no estoque:', error);
        }
      };
      fetchProdutoEstoque();
    }
  }, [produtoEstoqueId]);

  const handleSave = async (e) => {
    e.preventDefault();
    const produtoEstoqueData = {
      produto: { id: produtoId },
      preco,
      estoque: { id: estoqueId },
    };
    try {
      if (produtoEstoqueId) {
        await api.put(`/produtoEstoque/${produtoEstoqueId}`, produtoEstoqueData);
      } else {
        await api.post('/produtoEstoque', produtoEstoqueData);
      }
      setModalVisible(true);
      resetForm();
    } catch (error) {
      console.error('Erro ao salvar o produto no estoque:', error);
      alert('Erro ao salvar o produto no estoque');
    }
  };

  const resetForm = () => {
    setProdutoId('');
    setPreco('');
    setEstoqueId('');
  };

  return (
    <>
      <CCard>
        <CCardBody>
          <h4>{produtoEstoqueId ? 'Editar Produto no Estoque' : 'Adicionar Produto ao Estoque'}</h4>
          <CForm onSubmit={handleSave}>
            <div className="mb-3">
              <CFormLabel htmlFor="preco">Preço</CFormLabel>
              <CFormInput
                type="number"
                id="preco"
                value={preco}
                onChange={(e) => setPreco(e.target.value)}
                required
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
        <CModalBody>Produto no estoque salvo com sucesso!</CModalBody>
        <CModalFooter>
          <CButton color="primary" onClick={() => setModalVisible(false)}>
            Fechar
          </CButton>
        </CModalFooter>
      </CModal>
    </>
  );
};

export default ProdutoEstoqueAdd;
