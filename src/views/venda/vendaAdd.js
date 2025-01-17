import React, { useState } from 'react';
import {
  CButton,
  CCard,
  CCardBody,
  CForm,
  CFormInput,
  CFormLabel,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CSpinner,
} from '@coreui/react';
import api from '../../services/axiosConfig';

const VendaAdd = () => {
  const [dataVenda, setDataVenda] = useState('');
  const [clienteId, setClienteId] = useState('');
  const [objeto, setObjeto] = useState('');
  const [quantidade, setQuantidade] = useState('');
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSave = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage('');
    setSuccessMessage('');

    const vendaData = {
      dataVenda,
      clienteId,
      objeto,
      quantidade,
    };

    try {
      await api.post('/venda', vendaData);
      setSuccessMessage('Venda cadastrada com sucesso!');
      resetForm();
      setModalVisible(true);
    } catch (error) {
      console.error('Erro ao salvar a venda:', error);
      setErrorMessage('Erro ao salvar a venda. Verifique os dados e tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setDataVenda('');
    setClienteId('');
    setObjeto('');
    setQuantidade('');
  };

  return (
    <>
      <CCard>
        <CCardBody>
          <h4>Adicionar Venda de Objeto</h4>

          {loading && (
            <div className="text-center mb-3">
              <CSpinner color="primary" /> Salvando...
            </div>
          )}

          {!loading && (
            <CForm onSubmit={handleSave}>
              <div className="mb-3">
                <CFormLabel htmlFor="dataVenda">Data da Venda</CFormLabel>
                <CFormInput
                  type="date"
                  id="dataVenda"
                  value={dataVenda}
                  onChange={(e) => setDataVenda(e.target.value)}
                  required
                />
              </div>

              <div className="mb-3">
                <CFormLabel htmlFor="clienteId">Cliente ID</CFormLabel>
                <CFormInput
                  type="text"
                  id="clienteId"
                  value={clienteId}
                  onChange={(e) => setClienteId(e.target.value)}
                  required
                />
              </div>

              <div className="mb-3">
                <CFormLabel htmlFor="objeto">Objeto Vendido</CFormLabel>
                <CFormInput
                  type="text"
                  id="objeto"
                  value={objeto}
                  onChange={(e) => setObjeto(e.target.value)}
                  placeholder="Ex: Notebook, Smartphone"
                  required
                />
              </div>

              <div className="mb-3">
                <CFormLabel htmlFor="quantidade">Quantidade</CFormLabel>
                <CFormInput
                  type="number"
                  id="quantidade"
                  value={quantidade}
                  onChange={(e) => setQuantidade(e.target.value)}
                  min="1"
                  required
                />
              </div>

              <CButton type="submit" color="primary" disabled={loading}>
                {loading ? 'Salvando...' : 'Salvar'}
              </CButton>
            </CForm>
          )}

          {errorMessage && <div className="text-danger mt-3">{errorMessage}</div>}
        </CCardBody>
      </CCard>

      <CModal visible={modalVisible} onClose={() => setModalVisible(false)}>
        <CModalHeader>
          <CModalTitle>Sucesso</CModalTitle>
        </CModalHeader>
        <CModalBody>{successMessage}</CModalBody>
        <CModalFooter>
          <CButton color="primary" onClick={() => setModalVisible(false)}>
            Fechar
          </CButton>
        </CModalFooter>
      </CModal>
    </>
  );
};

export default VendaAdd;
