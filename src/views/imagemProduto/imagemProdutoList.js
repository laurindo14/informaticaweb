import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CButton,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
} from '@coreui/react';
import { cilPencil, cilTrash } from '@coreui/icons';
import CIcon from '@coreui/icons-react';
import api from '../../services/axiosConfig';
import ImagemProdutoChart from './ImagemProdutoChart.js';

const ImagemProdutoList = () => {
  const [imagemProdutos, setImagemProdutos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [imagemProdutoSelecionado, setImagemProdutoSelecionado] = useState(null);

  const navigate = useNavigate();

  const fetchImagemProdutos = async () => {
    try {
      const response = await api.get('/imagemProduto');
      const data = Array.isArray(response.data) ? response.data : [];
      setImagemProdutos(data);
    } catch (error) {
      console.error('Erro ao buscar imagens de produto:', error);
      setImagemProdutos([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchImagemProdutos();
  }, []);

  const handleEdit = (id) => {
    navigate(`/imagemProduto/add?id=${id}`);
  };

  const handleConfirmDelete = (imagemProduto) => {
    setImagemProdutoSelecionado(imagemProduto);
    setModalVisible(true);
  };

  const handleDelete = async () => {
    if (imagemProdutoSelecionado) {
      try {
        await api.delete(`/imagemProduto/${imagemProdutoSelecionado.id}`);
        setModalVisible(false);
        setImagemProdutoSelecionado(null);
        // Recarregar todas as imagens de produto para garantir que a tabela esteja atualizada
        fetchImagemProdutos();
      } catch (error) {
        console.error('Erro ao remover imagem de produto:', error);
      }
    }
  };

  if (loading) {
    return <div>Carregando...</div>;
  }

  return (
    <CRow>
      <ImagemProdutoChart></ImagemProdutoChart>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Imagens de Produto</strong>
          </CCardHeader>
          <CCardBody>
            <CTable hover>
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell scope="col">ID</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Endereço do Arquivo</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Ações</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {imagemProdutos.map((imagemProduto) => (
                  <CTableRow key={imagemProduto.id}>
                    <CTableHeaderCell scope="row">{imagemProduto.id}</CTableHeaderCell>
                    <CTableDataCell>{imagemProduto.enderecoArquivo}</CTableDataCell>
                    <CTableDataCell>
                      <CButton
                        color="warning"
                        onClick={() => handleEdit(imagemProduto.id)}
                        className="me-2"
                        style={{ color: 'white' }}
                      >
                        <CIcon icon={cilPencil} /> Editar
                      </CButton>
                      <CButton
                        color="danger"
                        onClick={() => handleConfirmDelete(imagemProduto)}
                        style={{ color: 'white' }}
                      >
                        <CIcon icon={cilTrash} /> Remover
                      </CButton>
                    </CTableDataCell>
                  </CTableRow>
                ))}
              </CTableBody>
            </CTable>
          </CCardBody>
        </CCard>
      </CCol>

      {/* Modal de Confirmação de Exclusão */}
      <CModal visible={modalVisible} onClose={() => setModalVisible(false)}>
        <CModalHeader>
          <CModalTitle>Confirmar Exclusão</CModalTitle>
        </CModalHeader>
        <CModalBody>
          Tem certeza de que deseja remover a imagem de produto "<strong>{imagemProdutoSelecionado?.enderecoArquivo}</strong>"?
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setModalVisible(false)}>
            Cancelar
          </CButton>
          <CButton color="danger" onClick={handleDelete}>
            Confirmar
          </CButton>
        </CModalFooter>
      </CModal>
    </CRow>
  );
};

export default ImagemProdutoList;
