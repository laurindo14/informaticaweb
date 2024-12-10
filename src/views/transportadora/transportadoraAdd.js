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

const TransportadoraAdd = () => {
  const [nome, setNome] = useState('');
  const [numero, setNumero] = useState('');
  const [complemento, setComplemento] = useState('');
  const [bairro, setBairro] = useState('');
  const [cidade, setCidade] = useState('');
  const [uf, setUf] = useState('');
  const [cep, setCep] = useState('');
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const transportadoraId = searchParams.get('id');
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    if (transportadoraId) {
      const fetchTransportadora = async () => {
        try {
          const response = await api.get(`/transportadora/${transportadoraId}`);
          const { nome, numero, complemento, bairro, cidade, uf, cep } = response.data;
          setNome(nome);
          setNumero(numero);
          setComplemento(complemento);
          setBairro(bairro);
          setCidade(cidade);
          setUf(uf);
          setCep(cep);
        } catch (error) {
          console.error('Erro ao buscar transportadora:', error);
        }
      };
      fetchTransportadora();
    }
  }, [transportadoraId]);

  const handleSave = async (e) => {
    e.preventDefault();
    const transportadoraData = {
      nome,
      numero,
      complemento,
      bairro,
      cidade,
      uf,
      cep,
    };
    try {
      if (transportadoraId) {
        await api.put(`/transportadora/${transportadoraId}`, transportadoraData);
      } else {
        await api.post('/transportadora', transportadoraData);
      }
      setModalVisible(true);
      resetForm();
    } catch (error) {
      console.error('Erro ao salvar a transportadora:', error);
      alert('Erro ao salvar a transportadora');
    }
  };

  const resetForm = () => {
    setNome('');
    setNumero('');
    setComplemento('');
    setBairro('');
    setCidade('');
    setUf('');
    setCep('');
  };

  return (
    <>
      <CCard>
        <CCardBody>
          <h4>{transportadoraId ? 'Editar Transportadora' : 'Adicionar Transportadora'}</h4>
          <CForm onSubmit={handleSave}>
            <div className="mb-3">
              <CFormLabel htmlFor="nomeTransportadora">Nome</CFormLabel>
              <CFormInput
                type="text"
                id="nome"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <CFormLabel htmlFor="numeroTransportadora">Número</CFormLabel>
              <CFormInput
                type="text"
                id="numero"
                value={numero}
                onChange={(e) => setNumero(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <CFormLabel htmlFor="complementoTransportadora">Complemento</CFormLabel>
              <CFormInput
                type="text"
                id="complemento"
                value={complemento}
                onChange={(e) => setComplemento(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <CFormLabel htmlFor="bairroTransportadora">Bairro</CFormLabel>
              <CFormInput
                type="text"
                id="bairro"
                value={bairro}
                onChange={(e) => setBairro(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <CFormLabel htmlFor="cidadeTransportadora">Cidade</CFormLabel>
              <CFormInput
                type="text"
                id="cidade"
                value={cidade}
                onChange={(e) => setCidade(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <CFormLabel htmlFor="ufTransportadora">UF</CFormLabel>
              <CFormInput
                type="text"
                id="uf"
                value={uf}
                onChange={(e) => setUf(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <CFormLabel htmlFor="cepTransportadora">CEP</CFormLabel>
              <CFormInput
                type="text"
                id="cep"
                value={cep}
                onChange={(e) => setCep(e.target.value)}
                required
              />
            </div>
            <CButton type="submit" color="primary">
              Salvar
            </CButton>
          </CForm>
        </CCardBody>
      </CCard>

      <CModal visible={modalVisible} onClose={() => setModalVisible(false)}>
        <CModalHeader>
          <CModalTitle>Sucesso</CModalTitle>
        </CModalHeader>
        <CModalBody>Transportadora salva com sucesso!</CModalBody>
        <CModalFooter>
          <CButton color="primary" onClick={() => setModalVisible(false)}>
            Fechar
          </CButton>
        </CModalFooter>
      </CModal>
    </>
  );
};

export default TransportadoraAdd;
