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
import EntregaChart from './EntregaChart.js';

const EntregaList = () => {
  const [entregas, setEntregas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [entregaSelecionada, setEntregaSelecionada] = useState(null);

  const navigate = useNavigate();

  const fetchEntregas = async () => {
    try {
      const response = await api.get('/entrega');
      const data = Array.isArray(response.data) ? response.data : [];
      setEntregas(data);
    } catch (error) {
      console.error('Erro ao buscar entregas:', error);
      setEntregas([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEntregas();
  }, []);

  const handleEdit = (id) => {
    navigate(`/entrega/add?id=${id}`);
  };

  const handleConfirmDelete = (entrega) => {
    setEntregaSelecionada(entrega);
    setModalVisible(true);
  };

  const handleDelete = async () => {
    if (entregaSelecionada) {
      try {
        await api.delete(`/entrega/${entregaSelecionada.id}`);
        setModalVisible(false);
        setEntregaSelecionada(null);
        // Recarregar todos os entregas para garantir que a tabela esteja atualizada
        fetchEntregas();
      } catch (error) {
        console.error('Erro ao remover entrega:', error);
      }
    }
  };

  if (loading) {
    return <div>Carregando...</div>;
  }

  return (
    <CRow>
      <EntregaChart></EntregaChart>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Entregas</strong>
          </CCardHeader>
          <CCardBody>
            <CTable hover>
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell scope="col">ID</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Quantidade</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Código de Rastreamento</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Ações</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {entregas.map((entrega) => (
                  <CTableRow key={entrega.id}>
                    <CTableHeaderCell scope="row">{entrega.id}</CTableHeaderCell>
                    <CTableDataCell>{entrega.quantidade}</CTableDataCell>
                    <CTableDataCell>{entrega.codigoRastreio}</CTableDataCell>
                    <CTableDataCell>
                      <CButton
                        color="warning"
                        onClick={() => handleEdit(entrega.id)}
                        className="me-2"
                        style={{ color: 'white' }}
                      >
                        <CIcon icon={cilPencil} /> Editar
                      </CButton>
                      <CButton
                        color="danger"
                        onClick={() => handleConfirmDelete(entrega)}
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
          Tem certeza de que deseja remover a entrega "<strong>{entregaSelecionada?.quantidade}</strong>"?
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

export default EntregaList;
