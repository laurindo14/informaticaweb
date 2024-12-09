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

const ClienteAdd = () => {
  const [nome, setNome] = useState('');
  const [cpf, setCpf] = useState('');
  const [rg, setRg] = useState('');
  const [login, setLogin] = useState('');
  const [senha, setSenha] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const clienteId = searchParams.get('id');
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    if (clienteId) {
      const fetchCliente = async () => {
        try {
          const response = await api.get(`/cliente/${clienteId}`);
          const { nome, cpf, rg, login, senha, email, telefone } = response.data;
          setNome(nome);
          setCpf(cpf);
          setRg(rg);
          setLogin(login);
          setSenha(senha);
          setEmail(email);
          setTelefone(telefone);
        } catch (error) {
          console.error("Erro ao buscar cliente:", error);
        }
      };
      fetchCliente();
    }
  }, [clienteId]);

  const handleSave = async (e) => {
    e.preventDefault();
    const clienteData = {
      nome,
      cpf,
      rg,
      login,
      senha,
      email,
      telefone,
    };
    try {
      if (clienteId) {
        await api.put(`/cliente/${clienteId}`, clienteData);
      } else {
        await api.post('/cliente', clienteData);
      }
      setModalVisible(true);
      resetForm();
    } catch (error) {
      console.error("Erro ao salvar o cliente:", error);
      alert('Erro ao salvar o cliente');
    }
  };

  const resetForm = () => {
    setNome('');
    setCpf('');
    setRg('');
    setLogin('');
    setSenha('');
    setEmail('');
    setTelefone('');
  };

  return (
    <>
      <CCard>
        <CCardBody>
          <h4>{clienteId ? 'Editar Cliente' : 'Adicionar Cliente'}</h4>
          <CForm onSubmit={handleSave}>
            <div className="mb-3">
              <CFormLabel htmlFor="nome">Nome</CFormLabel>
              <CFormInput
                type="text"
                id="nome"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <CFormLabel htmlFor="cpf">CPF</CFormLabel>
              <CFormInput
                type="text"
                id="cpf"
                value={cpf}
                onChange={(e) => setCpf(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <CFormLabel htmlFor="rg">RG</CFormLabel>
              <CFormInput
                type="text"
                id="rg"
                value={rg}
                onChange={(e) => setRg(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <CFormLabel htmlFor="login">Login</CFormLabel>
              <CFormInput
                type="text"
                id="login"
                value={login}
                onChange={(e) => setLogin(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <CFormLabel htmlFor="senha">Senha</CFormLabel>
              <CFormInput
                type="password"
                id="senha"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <CFormLabel htmlFor="email">Email</CFormLabel>
              <CFormInput
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <CFormLabel htmlFor="telefone">Telefone</CFormLabel>
              <CFormInput
                type="text"
                id="telefone"
                value={telefone}
                onChange={(e) => setTelefone(e.target.value)}
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
        <CModalBody>Cliente salvo com sucesso!</CModalBody>
        <CModalFooter>
          <CButton color="primary" onClick={() => setModalVisible(false)}>
            Fechar
          </CButton>
        </CModalFooter>
      </CModal>
    </>
  );
};

export default ClienteAdd;
