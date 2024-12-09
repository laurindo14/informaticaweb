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

const AvaliacaoProdutoAdd = () => {
  const [nota, setNota] = useState('');
  const [descricao, setDescricao] = useState('');
  const [itemVendaId, setItemVendaId] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const location = useLocation();

 
  useEffect(() => {
    if (avaliacaoProdutoId) {
      const fetchAvaliacaoProduto = async () => {
        try {
          const response = await api.get(`/avaliacaoProduto/${avaliacaoProdutoId}`);
          const { nota, descricao } = response.data;
          setNota(nota);
          setDescricao(descricao);
        } catch (error) {
          console.error("Erro ao carregar os dados da avaliação do produto:", error);
        }
      };
      fetchAvaliacaoProduto();
    }
  }, [avaliacaoProdutoId]);
  const handleSave = async (e) => {
    e.preventDefault();
    const avaliacaoProdutoData = {
      nota,
      descricao,
      itemVenda: itemVendaId,
    };

    try {
      if (avaliacaoProdutoId) {
        await api.put(`/avaliacaoProduto/${avaliacaoProdutoId}`, avaliacaoProdutoData);
      } else {
        await api.post('/avaliacaoProduto', avaliacaoProdutoData);
      }
      setModalVisible(true);
      resetFrom();
    } catch (error) {
      console.error("Erro ao salvar a avaliação do produto:", error);
      alert('Erro ao salvar a avaliação do produto');
    }
  };

  const resetForm = () => {
    setNota('');
    setDescricao('');
    setItemVendaId('');
  }

  return (
    <>
      <CCard>
        <CCardBody>
          <h4>{avaliacaoProdutoId ? 'Editar Avaliação do Produto' : 'Adicionar Avaliação do Produto'}</h4>
          <CForm onSubmit={handleSave}>
            <div className="mb-3">
              <CFormLabel htmlFor="notaAvaliacaoProduto">Nota</CFormLabel>
              <CFormInput
                type="text"
                id="nota"
                value={nota}
                onChange={(e) => setNota(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <CFormLabel htmlFor="descricaoAvaliacaoProduto">Descricao</CFormLabel>
              <CFormInput
                type="text"
                id="descricao"
                value={descricao}
                onChange={(e) => setDescricao(e.target.value)}
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
        <CModalBody>Avaliação do Produto salva com sucesso!</CModalBody>
        <CModalFooter>
          <CButton color="primary" onClick={() => setModalVisible(false)}>
            Fechar
          </CButton>
        </CModalFooter>
      </CModal>
    </>
  );
};

export default AvaliacaoProdutoAdd;
