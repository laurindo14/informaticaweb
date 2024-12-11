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
import TransportadoraChart from './TransportadoraChart.js';

const TransportadoraList = () => {
  const [transportadoras, setTransportadoras] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [transportadoraSelecionada, setTransportadoraSelecionada] = useState(null);

  const navigate = useNavigate();

  const fetchTransportadoras = async () => {
    try {
      const response = await api.get('/transportadora');
      const data = Array.isArray(response.data) ? response.data : [];
      setTransportadoras(data);
    } catch (error) {
      console.error('Erro ao buscar transportadoras:', error);
      setTransportadoras([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransportadoras();
  }, []);

  const handleEdit = (id) => {
    navigate(`/transportadora/add?id=${id}`);
  };

  const handleConfirmDelete = (transportadora) => {
    setTransportadoraSelecionada(transportadora);
    setModalVisible(true);
  };

  const handleDelete = async () => {
    if (transportadoraSelecionada) {
      try {
        await api.delete(`/transportadora/${transportadoraSelecionada.id}`);
        setModalVisible(false);
        setTransportadoraSelecionada(null);
        // Recarregar todas as transportadoras para garantir que a tabela esteja atualizada
        fetchTransportadoras();
      } catch (error) {
        console.error('Erro ao remover transportadora:', error);
      }
    }
  };

  if (loading) {
    return <div>Carregando...</div>;
  }

  return (
    <CRow>
      <TransportadoraChart></TransportadoraChart>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Transportadoras</strong>
          </CCardHeader>
          <CCardBody>
            <CTable hover>
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell scope="col">ID</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Logradouro</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Numero</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Complemento</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Bairro</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Cidade</CTableHeaderCell>
                  <CTableHeaderCell scope="col">uf</CTableHeaderCell>
                  <CTableHeaderCell scope="col">cep</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {transportadoras.map((transportadora) => (
                  <CTableRow key={transportadora.id}>
                    <CTableHeaderCell scope="row">{transportadora.id}</CTableHeaderCell>
                    <CTableDataCell>{transportadora.nome}</CTableDataCell>
                    <CTableDataCell>
                      {transportadora.transportadora ? transportadora.transportadora.nome : 'N/A'}
                    </CTableDataCell>
                    <CTableDataCell>
                      <CButton
                        color="warning"
                        onClick={() => handleEdit(transportadora.id)}
                        className="me-2"
                        style={{ color: 'white' }}
                      >
                        <CIcon icon={cilPencil} /> Editar
                      </CButton>
                      <CButton
                        color="danger"
                        onClick={() => handleConfirmDelete(transportadora)}
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
          Tem certeza de que deseja remover a transportadora "<strong>{transportadoraSelecionada?.nome}</strong>"?
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

export default TransportadoraList;
