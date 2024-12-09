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
  CFormTextarea,
} from '@coreui/react';
import api from '../../services/axiosConfig';
import { useLocation } from 'react-router-dom';

const ProdutoAdd = () => {
  const [nome, setNome] = useState('');
  const [fichaTecnica, setFichaTecnica] = useState('');
  const [estoque, setEstoque] = useState('');
  const [categoriaId, setCategoriaId] = useState('');
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const produtoId = searchParams.get('id');
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    if (produtoId) {
      const fetchProduto = async () => {
        try {
          const response = await api.get(`/produto/${produtoId}`);
          const { nome, fichaTecnica, estoque } = response.data;
          setNome(nome);
          setFichaTecnica(fichaTecnica);
          setEstoque(estoque);
          setCategoriaId(categoria?.id || '');
        } catch (error) {
          console.error('Erro ao buscar produto:', error);
        }
      };
      fetchProduto();
    }
  }, [produtoId]);

  const handleSave = async (e) => {
    e.preventDefault();
    const produtoData = {
      nome,
      fichaTecnica,
      estoque,
      categoriaId
    };
    try {
      if (produtoId) {
        await api.put(`/produto/${produtoId}`, produtoData);
      } else {
        await api.post('/produto', produtoData);
      }
      setModalVisible(true);
      resetForm();
    } catch (error) {
      console.error('Erro ao salvar o produto:', error);
      alert('Erro ao salvar o produto');
    }
  };

  const resetForm = () => {
    setNome('');
    setFichaTecnica('');
    setEstoque('');
    setCategoriaId('');
  };

  return (
    <>
      <CCard>
        <CCardBody>
          <h4>{produtoId ? 'Editar Produto' : 'Adicionar Produto'}</h4>
          <CForm onSubmit={handleSave}>
            <div className="mb-3">
              <CFormLabel htmlFor="nomeProduto">Nome</CFormLabel>
              <CFormInput
                type="text"
                id="nome"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <CFormLabel htmlFor="fichaTecnicaProduto">Ficha Técnica</CFormLabel>
              <CFormTextarea
                id="fichaTecnica"
                value={fichaTecnica}
                onChange={(e) => setFichaTecnica(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <CFormLabel htmlFor="estoqueProduto">Estoque</CFormLabel>
              <CFormInput
                type="number"
                id="estoque"
                value={estoque}
                onChange={(e) => setEstoque(e.target.value)}
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
        <CModalBody>Produto salvo com sucesso!</CModalBody>
        <CModalFooter>
          <CButton color="primary" onClick={() => setModalVisible(false)}>
            Fechar
          </CButton>
        </CModalFooter>
      </CModal>
    </>
  );
};

export default ProdutoAdd;
