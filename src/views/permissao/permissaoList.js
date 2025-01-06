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
import PermissaoChart from './PermissaoChart.js';

const PermissaoList = () => {
  const [permissoes, setPermissoes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [permissaoSelecionada, setPermissaoSelecionada] = useState(null);

  const navigate = useNavigate();

  const fetchPermissoes = async () => {
    try {
      const response = await api.get('/permissao');
      const data = Array.isArray(response.data) ? response.data : [];
      setPermissoes(data);
    } catch (error) {
      console.error('Erro ao buscar permissões:', error);
      setPermissoes([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPermissoes();
  }, []);

  const handleEdit = (id) => {
    navigate(`/permissao/add?id=${id}`);
  };

  const handleConfirmDelete = (permissao) => {
    setPermissaoSelecionada(permissao);
    setModalVisible(true);
  };

  const handleDelete = async () => {
    if (permissaoSelecionada) {
      try {
        await api.delete(`/permissao/${permissaoSelecionada.id}`);
        setModalVisible(false);
        setPermissaoSelecionada(null);
        // Recarregar todas as permissões para garantir que a tabela esteja atualizada
        fetchPermissoes();
      } catch (error) {
        console.error('Erro ao remover permissão:', error);
      }
    }
  };

  if (loading) {
    return <div>Carregando...</div>;
  }

  return (
    <CRow>
      <PermissaoChart></PermissaoChart>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Permissões</strong>
          </CCardHeader>
          <CCardBody>
            <CTable hover>
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell scope="col">ID</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Nome</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Ações</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {permissoes.map((permissao) => (
                  <CTableRow key={permissao.id}>
                    <CTableHeaderCell scope="row">{permissao.id}</CTableHeaderCell>
                    <CTableDataCell>{permissao.nome}</CTableDataCell>
                    <CTableDataCell>
                      <CButton
                        color="warning"
                        onClick={() => handleEdit(permissao.id)}
                        className="me-2"
                        style={{ color: 'white' }}
                      >
                        <CIcon icon={cilPencil} /> Editar
                      </CButton>
                      <CButton
                        color="danger"
                        onClick={() => handleConfirmDelete(permissao)}
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
          Tem certeza de que deseja remover a permissão "<strong>{permissaoSelecionada?.nome}</strong>"?
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

export default PermissaoList;
