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
  CFormSelect,
} from '@coreui/react';
import api from '../../services/axiosConfig';
import { useLocation } from 'react-router-dom';

const HistoricoEntregaAdd = () => {
  const [dataHora, setDataHora] = useState('');
  const [entregaId, setEntregaId] = useState('');
  const [mensagem, setMensagem] = useState('');
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const historicoEntregaId = searchParams.get('id');
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    if (historicoEntregaId) {
      const fetchHistoricoEntrega = async () => {
        try {
          const response = await api.get(`/historicoEntrega/${historicoEntregaId}`);
          const { dataHora, mensagem } = response.data;
          setDataHora(dataHora);
          setEntregaId(entregaId);
          setMensagem(mensagem);
        } catch (error) {
          console.error("Erro ao buscar histórico de entrega:", error);
        }
      };
      fetchHistoricoEntrega();
    }
  }, [historicoEntregaId]);

  const handleSave = async (e) => {
    e.preventDefault();
    const historicoEntregaData = {
      dataHora,
      entregaId,
      mensagem,
    };
    try {
      if (historicoEntregaId) {
        await api.put(`/historicoEntrega/${historicoEntregaId}`, historicoEntregaData);
      } else {
        await api.post('/historicoEntrega', historicoEntregaData);
      }
      setModalVisible(true);
      resetForm();
    } catch (error) {
      console.error("Erro ao salvar o histórico de entrega:", error);
      alert('Erro ao salvar o histórico de entrega');
    }
  };

  const resetForm = () => {
    setDataHora('');
    setEntregaId('');
    setMensagem('');
  };

  return (
    <>
      <CCard>
        <CCardBody>
          <h4>{historicoEntregaId ? 'Editar Histórico de Entrega' : 'Adicionar Histórico de Entrega'}</h4>
          <CForm onSubmit={handleSave}>
            <div className="mb-3">
              <CFormLabel htmlFor="dataHoraHistoricoEntrega">Data e Hora</CFormLabel>
              <CFormInput
                type="text"
                id="dataHora"
                value={dataHora}
                onChange={(e) => setDataHora(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <CFormLabel htmlFor="mensagemHistoricoEntrega">Mensagem</CFormLabel>
              <CFormSelect
                type="text"
                id="mensagem"
                value={mensagem}
                onChange={(e) => setMensagem(e.target.value)}
                required
              >
                <option value="">Selecione</option>
                <option value="Entregue">Entregue</option>
                <option value="Não Entregue">Não Entregue</option>
              </CFormSelect>
            </div>
            <CButton type="submit" color="primary">Salvar</CButton>
          </CForm>
        </CCardBody>
      </CCard>

      <CModal visible={modalVisible} onClose={() => setModalVisible(false)}>
        <CModalHeader>
          <CModalTitle>Sucesso</CModalTitle>
        </CModalHeader>
        <CModalBody>Histórico de entrega salvo com sucesso!</CModalBody>
        <CModalFooter>
          <CButton color="primary" onClick={() => setModalVisible(false)}>
            Fechar
          </CButton>
        </CModalFooter>
      </CModal>
    </>
  );
};

export default HistoricoEntregaAdd;
