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
import ProdutoEstoqueChart from './ProdutoEstoqueChart.js';

const ProdutoEstoqueList = () => {
  const [produtoEstoques, setProdutoEstoques] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [produtoEstoqueSelecionado, setProdutoEstoqueSelecionado] = useState(null);

  const navigate = useNavigate();

  const fetchProdutoEstoques = async () => {
    try {
      const response = await api.get('/produtoEstoque');
      const data = Array.isArray(response.data) ? response.data : [];
      setProdutoEstoques(data);
    } catch (error) {
      console.error('Erro ao buscar produtoEstoques:', error);
      setProdutoEstoques([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProdutoEstoques();
  }, []);

  const handleEdit = (id) => {
    navigate(`/produtoEstoque/add?id=${id}`);
  };

  const handleConfirmDelete = (produtoEstoque) => {
    setProdutoEstoqueSelecionado(produtoEstoque);
    setModalVisible(true);
  };

  const handleDelete = async () => {
    if (produtoEstoqueSelecionado) {
      try {
        await api.delete(`/produtoEstoque/${produtoEstoqueSelecionado.id}`);
        setModalVisible(false);
        setProdutoEstoqueSelecionado(null);
        // Recarregar todos os produtoEstoques para garantir que a tabela esteja atualizada
        fetchProdutoEstoques();
      } catch (error) {
        console.error('Erro ao remover produtoEstoque:', error);
      }
    }
  };

  if (loading) {
    return <div>Carregando...</div>;
  }

  return (
    <CRow>
      <ProdutoEstoqueChart></ProdutoEstoqueChart>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Produto Estoques</strong>
          </CCardHeader>
          <CCardBody>
            <CTable hover>
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell scope="col">ID</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Preço</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Ações</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {produtoEstoques.map((produtoEstoque) => (
                  <CTableRow key={produtoEstoque.id}>
                    <CTableHeaderCell scope="row">{produtoEstoque.id}</CTableHeaderCell>
                    <CTableDataCell>{produtoEstoque.preco}</CTableDataCell>
                    <CTableDataCell>
                      <CButton
                        color="warning"
                        onClick={() => handleEdit(produtoEstoque.id)}
                        className="me-2"
                        style={{ color: 'white' }}
                      >
                        <CIcon icon={cilPencil} /> Editar
                      </CButton>
                      <CButton
                        color="danger"
                        onClick={() => handleConfirmDelete(produtoEstoque)}
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
          Tem certeza de que deseja remover o produtoEstoque "<strong>{produtoEstoqueSelecionado?.preco}</strong>"?
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

export default ProdutoEstoqueList;
