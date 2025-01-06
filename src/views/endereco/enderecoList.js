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

const EnderecoList = () => {
  const [enderecos, setEnderecos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [enderecoSelecionado, setEnderecoSelecionado] = useState(null);

  const navigate = useNavigate();

  const fetchEnderecos = async () => {
    try {
      const response = await api.get('/endereco');
      const data = Array.isArray(response.data) ? response.data : [];
      setEnderecos(data);
    } catch (error) {
      console.error('Erro ao buscar enderecos:', error);
      setEnderecos([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEnderecos();
  }, []);

  const handleEdit = (id) => {
    navigate(`/endereco/add?id=${id}`);
  };

  const handleConfirmDelete = (endereco) => {
    setEnderecoSelecionado(endereco);
    setModalVisible(true);
  };

  const handleDelete = async () => {
    if (enderecoSelecionado) {
      try {
        await api.delete(`/endereco/${enderecoSelecionado.id}`);
        setModalVisible(false);
        setEnderecoSelecionado(null);
        fetchEnderecos();
      } catch (error) {
        console.error('Erro ao remover endereco:', error);
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
            <strong>Endereços</strong>
          </CCardHeader>
          <CCardBody>
            <CTable hover>
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell scope="col">ID</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Logradouro</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Número</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Complemento</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Bairro</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Cidade</CTableHeaderCell>
                  <CTableHeaderCell scope="col">UF</CTableHeaderCell>
                  <CTableHeaderCell scope="col">CEP</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Cliente</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Ações</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {enderecos.map((endereco) => (
                  <CTableRow key={endereco.id}>
                    <CTableHeaderCell scope="row">{endereco.id}</CTableHeaderCell>
                    <CTableDataCell>{endereco.logradouro}</CTableDataCell>
                    <CTableDataCell>{endereco.numero}</CTableDataCell>
                    <CTableDataCell>{endereco.complemento}</CTableDataCell>
                    <CTableDataCell>{endereco.bairro}</CTableDataCell>
                    <CTableDataCell>{endereco.cidade}</CTableDataCell>
                    <CTableDataCell>{endereco.uf}</CTableDataCell>
                    <CTableDataCell>{endereco.cep}</CTableDataCell>
                    {/* Verifique se endereco.cliente é um objeto ou string */}
                    <CTableDataCell>{endereco.cliente ? endereco.cliente.nome : 'N/A'}</CTableDataCell>
                    <CTableDataCell>
                      <CButton
                        color="warning"
                        onClick={() => handleEdit(endereco.id)}
                        className="me-2"
                        style={{ color: 'white' }}
                      >
                        <CIcon icon={cilPencil} /> Editar
                      </CButton>
                      <CButton
                        color="danger"
                        onClick={() => handleConfirmDelete(endereco)}
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
          Tem certeza de que deseja remover o endereço "<strong>{enderecoSelecionado?.logradouro}</strong>"?
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

export default EnderecoList;
