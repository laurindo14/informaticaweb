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
import AvaliacaoProdutoChart from './AvaliacaoProdutoChart.js';

const AvaliacaoProdutoList = () => {
  const [avaliacoesProduto, setAvaliacoesProduto] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [avaliacaoProdutoSelecionada, setAvaliacaoProdutoSelecionada] = useState(null);

  const navigate = useNavigate();

  const fetchAvaliacoesProduto = async () => {
    try {
      const response = await api.get('/avaliacaoProduto');
      const data = Array.isArray(response.data) ? response.data : [];
      setAvaliacoesProduto(data);
    } catch (error) {
      console.error('Erro ao buscar avaliacoesProduto:', error);
      setAvaliacoesProduto([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAvaliacoesProduto();
  }, []);

  const handleEdit = (id) => {
    navigate(`/avaliacaoProduto/add?id=${id}`);
  };

  const handleConfirmDelete = (avaliacaoProduto) => {
    setAvaliacaoProdutoSelecionada(avaliacaoProduto);
    setModalVisible(true);
  };

  const handleDelete = async () => {
    if (avaliacaoProdutoSelecionada) {
      try {
        await api.delete(`/avaliacaoProduto/${avaliacaoProdutoSelecionada.id}`);
        setModalVisible(false);
        setAvaliacaoProdutoSelecionada(null);
        // Recarregar todas as avaliacoesProduto para garantir que a tabela esteja atualizada
        fetchAvaliacoesProduto();
      } catch (error) {
        console.error('Erro ao remover avaliacaoProduto:', error);
      }
    }
  };

  if (loading) {
    return <div>Carregando...</div>;
  }

  return (
    <CRow>
      <AvaliacaoProdutoChart></AvaliacaoProdutoChart>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Avaliações de Produto</strong>
          </CCardHeader>
          <CCardBody>
            <CTable hover>
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell scope="col">ID</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Nota</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Descrição</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Ações</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {avaliacoesProduto.map((avaliacaoProduto) => (
                  <CTableRow key={avaliacaoProduto.id}>
                    <CTableHeaderCell scope="row">{avaliacaoProduto.id}</CTableHeaderCell>
                    <CTableDataCell>{avaliacaoProduto.nota}</CTableDataCell>
                    <CTableDataCell>{avaliacaoProduto.descricao}</CTableDataCell>
                    <CTableDataCell>
                      <CButton
                        color="warning"
                        onClick={() => handleEdit(avaliacaoProduto.id)}
                        className="me-2"
                        style={{ color: 'white' }}
                      >
                        <CIcon icon={cilPencil} /> Editar
                      </CButton>
                      <CButton
                        color="danger"
                        onClick={() => handleConfirmDelete(avaliacaoProduto)}
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
          Tem certeza de que deseja remover a avaliação de produto "<strong>{avaliacaoProdutoSelecionada?.descricao}</strong>"?
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

export default AvaliacaoProdutoList;
