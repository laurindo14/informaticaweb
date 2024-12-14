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

const UsuarioAdd = () => {
  const [nome, setNome] = useState('');
  const [cpf, setCpf] = useState('');
  const [rg, setRg] = useState('');
  const [login, setLogin] = useState('');
  const [senha, setSenha] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const usuarioId = searchParams.get('id');

  useEffect(() => {
    if (usuarioId) {
      const fetchUsuario = async () => {
        try {
          const response = await api.get(`/usuario/${usuarioId}`);
          const { nome, cpf, rg, login, senha, email, telefone } = response.data;
          setNome(nome);
          setCpf(cpf);
          setRg(rg);
          setLogin(login);
          setSenha(senha);
          setEmail(email);
          setTelefone(telefone);
        } catch (error) {
          console.error("Erro ao carregar usuario:", error);
        }
      };
      fetchUsuario();
    }
  }, [usuarioId]);

  const handleSave = async (e) => {
    e.preventDefault();

    const usuarioData = {
      nome,
      cpf,
      rg,
      login,
      senha,
      email,
      telefone,
    };

    try {
      if (usuarioId) {
        await api.put(`/usuario/${usuarioId}`, usuarioData);
      } else {
        await api.post('/usuario', usuarioData);
      }
      setModalVisible(true);
      resetForm();
    } catch (error) {
      console.error("Erro ao salvar o usuario:", error);
      alert('Erro ao salvar o usuario');
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
          <h4>{usuarioId ? 'Editar Usuario' : 'Adicionar Usuario'}</h4>
          <CForm onSubmit={handleSave}>
            <div className="mb-3">
              <CFormLabel htmlFor="nomeUsuario">Nome do Usuario</CFormLabel>
              <CFormInput
                type="text"
                id="nomeUsuario"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <CFormLabel htmlFor="cpfUsuario">Cpf</CFormLabel>
              <CFormInput
                type="text"
                id="cpfUsuario"
                value={cpf}
                onChange={(e) => setCpf(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <CFormLabel htmlFor="rgUsuario">Rg</CFormLabel>
              <CFormInput
                type="text"
                id="rgUsuario"
                value={rg}
                onChange={(e) => setRg(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <CFormLabel htmlFor="loginUsuario">Login</CFormLabel>
              <CFormInput
                type="text"
                id="loginUsuario"
                value={login}
                onChange={(e) => setLogin(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <CFormLabel htmlFor="senhaUsuario">Senha</CFormLabel>
              <CFormInput
                type="password"
                id="senhaUsuario"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <CFormLabel htmlFor="emailUsuario">Email</CFormLabel>
              <CFormInput
                type="email"
                id="emailUsuario"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <CFormLabel htmlFor="telefoneUsuario">Telefone</CFormLabel>
              <CFormInput
                type="tel"
                id="telefoneUsuario"
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
        <CModalBody>Usuario salvo com sucesso!</CModalBody>
        <CModalFooter>
          <CButton color="primary" onClick={() => setModalVisible(false)}>
            Fechar
          </CButton>
        </CModalFooter>
      </CModal>
    </>
  );
};

export default UsuarioAdd;