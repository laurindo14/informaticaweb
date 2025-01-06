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
  const [itemVendaId, setItemVendaId] = useState('');
  const [quantidade, setQuantidade] = useState('');
  const [transportadora, setTransportadora] = useState('');
  const [codigoRastreio, setCodigoRastreio] = useState('');
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const entregaId = searchParams.get('id');
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    if (entregaId) {
      const fetchEntrega = async () => {
        try {
          const response = await api.get(`/entrega/${entregaId}`);
          const {quantidade, transportadora, codigoRastreio } = response.data;
          setItemVendaId(itemVendaId);
          setQuantidade(quantidade);
          setTransportadora(transportadora);
          setCodigoRastreio(codigoRastreio);
        } catch (error) {
          console.error("Erro ao buscar entrega:", error);
        }
      };
      fetchEntrega();
    }
  }, [entregaId]);

  const handleSave = async (e) => {
    e.preventDefault();
    const entregaData = {
      itemVendaId,
      quantidade,
      transportadora,
      codigoRastreio,
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
    setItemVendaId('');
    setQuantidade('');
    setTransportadora('');
    setCodigoRastreio('');
  };

  return (
    <>
      <CCard>
        <CCardBody>
          <h4>{entregaId ? 'Editar Entrega' : 'Adicionar Entrega'}</h4>
          <CForm onSubmit={handleSave}>
            <div className="mb-3">
              <CFormLabel htmlFor="quantidade">Quantidade</CFormLabel>
              <CFormInput
                type="number"
                id="quantidade"
                value={quantidade}
                onChange={(e) => setQuantidade(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <CFormLabel htmlFor="transportadora">Transportadora</CFormLabel>
              <CFormInput
                type="text"
                id="transportadora"
                value={transportadora}
                onChange={(e) => setTransportadora(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <CFormLabel htmlFor="codigoRastreio">Código de Rastreio</CFormLabel>
              <CFormInput
                type="text"
                id="codigoRastreio"
                value={codigoRastreio}
                onChange={(e) => setCodigoRastreio(e.target.value)}
                required
              />
            </div>
            <CButton type="submit" color="primary">Salvar</CButton>
          </CForm>
        </CCardBody>
      </CCard>

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
