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

const UsuarioAdd = () => {
  const [nome, setNome] = useState('');
  const [cpf, setCpf] = useState('');
  const [rg, setRg] = useState('');
  const [login, setLogin] = useState('');
  const [senha, setSenha] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [usuarioPai, setUsuarioPai] = useState('');
  const [permissao, setPermissao] = useState('');
  const [usuarios, setUsuarios] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);
  const usuarioId = searchParams.get('id');

  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const response = await api.get('/usuario');
        setUsuarios(response.data);
      } catch (error) {
        console.error('Erro ao buscar usuários:', error);
      }
    };
    fetchUsuarios();
  }, []);

  useEffect(() => {
    if (usuarioId) {
      const fetchUsuario = async () => {
        try {
          const response = await api.get(`/usuario/${usuarioId}`);
          const { nome, cpf, rg, login, senha, email, telefone, usuarioPai, permissao } = response.data;
          setNome(nome);
          setCpf(cpf);
          setRg(rg);
          setLogin(login);
          setSenha(senha);
          setEmail(email);
          setTelefone(telefone);
          setUsuarioPai(usuarioPai ? usuarioPai.id : '');
          setPermissao(permissao ? permissao.id : '');
        } catch (error) {
          console.error('Erro ao carregar usuário:', error);
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
      usuarioPai: usuarioPai ? { id: usuarioPai } : null,
      permissao: permissao ? { id: permissao } : null,
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
      console.error('Erro ao salvar o usuário:', error);
      alert('Erro ao salvar o usuário');
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
    setUsuarioPai('');
    setPermissao('');
  };

  return (
    <>
      <CCard>
        <CCardBody>
          <h4>{usuarioId ? 'Editar Usuário' : 'Adicionar Usuário'}</h4>
          <CForm onSubmit={handleSave}>
            <div className="mb-3">
              <CFormLabel htmlFor="nomeUsuario">Nome</CFormLabel>
              <CFormInput
                type="text"
                id="nomeUsuario"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <CFormLabel htmlFor="cpfUsuario">CPF</CFormLabel>
              <CFormInput
                type="text"
                id="cpfUsuario"
                value={cpf}
                onChange={(e) => setCpf(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <CFormLabel htmlFor="rgUsuario">RG</CFormLabel>
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
              <CFormLabel htmlFor="emailUsuario">E-mail</CFormLabel>
              <CFormInput
                type="email"
                id="emailUsuario"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <CFormLabel htmlFor="telefoneUsuario">Telefone</CFormLabel>
              <CFormInput
                type="text"
                id="telefoneUsuario"
                value={telefone}
                onChange={(e) => setTelefone(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <CFormLabel htmlFor="usuarioPai">Usuário Pai</CFormLabel>
              <CFormSelect
                id="usuarioPai"
                value={usuarioPai}
                onChange={(e) => setUsuarioPai(e.target.value)}
              >
                <option value="">Selecione um Usuário Pai</option>
                {usuarios.map((user) => (
                  <option key={user.id} value={user.id}>
                    {user.nome}
                  </option>
                ))}
              </CFormSelect>
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
        <CModalBody>Usuário salvo com sucesso!</CModalBody>
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
