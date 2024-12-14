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

const vendedorAdd = () => {
  const [nome, setNome] = useState('');
  const [cpf, setCpf] = useState('');
  const [login, setLogin] = useState('');
  const [senha, setSenha] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const vendedorId = searchParams.get('id');

  useEffect(() => {
    if (vendedorId) {
      const fetchvendedor = async () => {
        try {
          const response = await api.get(`/vendedor/${vendedorId}`);
          const { nome, cpf, login, senha, email, telefone } = response.data;
          setNome(nome);
          setCpf(cpf);
          setLogin(login);
          setSenha(senha);
          setEmail(email);
          setTelefone(telefone);
        } catch (error) {
          console.error("Erro ao carregar vendedor:", error);
        }
      };
      fetchvendedor();
    }
  }, [vendedorId]);

  const handleSave = async (e) => {
    e.preventDefault();

    const vendedorData = {
      nome,
      cpf,
      login,
      senha,
      email,
      telefone,
    };

    try {
      if (vendedorId) {
        await api.put(`/vendedor/${vendedorId}`, vendedorData);
      } else {
        await api.post('/vendedor', vendedorData);
      }
      setModalVisible(true);
      resetForm();
    } catch (error) {
      console.error("Erro ao salvar o vendedor:", error);
      alert('Erro ao salvar o vendedor');
    }
  };

  const resetForm = () => {
    setNome('');
    setCpf('');
    setLogin('');
    setSenha('');
    setEmail('');
    setTelefone('');
  };

  return (
    <>
      <CCard>
        <CCardBody>
          <h4>{vendedorId ? 'Editar vendedor' : 'Adicionar vendedor'}</h4>
          <CForm onSubmit={handleSave}>
            <div className="mb-3">
              <CFormLabel htmlFor="nomevendedor">Nome do vendedor</CFormLabel>
              <CFormInput
                type="text"
                id="nomevendedor"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <CFormLabel htmlFor="cpfvendedor">Cpf</CFormLabel>
              <CFormInput
                type="text"
                id="cpfvendedor"
                value={cpf}
                onChange={(e) => setCpf(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <CFormLabel htmlFor="emailvendedor">Email</CFormLabel>
              <CFormInput
                type="email"
                id="emailvendedor"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <CFormLabel htmlFor="senhavendedor">Senha</CFormLabel>
              <CFormInput
                type="password"
                id="senhavendedor"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <CFormLabel htmlFor="telefonevendedor">Telefone</CFormLabel>
              <CFormInput
                type="tel"
                id="telefonevendedor"
                value={telefone}
                onChange={(e) => setTelefone(e.target.value)}
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
        <CModalBody>vendedor salvo com sucesso!</CModalBody>
        <CModalFooter>
          <CButton color="primary" onClick={() => setModalVisible(false)}>
            Fechar
          </CButton>
        </CModalFooter>
      </CModal>
    </>
  );
};

export default vendedorAdd;
