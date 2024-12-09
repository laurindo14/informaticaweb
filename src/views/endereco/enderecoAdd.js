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

const EnderecoAdd = () => {
  const [logradouro, setLogradouro] = useState('');
  const [numero, setNumereo] = useState('');
  const [complemento, setComplemento] = useState('');
  const [bairro, setBairro] = useState('');
  const [cidade, setCidade] = useState('');
  const [uf, setUf] = useState('');
  const [cep, setCep] = useState('');
  const [clienteId, setClienteId] = useState('');
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const enderecoId = searchParams.get('id');
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    if (enderecoId) {
      const fetchEndereco = async () => {
        try {
          const response = await api.get(`/endereco/${enderecoId}`);
          const { logradouro, numero, complemento, bairro, cidade, uf, cep } = response.data;
          setLogradouro(logradouro);
          setNumereo(numero);
          setComplemento(complemento);
          setBairro(bairro);
          setCidade(cidade);
          setUf(uf);
          setCep(cep);
          setClienteId(cliente);
        } catch (error) {
          console.error("Erro ao buscar endereços:", error);
        }
      };
      fetchEndereco();
    }
  }, [enderecoId]);
  const handleSave = async (e) => {
    e.preventDefault();
    const enderecoData = {
      logradouro,
      numero,
      complemento,
      bairro,
      cidade,
      uf,
      cep,
      cliente: clienteId,
    };
    try {
      if (enderecoId) {
    
        await api.put(`/endereco/${enderecoId}`, enderecoData);
      } else {
        await api.post('/endereco', enderecoData);
      }
      setModalVisible(true);
      resetForm();
    } catch (error) {
      console.error("Erro ao salvar o endereço:", error);
      alert('Erro ao salvar o endereço');
    }
  };

  const resetForm = () => {
    setLogradouro('');
    setNumereo('');
    setComplemento('');
    setBairro('');
    setCidade('');
    setUf('');
    setCep('');
    setClienteId('');
  }


  return (
    <>
      <CCard>
        <CCardBody>
          <h4>{enderecoId ? 'Editar Endereco' : 'Adicionar Endereco'}</h4>
          <CForm onSubmit={handleSave}>
            <div className="mb-3">
              <CFormLabel htmlFor="logradouroEndereco">Logradouro</CFormLabel>
              <CFormInput
                type="text"
                id="Logradouro"
                value={logradouro}
                onChange={(e) => setLogradouro(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <CFormLabel htmlFor="numeroEndereco">Numero</CFormLabel>
              <CFormInput
                type="text"
                id="numero"
                value={numero}
                onChange={(e) => setNumereo(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <CFormLabel htmlFor="complementoEndereco">complemento</CFormLabel>
              <CFormSelect
                type="text"
                id="complemento"
                value={complemento}
                onChange={(e) => setComplemento(e.target.value)}
                required
                >
                <option value="">Selecione</option>
                <option value="Casa">Casa</option>
                <option value="Apartamento">Apartamento</option>
              </CFormSelect>
            
            </div>
            <div className="mb-3">
              <CFormLabel htmlFor="bairroEndereco">bairro</CFormLabel>
              <CFormInput
                type="text"
                id="bairro"
                value={bairro}
                onChange={(e) => setBairro(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <CFormLabel htmlFor="cidadeEndereco">cidade</CFormLabel>
               <CFormInput
                type="text"
                id="cidade"
                value={cidade}
                onChange={(e) => setCidade(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <CFormLabel htmlFor="ufEndereco">uf</CFormLabel>
               <CFormInput
                type="text"
                id="uf"
                value={uf}
                onChange={(e) => setUf(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <CFormLabel htmlFor="cepEndereco">cep</CFormLabel>
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
        <CModalBody>Endereço salvo com sucesso!</CModalBody>
        <CModalFooter>
          <CButton color="primary" onClick={() => setModalVisible(false)}>
            Fechar
          </CButton>
        </CModalFooter>
      </CModal>
    </>
  );
};

export default EnderecoAdd;
