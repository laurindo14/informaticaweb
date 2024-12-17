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

const EntregaList = () => {
  const [entregas, setEntregas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [entregaSelecionada, setEntregaSelecionada] = useState(null);

  const navigate = useNavigate();

  const fetchEntregas = async () => {
    try {
      const response = await api.get('/entrega'); // Rota de busca de entregas
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
        fetchEntregas(); // Atualiza a lista após exclusão
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
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Lista de Entregas</strong>
          </CCardHeader>
          <CCardBody>
            <CTable hover>
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell scope="col">ID</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Nome</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Número da Entrega</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Validade</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Cliente ID</CTableHeaderCell>
                  <CTableHeaderCell scope="col">CVC</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Ações</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {entregas.map((entrega) => (
                  <CTableRow key={entrega.id}>
                    <CTableHeaderCell scope="row">{entrega.id}</CTableHeaderCell>
                    <CTableDataCell>{entrega.nome}</CTableDataCell>
                    <CTableDataCell>{entrega.numeroEntrega}</CTableDataCell>
                    <CTableDataCell>{entrega.validade}</CTableDataCell>
                    <CTableDataCell>{entrega.cliente_id}</CTableDataCell>
                    <CTableDataCell>{entrega.cvc}</CTableDataCell>
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
          Tem certeza de que deseja remover a entrega "<strong>{entregaSelecionada?.nome}</strong>"?
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
