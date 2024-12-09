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

const ImagemProdutoAdd = () => {
  const [enderecoArquivo, setEnderecoArquivo] = useState('');
  const [produtoId, setProdutoId] = useState('');
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const imagemProdutoId = searchParams.get('id');
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    if (imagemProdutoId) {
      const fetchImagemProduto = async () => {
        try {
          const response = await api.get(`/imagemProduto/${imagemProdutoId}`);
          const { enderecoArquivo } = response.data;
          setEnderecoArquivo(enderecoArquivo);
          setProdutoId(produto);
        } catch (error) {
          console.error("Erro ao buscar imagem do produto:", error);
        }
      };
      fetchImagemProduto();
    }
  }, [imagemProdutoId]);

  const handleSave = async (e) => {
    e.preventDefault();
    const imagemProdutoData = {
      enderecoArquivo,
      produtoId,
    };
    try {
      if (imagemProdutoId) {
        await api.put(`/imagemProduto/${imagemProdutoId}`, imagemProdutoData);
      } else {
        await api.post('/imagemProduto', imagemProdutoData);
      }
      setModalVisible(true);
      resetForm();
    } catch (error) {
      console.error("Erro ao salvar a imagem do produto:", error);
      alert('Erro ao salvar a imagem do produto');
    }
  };

  const resetForm = () => {
    setEnderecoArquivo('');
    setProdutoId('');
  };

  return (
    <>
      <CCard>
        <CCardBody>
          <h4>{imagemProdutoId ? 'Editar Imagem do Produto' : 'Adicionar Imagem do Produto'}</h4>
          <CForm onSubmit={handleSave}>
            <div className="mb-3">
              <CFormLabel htmlFor="enderecoArquivoImagemProduto">Endereço do Arquivo</CFormLabel>
              <CFormInput
                type="text"
                id="enderecoArquivo"
                value={enderecoArquivo}
                onChange={(e) => setEnderecoArquivo(e.target.value)}
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
        <CModalBody>Imagem do produto salva com sucesso!</CModalBody>
        <CModalFooter>
          <CButton color="primary" onClick={() => setModalVisible(false)}>
            Fechar
          </CButton>
        </CModalFooter>
      </CModal>
    </>
  );
};

export default ImagemProdutoAdd;
