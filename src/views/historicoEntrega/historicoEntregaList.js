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
import HistoricoEntregaChart from './HistoricoEntregaChart.js';

const HistoricoEntregaList = () => {
  const [historicoEntregas, setHistoricoEntregas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [historicoEntregaSelecionado, setHistoricoEntregaSelecionado] = useState(null);

  const navigate = useNavigate();

  const fetchHistoricoEntregas = async () => {
    try {
      const response = await api.get('/historicoEntrega');
      const data = Array.isArray(response.data) ? response.data : [];
      setHistoricoEntregas(data);
    } catch (error) {
      console.error('Erro ao buscar histórico de entregas:', error);
      setHistoricoEntregas([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHistoricoEntregas();
  }, []);

  const handleEdit = (id) => {
    navigate(`/historicoEntrega/add?id=${id}`);
  };

  const handleConfirmDelete = (historicoEntrega) => {
    setHistoricoEntregaSelecionado(historicoEntrega);
    setModalVisible(true);
  };

  const handleDelete = async () => {
    if (historicoEntregaSelecionado) {
      try {
        await api.delete(`/historicoEntrega/${historicoEntregaSelecionado.id}`);
        setModalVisible(false);
        setHistoricoEntregaSelecionado(null);
        // Recarregar todos os históricos de entregas para garantir que a tabela esteja atualizada
        fetchHistoricoEntregas();
      } catch (error) {
        console.error('Erro ao remover histórico de entrega:', error);
      }
    }
  };

  if (loading) {
    return <div>Carregando...</div>;
  }

  return (
    <CRow>
      <HistoricoEntregaChart></HistoricoEntregaChart>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Históricos de Entrega</strong>
          </CCardHeader>
          <CCardBody>
            <CTable hover>
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell scope="col">ID</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Data e Hora</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Mensagem</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Ações</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {historicoEntregas.map((historicoEntrega) => (
                  <CTableRow key={historicoEntrega.id}>
                    <CTableHeaderCell scope="row">{historicoEntrega.id}</CTableHeaderCell>
                    <CTableDataCell>{historicoEntrega.dataHora}</CTableDataCell>
                    <CTableDataCell>{historicoEntrega.mensagem}</CTableDataCell>
                    <CTableDataCell>
                      <CButton
                        color="warning"
                        onClick={() => handleEdit(historicoEntrega.id)}
                        className="me-2"
                        style={{ color: 'white' }}
                      >
                        <CIcon icon={cilPencil} /> Editar
                      </CButton>
                      <CButton
                        color="danger"
                        onClick={() => handleConfirmDelete(historicoEntrega)}
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
          Tem certeza de que deseja remover o histórico de entrega "<strong>{historicoEntregaSelecionado?.dataHora}</strong>"?
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

export default HistoricoEntregaList;
