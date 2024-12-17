import React, { useState, useEffect } from 'react';
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
} from '@coreui/react';
import api from '../../services/axiosConfig';
import { useLocation } from 'react-router-dom';

const EntregaAdd = () => {
  const [nome, setNome] = useState('');
  const [numeroEntrega, setNumeroEntrega] = useState('');
  const [validade, setValidade] = useState('');
  const [clienteId, setClienteId] = useState('');
  const [cvc, setCvc] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const entregaId = searchParams.get('id');

  useEffect(() => {
    if (entregaId) {
      const fetchEntrega = async () => {
        try {
          const response = await api.get(`/entrega/${entregaId}`);
          const { nome, numeroEntrega, validade, cliente_id, cvc } = response.data;
          setNome(nome);
          setNumeroEntrega(numeroEntrega);
          setValidade(validade);
          setClienteId(cliente_id);
          setCvc(cvc);
        } catch (error) {
          console.error("Erro ao carregar entrega:", error);
        }
      };
      fetchEntrega();
    }
  }, [entregaId]);

  const handleSave = async (e) => {
    e.preventDefault();

    const entregaData = {
      nome,
      numeroEntrega,
      validade,
      cliente_id: clienteId,
      cvc,
    };

    try {
      if (entregaId) {
        await api.put(`/entrega/${entregaId}`, entregaData);
      } else {
        await api.post('/entrega', entregaData);
      }
      setModalVisible(true);
      resetForm();
    } catch (error) {
      console.error("Erro ao salvar a entrega:", error);
      alert('Erro ao salvar a entrega');
    }
  };

  const resetForm = () => {
    setNome('');
    setNumeroEntrega('');
    setValidade('');
    setClienteId('');
    setCvc('');
  };

  return (
    <>
      <CCard>
        <CCardBody>
          <h4>{entregaId ? 'Editar Entrega' : 'Adicionar Entrega'}</h4>
          <CForm onSubmit={handleSave}>
            <div className="mb-3">
              <CFormLabel htmlFor="nomeEntrega">Nome da Entrega</CFormLabel>
              <CFormInput
                type="text"
                id="nomeEntrega"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <CFormLabel htmlFor="numeroEntrega">Número da Entrega</CFormLabel>
              <CFormInput
                type="text"
                id="numeroEntrega"
                value={numeroEntrega}
                onChange={(e) => setNumeroEntrega(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <CFormLabel htmlFor="validadeEntrega">Validade</CFormLabel>
              <CFormInput
                type="text"
                id="validadeEntrega"
                value={validade}
                onChange={(e) => setValidade(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <CFormLabel htmlFor="clienteId">Cliente ID</CFormLabel>
              <CFormInput
                type="number"
                id="clienteId"
                value={clienteId}
                onChange={(e) => setClienteId(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <CFormLabel htmlFor="cvc">CVC</CFormLabel>
              <CFormInput
                type="text"
                id="cvc"
                value={cvc}
                onChange={(e) => setCvc(e.target.value)}
                required
              />
            </div>
            <CButton type="submit" color="primary">Salvar</CButton>
          </CForm>
        </CCardBody>
      </CCard>

      {/* Modal de Confirmação */}
      <CModal visible={modalVisible} onClose={() => setModalVisible(false)}>
        <CModalHeader>
          <CModalTitle>Sucesso</CModalTitle>
        </CModalHeader>
        <CModalBody>Entrega salva com sucesso!</CModalBody>
        <CModalFooter>
          <CButton color="primary" onClick={() => setModalVisible(false)}>
            Fechar
          </CButton>
        </CModalFooter>
      </CModal>
    </>
  );
};

export default EntregaAdd;
