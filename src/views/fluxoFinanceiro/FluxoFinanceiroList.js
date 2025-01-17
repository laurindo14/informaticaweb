import React, { useEffect, useState } from "react";
import { CCard, CCardBody, CCardHeader, CCol, CRow, CButton, CTable, CTableBody, CTableHead, CTableRow, CTableHeaderCell, CTableDataCell } from "@coreui/react";
import { CModal, CModalHeader, CModalBody, CModalFooter, CModalTitle } from '@coreui/react'; // Importação do CModal
import api from "../../services/axiosConfig"; // Caminho correto para o axiosConfig
import { cilPencil, cilTrash } from "@coreui/icons";
import CIcon from "@coreui/icons-react";

const FluxoFinanceiroList = () => {
  const [fluxosFinanceiros, setFluxosFinanceiros] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fluxoSelecionado, setFluxoSelecionado] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    // Função para buscar os fluxos financeiros da API
    const fetchFluxosFinanceiros = async () => {
      setLoading(true);
      try {
        const response = await api.get("/fluxoFinanceiro");
        const data = Array.isArray(response.data) ? response.data : [];
        setFluxosFinanceiros(data);
      } catch (error) {
        console.error("Erro ao buscar fluxos financeiros:", error);
        setFluxosFinanceiros([]);
      } finally {
        setLoading(false);
      }
    };

    fetchFluxosFinanceiros();
  }, []);

  // Função para calcular o saldo total considerando apenas as entradas
  const calcularSaldoTotal = () => {
    return fluxosFinanceiros.reduce((total, fluxo) => {
      if (fluxo.tipo === "Entrada") {
        return total + fluxo.valor;
      }
      return total;
    }, 0);
  };

  // Função para formatar os valores monetários
  const formatCurrency = (value) =>
    new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(value);

  // Função para editar um fluxo financeiro
  const handleEdit = (id) => {
    console.log(`Editando fluxo financeiro com ID: ${id}`);
    // Lógica de navegação ou edição aqui
  };

  // Função para confirmar a exclusão de um fluxo financeiro
  const handleConfirmDelete = (fluxo) => {
    setFluxoSelecionado(fluxo);
    setModalVisible(true);
  };

  // Função para deletar um fluxo financeiro
  const handleDelete = async () => {
    if (fluxoSelecionado) {
      try {
        await api.delete(`/fluxoFinanceiro/${fluxoSelecionado.id}`);
        setModalVisible(false);
        setFluxoSelecionado(null);
        // Recarregar os fluxos financeiros após a exclusão
        const updatedFluxos = fluxosFinanceiros.filter(
          (fluxo) => fluxo.id !== fluxoSelecionado.id
        );
        setFluxosFinanceiros(updatedFluxos);
      } catch (error) {
        console.error("Erro ao remover fluxo financeiro:", error);
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
            <strong>Fluxos Financeiros</strong>
          </CCardHeader>
          <CCardBody>
            {/* Exibindo o saldo total */}
            <div className="mb-3">
              <strong>Saldo Total: {formatCurrency(calcularSaldoTotal())}</strong>
            </div>

            {/* Tabela para listar os fluxos financeiros */}
            <CTable hover>
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell scope="col">ID</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Tipo</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Valor</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Data</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Descrição</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Ações</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {fluxosFinanceiros.map((fluxo) => (
                  <CTableRow key={fluxo.id}>
                    <CTableHeaderCell scope="row">{fluxo.id}</CTableHeaderCell>
                    <CTableDataCell>{fluxo.tipo}</CTableDataCell>
                    <CTableDataCell>{formatCurrency(fluxo.valor)}</CTableDataCell>
                    <CTableDataCell>{new Date(fluxo.data).toLocaleDateString("pt-BR")}</CTableDataCell>
                    <CTableDataCell>{fluxo.descricao || "-"}</CTableDataCell>
                    <CTableDataCell>
                      <CButton
                        color="warning"
                        onClick={() => handleEdit(fluxo.id)}
                        className="me-2"
                        style={{ color: "white" }}
                      >
                        <CIcon icon={cilPencil} /> Editar
                      </CButton>
                      <CButton
                        color="danger"
                        onClick={() => handleConfirmDelete(fluxo)}
                        style={{ color: "white" }}
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

      {/* Modal de confirmação de exclusão */}
      <CModal visible={modalVisible} onClose={() => setModalVisible(false)}>
        <CModalHeader>
          <CModalTitle>Confirmar Exclusão</CModalTitle>
        </CModalHeader>
        <CModalBody>
          Tem certeza de que deseja remover o fluxo financeiro "<strong>{fluxoSelecionado?.tipo}</strong>"?
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

export default FluxoFinanceiroList;
