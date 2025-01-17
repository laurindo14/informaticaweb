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

const CartaoList = () => {
  const [cartoes, setCartoes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [cartaoSelecionado, setCartaoSelecionado] = useState(null);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const fetchCartoes = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.get('/cartao');
      const data = Array.isArray(response.data) ? response.data : [];
      setCartoes(data);
    } catch (error) {
      console.error('Erro ao buscar cartões:', error);
      setError('Não foi possível carregar os cartões.');
      setCartoes([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCartoes();
  }, []);

  const handleEdit = (id) => {
    navigate(`/cartao/add?id=${id}`);
  };

  const handleConfirmDelete = (cartao) => {
    setCartaoSelecionado(cartao);
    setModalVisible(true);
  };

  const handleDelete = async () => {
    if (cartaoSelecionado) {
      try {
        await api.delete(`/cartao/${cartaoSelecionado.id}`);
        setModalVisible(false);
        setCartaoSelecionado(null);
        fetchCartoes();
      } catch (error) {
        console.error('Erro ao remover cartão:', error);
        alert('Erro ao remover o cartão. Tente novamente.');
      }
    }
  };

  if (loading) {
    return <div>Carregando...</div>;
  }

  if (error) {
    return <div className="text-danger">{error}</div>;
  }

  return (
    <CRow>
      {/* Substituir CartaoChart por um componente real ou remover */}
      {/* <CartaoChart /> */}

      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Cartões</strong>
          </CCardHeader>
          <CCardBody>
            <CTable hover>
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell scope="col">ID</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Número do Cartão</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Validade</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Nome</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Ações</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {cartoes.map((cartao) => (
                  <CTableRow key={cartao.id}>
                    <CTableHeaderCell scope="row">{cartao.id}</CTableHeaderCell>
                    <CTableDataCell>{cartao.numeroCartao}</CTableDataCell>
                    <CTableDataCell>{cartao.validade}</CTableDataCell>
                    <CTableDataCell>{cartao.nome}</CTableDataCell>
                    <CTableDataCell>
                      <CButton
                        color="warning"
                        onClick={() => handleEdit(cartao.id)}
                        className="me-2"
                        style={{ color: 'white' }}
                      >
                        <CIcon icon={cilPencil} /> Editar
                      </CButton>
                      <CButton
                        color="danger"
                        onClick={() => handleConfirmDelete(cartao)}
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
          Tem certeza de que deseja remover o cartão "
          <strong>{cartaoSelecionado?.numeroCartao || 'Desconhecido'}</strong>"?
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

export default CartaoList;
