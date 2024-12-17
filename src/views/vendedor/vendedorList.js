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

const VendedorList = () => {
  const [vendedores, setVendedores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [vendedorSelecionado, setVendedorSelecionado] = useState(null);

  const navigate = useNavigate();

  const fetchVendedores = async () => {
    try {
      const response = await api.get('/vendedor');
      const data = Array.isArray(response.data) ? response.data : [];
      setVendedores(data);
    } catch (error) {
      console.error('Erro ao buscar vendedores:', error);
      setVendedores([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVendedores();
  }, []);

  const handleEdit = (id) => {
    navigate(`/vendedor/add?id=${id}`);
  };

  const handleConfirmDelete = (vendedor) => {
    setVendedorSelecionado(vendedor);
    setModalVisible(true);
  };

  const handleDelete = async () => {
    if (vendedorSelecionado) {
      try {
        await api.delete(`/vendedor/${vendedorSelecionado.id}`);
        setModalVisible(false);
        setVendedorSelecionado(null);
        fetchVendedores(); // Atualiza a lista após exclusão
      } catch (error) {
        console.error('Erro ao remover vendedor:', error);
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
            <strong>Vendedores</strong>
          </CCardHeader>
          <CCardBody>
            <CTable hover>
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell scope="col">ID</CTableHeaderCell>
                  <CTableHeaderCell scope="col">CPF</CTableHeaderCell>
                  <CTableHeaderCell scope="col">E-mail</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Login</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Nome</CTableHeaderCell>
                  <CTableHeaderCell scope="col">RG</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Telefone</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Ações</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {vendedores.map((vendedor) => (
                  <CTableRow key={vendedor.id}>
                    <CTableHeaderCell scope="row">{vendedor.id}</CTableHeaderCell>
                    <CTableDataCell>{vendedor.cpf}</CTableDataCell>
                    <CTableDataCell>{vendedor.email}</CTableDataCell>
                    <CTableDataCell>{vendedor.login}</CTableDataCell>
                    <CTableDataCell>{vendedor.nome}</CTableDataCell>
                    <CTableDataCell>{vendedor.rg}</CTableDataCell>
                    <CTableDataCell>{vendedor.telefone}</CTableDataCell>
                    <CTableDataCell>
                      <CButton
                        color="warning"
                        onClick={() => handleEdit(vendedor.id)}
                        className="me-2"
                        style={{ color: 'white' }}
                      >
                        <CIcon icon={cilPencil} /> Editar
                      </CButton>
                      <CButton
                        color="danger"
                        onClick={() => handleConfirmDelete(vendedor)}
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
          Tem certeza de que deseja remover o vendedor "<strong>{vendedorSelecionado?.nome}</strong>"?
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

export default VendedorList;
