
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

const usuarioAdd = () => {
  const [nome, setNome] = useState('');
  const [cpf, setCpf] = useState('');
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
      const fetchusuario = async () => {
        try {
          const response = await api.get(`/usuario/${usuarioId}`);
          const { nome, cpf, login, senha, email, telefone } = response.data;
          setNome(nome);
          setCpf(cpf);
          setLogin(login);
          setSenha(senha);
          setEmail(email);
          setTelefone(telefone);
        } catch (error) {
          console.error("Erro ao carregar usuario:", error);
        }
      };
      fetchusuario();
    }
  }, [usuarioId]);

  const handleSave = async (e) => {
    e.preventDefault();

    const usuarioData = {
      nome,
      cpf,
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
    setLogin('');
    setSenha('');
    setEmail('');
    setTelefone('');
  };

  return (
    <>
      <CCard>
        <CCardBody>
          <h4>{usuarioId ? 'Editar usuario' : 'Adicionar usuario'}</h4>
          <CForm onSubmit={handleSave}>
            <div className="mb-3">
              <CFormLabel htmlFor="nomeusuario">Nome do usuario</CFormLabel>
              <CFormInput
                type="text"
                id="nomeusuario"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <CFormLabel htmlFor="cpfusuario">Cpf</CFormLabel>
              <CFormInput
                type="text"
                id="cpfusuario"
                value={cpf}
                onChange={(e) => setCpf(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <CFormLabel htmlFor="emailusuario">Email</CFormLabel>
              <CFormInput
                type="email"
                id="emailusuario"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <CFormLabel htmlFor="senhausuario">Senha</CFormLabel>
              <CFormInput
                type="password"
                id="senhausuario"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <CFormLabel htmlFor="telefoneusuario">Telefone</CFormLabel>
              <CFormInput
                type="tel"
                id="telefoneusuario"
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
        <CModalBody>usuario salvo com sucesso!</CModalBody>
        <CModalFooter>
          <CButton color="primary" onClick={() => setModalVisible(false)}>
            Fechar
          </CButton>
        </CModalFooter>
      </CModal>
    </>
  );
};

export default usuarioAdd;
