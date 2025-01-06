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

const EstoqueAdd = () => {
  const [logradouro, setLogradouro] = useState('');
  const [numero, setNumero] = useState('');
  const [complemento, setComplemento] = useState('');
  const [bairro, setBairro] = useState('');
  const [cidade, setCidade] = useState('');
  const [uf, setUf] = useState('');
  const [cep, setCep] = useState('');
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const estoqueId = searchParams.get('id');
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    if (estoqueId) {
      const fetchEstoque = async () => {
        try {
          const response = await api.get(`/estoque/${estoqueId}`);
          const { logradouro, numero, complemento, bairro, cidade, uf, cep } = response.data;
          setLogradouro(logradouro);
          setNumero(numero);
          setComplemento(complemento);
          setBairro(bairro);
          setCidade(cidade);
          setUf(uf);
          setCep(cep);
        } catch (error) {
          console.error("Erro ao buscar estoque:", error);
        }
      };
      fetchEstoque();
    }
  }, [estoqueId]);

  const handleSave = async (e) => {
    e.preventDefault();
    const estoqueData = {
      logradouro,
      numero,
      complemento,
      bairro,
      cidade,
      uf,
      cep,
    };
    try {
      if (estoqueId) {
        await api.put(`/estoque/${estoqueId}`, estoqueData);
      } else {
        await api.post('/estoque', estoqueData);
      }
      setModalVisible(true);
      resetForm();
    } catch (error) {
      console.error("Erro ao salvar o estoque:", error);
      alert('Erro ao salvar o estoque');
    }
  };

  const resetForm = () => {
    setLogradouro('');
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
          <h4>{estoqueId ? 'Editar Estoque' : 'Adicionar Estoque'}</h4>
          <CForm onSubmit={handleSave}>
            <div className="mb-3">
              <CFormLabel htmlFor="logradouroEstoque">Logradouro</CFormLabel>
              <CFormInput
                type="text"
                id="Logradouro"
                value={logradouro}
                onChange={(e) => setLogradouro(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <CFormLabel htmlFor="numeroEstoque">Número</CFormLabel>
              <CFormInput
                type="text"
                id="numero"
                value={numero}
                onChange={(e) => setNumero(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <CFormLabel htmlFor="complementoEstoque">Complemento</CFormLabel>
              <CFormInput
                type="text"
                id="complemento"
                value={complemento}
                onChange={(e) => setComplemento(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <CFormLabel htmlFor="bairroEstoque">Bairro</CFormLabel>
              <CFormInput
                type="text"
                id="bairro"
                value={bairro}
                onChange={(e) => setBairro(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <CFormLabel htmlFor="cidadeEstoque">Cidade</CFormLabel>
              <CFormInput
                type="text"
                id="cidade"
                value={cidade}
                onChange={(e) => setCidade(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <CFormLabel htmlFor="ufEstoque">UF</CFormLabel>
              <CFormInput
                type="text"
                id="uf"
                value={uf}
                onChange={(e) => setUf(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <CFormLabel htmlFor="cepEstoque">CEP</CFormLabel>
              <CFormInput
                type="text"
                id="cep"
                value={cep}
                onChange={(e) => setCep(e.target.value)}
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
        <CModalBody>Estoque salvo com sucesso!</CModalBody>
        <CModalFooter>
          <CButton color="primary" onClick={() => setModalVisible(false)}>
            Fechar
          </CButton>
        </CModalFooter>
      </CModal>
    </>
  );
};

export default EstoqueAdd;
