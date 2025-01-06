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

const ProdutoFornecedorAdd = () => {
  const [produtoId, setProdutoId] = useState('');
  const [precoProduto, setPrecoProduto] = useState('');
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const produtoFornecedorId = searchParams.get('id');
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    if (produtoFornecedorId) {
      const fetchProdutoFornecedor = async () => {
        try {
          const response = await api.get(`/produtoFornecedor/${produtoFornecedorId}`);
          const { produto, precoProduto } = response.data;
          setProdutoId(produtoId);
          setPrecoProduto(precoProduto);
        } catch (error) {
          console.error('Erro ao buscar produto do fornecedor:', error);
        }
      };
      fetchProdutoFornecedor();
    }
  }, [produtoFornecedorId]);

  const handleSave = async (e) => {
    e.preventDefault();
    const produtoFornecedorData = {
      produto: { id: produtoId },
      precoProduto,
    };
    try {
      if (produtoFornecedorId) {
        await api.put(`/produtoFornecedor/${produtoFornecedorId}`, produtoFornecedorData);
      } else {
        await api.post('/produtoFornecedor', produtoFornecedorData);
      }
      setModalVisible(true);
      resetForm();
    } catch (error) {
      console.error('Erro ao salvar o produto do fornecedor:', error);
      alert('Erro ao salvar o produto do fornecedor');
    }
  };

  const resetForm = () => {
    setProdutoId('');
    setPrecoProduto('');
  };

  return (
    <>
      <CCard>
        <CCardBody>
          <h4>{produtoFornecedorId ? 'Editar Produto do Fornecedor' : 'Adicionar Produto ao Fornecedor'}</h4>
          <CForm onSubmit={handleSave}>
            <div className="mb-3">
              <CFormLabel htmlFor="precoProduto">Preço do Produto</CFormLabel>
              <CFormInput
                type="number"
                id="precoProduto"
                value={precoProduto}
                onChange={(e) => setPrecoProduto(e.target.value)}
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
        <CModalBody>Produto do fornecedor salvo com sucesso!</CModalBody>
        <CModalFooter>
          <CButton color="primary" onClick={() => setModalVisible(false)}>
            Fechar
          </CButton>
        </CModalFooter>
      </CModal>
    </>
  );
};

export default ProdutoFornecedorAdd;
