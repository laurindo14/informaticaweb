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

const ProdutoFornecedorList = () => {
  const [produtosFornecedores, setProdutosFornecedores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [produtoFornecedorSelecionado, setProdutoFornecedorSelecionado] = useState(null);

  const navigate = useNavigate();

  const fetchProdutosFornecedores = async () => {
    try {
      const response = await api.get('/produtoFornecedor');
      const data = Array.isArray(response.data) ? response.data : [];
      setProdutosFornecedores(data);
    } catch (error) {
      console.error('Erro ao buscar produtos fornecedores:', error);
      setProdutosFornecedores([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProdutosFornecedores();
  }, []);

  const handleEdit = (id) => {
    navigate(`/produtoFornecedor/add?id=${id}`);
  };

  const handleConfirmDelete = (produtoFornecedor) => {
    setProdutoFornecedorSelecionado(produtoFornecedor);
    setModalVisible(true);
  };

  const handleDelete = async () => {
    if (produtoFornecedorSelecionado) {
      try {
        await api.delete(`/produtoFornecedor/${produtoFornecedorSelecionado.id}`);
        setModalVisible(false);
        setProdutoFornecedorSelecionado(null);
        // Recarregar todos os produtos fornecedores para garantir que a tabela esteja atualizada
        fetchProdutosFornecedores();
      } catch (error) {
        console.error('Erro ao remover produto fornecedor:', error);
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
            <strong>Produtos Fornecedores</strong>
          </CCardHeader>
          <CCardBody>
            <CTable hover>
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell scope="col">ID</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Preço do Produto</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {produtosFornecedores.map((produtoFornecedor) => (
                  <CTableRow key={produtoFornecedor.id}>
                    <CTableHeaderCell scope="row">{produtoFornecedor.id}</CTableHeaderCell>
                    <CTableDataCell>{produtoFornecedor.precoProduto}</CTableDataCell>
                    <CTableDataCell>
                      <CButton
                        color="warning"
                        onClick={() => handleEdit(produtoFornecedor.id)}
                        className="me-2"
                        style={{ color: 'white' }}
                      >
                        <CIcon icon={cilPencil} /> Editar
                      </CButton>
                      <CButton
                        color="danger"
                        onClick={() => handleConfirmDelete(produtoFornecedor)}
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
          Tem certeza de que deseja remover o produto fornecedor com preço "<strong>{produtoFornecedorSelecionado?.precoProduto}</strong>"?
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

export default ProdutoFornecedorList;
