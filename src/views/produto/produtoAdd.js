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

const ProdutoAdd = () => {
  const [nome, setNome] = useState('');
  const [estoque, setEstoque] = useState('');
  const [fichaTecnica, setFichaTecnica] = useState('');
  const [categoriaId, setCategoriaId] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const produtoId = searchParams.get('id');

  useEffect(() => {
    if (produtoId) {
      const fetchProduto = async () => {
        try {
          const response = await api.get(`/produto/${produtoId}`);
          const { nome, estoque, fichaTecnica, categoria_id } = response.data;
          setNome(nome);
          setEstoque(estoque);
          setFichaTecnica(fichaTecnica);
          setCategoriaId(categoria_id);
        } catch (error) {
          console.error("Erro ao carregar produto:", error);
        }
      };
      fetchProduto();
    }
  }, [produtoId]);

  const handleSave = async (e) => {
    e.preventDefault();

    const produtoData = {
      nome,
      estoque,
      fichaTecnica,
      categoria_id: categoriaId,
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
      console.error("Erro ao salvar o produto:", error);
      alert('Erro ao salvar o produto');
    }
  };

  const resetForm = () => {
    setNome('');
    setEstoque('');
    setFichaTecnica('');
    setCategoriaId('');
  };

  return (
    <>
      <CCard>
        <CCardBody>
          <h4>{produtoId ? 'Editar Produto' : 'Adicionar Produto'}</h4>
          <CForm onSubmit={handleSave}>
            <div className="mb-3">
              <CFormLabel htmlFor="nomeProduto">Nome do Produto</CFormLabel>
              <CFormInput
                type="text"
                id="nomeProduto"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <CFormLabel htmlFor="estoqueProduto">Estoque</CFormLabel>
              <CFormInput
                type="number"
                id="estoqueProduto"
                value={estoque}
                onChange={(e) => setEstoque(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <CFormLabel htmlFor="fichaTecnica">Ficha Técnica</CFormLabel>
              <CFormInput
                type="text"
                id="fichaTecnica"
                value={fichaTecnica}
                onChange={(e) => setFichaTecnica(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <CFormLabel htmlFor="categoriaId">Categoria ID</CFormLabel>
              <CFormInput
                type="number"
                id="categoriaId"
                value={categoriaId}
                onChange={(e) => setCategoriaId(e.target.value)}
                required
              />
            </div>
            <CButton type="submit" color="primary">Salvar</CButton>
          </CForm>
        </CCardBody>
      </CCard>

      {/* Modal de Confirmação */}
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
