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

const UsuarioList = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [usuarioSelecionado, setusuarioSelecionado] = useState(null);

  const navigate = useNavigate();

  const fetchUsuarios = async () => {
    try {
      const response = await api.get('/usuario');
      const data = Array.isArray(response.data) ? response.data : [];
      setUsuarios(data);
    } catch (error) {
      console.error('Erro ao buscar usuarios:', error);
      setUsuarios([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsuarios();
  }, []);

  const handleEdit = (id) => {
    navigate(`/usuario/add?id=${id}`);
  };

  const handleConfirmDelete = (usuario) => {
    setusuarioSelecionado(usuario);
    setModalVisible(true);
  };

  const handleDelete = async () => {
    if (usuarioSelecionado) {
      try {
        await api.delete(`/usuario/${usuarioSelecionado.id}`);
        setModalVisible(false);
        setusuarioSelecionado(null);
        fetchUsuarios(); // Atualiza a lista após exclusão
      } catch (error) {
        console.error('Erro ao remover usuario:', error);
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
            <strong>Usuários</strong>
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
                  <CTableHeaderCell scope="col">Permissão</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Ações</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {usuarios.map((usuario) => (
                  <CTableRow key={usuario.id}>
                    <CTableHeaderCell scope="row">{usuario.id}</CTableHeaderCell>
                    <CTableDataCell>{usuario.cpf}</CTableDataCell>
                    <CTableDataCell>{usuario.email}</CTableDataCell>
                    <CTableDataCell>{usuario.login}</CTableDataCell>
                    <CTableDataCell>{usuario.nome}</CTableDataCell>
                    <CTableDataCell>{usuario.rg}</CTableDataCell>
                    <CTableDataCell>{usuario.telefone}</CTableDataCell>
                    <CTableDataCell>{usuario.permissao?.nome}</CTableDataCell>
                    <CTableDataCell>
                      <CButton
                        color="warning"
                        onClick={() => handleEdit(usuario.id)}
                        className="me-2"
                        style={{ color: 'white' }}
                      >
                        <CIcon icon={cilPencil} /> Editar
                      </CButton>
                      <CButton
                        color="danger"
                        onClick={() => handleConfirmDelete(usuario)}
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
          Tem certeza de que deseja remover o usuário "<strong>{usuarioSelecionado?.nome}</strong>"?
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

export default UsuarioList;