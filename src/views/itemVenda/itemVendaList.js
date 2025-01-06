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
import ItemVendaChart from './ItemVendaChart.js';

const ItemVendaList = () => {
  const [itemVendas, setItemVendas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [itemVendaSelecionado, setItemVendaSelecionado] = useState(null);

  const navigate = useNavigate();

  const fetchItemVendas = async () => {
    try {
      const response = await api.get('/itemVenda');
      const data = Array.isArray(response.data) ? response.data : [];
      setItemVendas(data);
    } catch (error) {
      console.error('Erro ao buscar itens de venda:', error);
      setItemVendas([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItemVendas();
  }, []);

  const handleEdit = (id) => {
    navigate(`/itemVenda/add?id=${id}`);
  };

  const handleConfirmDelete = (itemVenda) => {
    setItemVendaSelecionado(itemVenda);
    setModalVisible(true);
  };

  const handleDelete = async () => {
    if (itemVendaSelecionado) {
      try {
        await api.delete(`/itemVenda/${itemVendaSelecionado.id}`);
        setModalVisible(false);
        setItemVendaSelecionado(null);
        // Recarregar todos os itens de venda para garantir que a tabela esteja atualizada
        fetchItemVendas();
      } catch (error) {
        console.error('Erro ao remover item de venda:', error);
      }
    }
  };

  if (loading) {
    return <div>Carregando...</div>;
  }

  return (
    <CRow>
      <ItemVendaChart></ItemVendaChart>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Itens de Venda</strong>
          </CCardHeader>
          <CCardBody>
            <CTable hover>
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell scope="col">ID</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Preço Unitário</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Quantidade</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Ações</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {itemVendas.map((itemVenda) => (
                  <CTableRow key={itemVenda.id}>
                    <CTableHeaderCell scope="row">{itemVenda.id}</CTableHeaderCell>
                    <CTableDataCell>{itemVenda.precoUnitario}</CTableDataCell>
                    <CTableDataCell>{itemVenda.quantidade}</CTableDataCell>
                    <CTableDataCell>
                      <CButton
                        color="warning"
                        onClick={() => handleEdit(itemVenda.id)}
                        className="me-2"
                        style={{ color: 'white' }}
                      >
                        <CIcon icon={cilPencil} /> Editar
                      </CButton>
                      <CButton
                        color="danger"
                        onClick={() => handleConfirmDelete(itemVenda)}
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
          Tem certeza de que deseja remover o item de venda "<strong>{itemVendaSelecionado?.precoUnitario}</strong>"?
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

export default ItemVendaList;
