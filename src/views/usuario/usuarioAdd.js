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
  const [usuarioData, setUsuarioData] = useState({
    nome: '',
    cpf: '',
    rg: '',
    login: '',
    senha: '',
    email: '',
    telefone: '',
    permissao: '', // Se for um campo relacionado a permissões, garanta que a estrutura está correta
  });
  const [modalVisible, setModalVisible] = useState(false);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const usuarioId = searchParams.get('id');

  useEffect(() => {
    if (usuarioId) {
      const fetchUsuario = async () => {
        try {
          const response = await api.get(`/usuario/${usuarioId}`);
          setUsuarioData({
            nome: response.data.nome,
            cpf: response.data.cpf,
            rg: response.data.rg,
            login: response.data.login,
            senha: response.data.senha,
            email: response.data.email,
            telefone: response.data.telefone,
            permissao: response.data.permissao ? response.data.permissao.id : '',
          });
        } catch (error) {
          console.error('Erro ao carregar usuário:', error);
        }
      };
      fetchUsuario();
    }
  }, [usuarioId]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setUsuarioData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSave = async (e) => {
    e.preventDefault();

    try {
      let response;
      if (usuarioId) {
        // Atualiza o usuário
        response = await api.put(`/usuario/${usuarioId}`, usuarioData);
      } else {
        // Cria um novo usuário
        response = await api.post('/usuario', usuarioData);
      }

      console.log('Resposta da API:', response.data);  // Log de sucesso

      setModalVisible(true);
      resetForm();
    } catch (error) {
      console.error('Erro ao salvar o usuário:', error.response || error);
      alert(`Erro ao salvar o usuário: ${error.response?.data?.message || error.message}`);
    }
  };

  const resetForm = () => {
    setUsuarioData({
      nome: '',
      cpf: '',
      rg: '',
      login: '',
      senha: '',
      email: '',
      telefone: '',
      permissao: '',
    });
  };

  return (
    <>
      <CCard>
        <CCardBody>
          <h4>{usuarioId ? 'Editar Usuário' : 'Adicionar Usuário'}</h4>
          <CForm onSubmit={handleSave}>
            {[
              { label: 'Nome', id: 'nome', type: 'text', required: true },
              { label: 'CPF', id: 'cpf', type: 'text', required: true },
              { label: 'RG', id: 'rg', type: 'text' },
              { label: 'Login', id: 'login', type: 'text', required: true },
              { label: 'Senha', id: 'senha', type: 'password', required: true },
              { label: 'E-mail', id: 'email', type: 'email' },
              { label: 'Telefone', id: 'telefone', type: 'text' },
            ].map(({ label, id, type, required }) => (
              <div className="mb-3" key={id}>
                <CFormLabel htmlFor={`${id}Usuario`}>{label}</CFormLabel>
                <CFormInput
                  type={type}
                  id={id}
                  value={usuarioData[id]}
                  onChange={handleChange}
                  required={required}
                />
              </div>
            ))}

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
