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

const PermissaoAdd = () => {
  const [nome, setNome] = useState('');
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const permissaoId = searchParams.get('id');
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    if (permissaoId) {
      const fetchPermissao = async () => {
        try {
          const response = await api.get(`/permissao/${permissaoId}`);
          const { nome } = response.data;
          setNome(nome);
        } catch (error) {
          console.error('Erro ao buscar permissão:', error);
        }
      };
      fetchPermissao();
    }
  }, [permissaoId]);

  const handleSave = async (e) => {
    e.preventDefault();
    const permissaoData = { nome };
    try {
      if (permissaoId) {
        await api.put(`/permissao/${permissaoId}`, permissaoData);
      } else {
        await api.post('/permissao', permissaoData);
      }
      setModalVisible(true);
      resetForm();
    } catch (error) {
      console.error('Erro ao salvar a permissão:', error);
      alert('Erro ao salvar a permissão');
    }
  };

  const resetForm = () => {
    setNome('');
  };

  return (
    <>
      <CCard>
        <CCardBody>
          <h4>{permissaoId ? 'Editar Permissão' : 'Adicionar Permissão'}</h4>
          <CForm onSubmit={handleSave}>
            <div className="mb-3">
              <CFormLabel htmlFor="nomePermissao">Nome</CFormLabel>
              <CFormInput
                type="text"
                id="nome"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
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
        <CModalBody>Permissão salva com sucesso!</CModalBody>
        <CModalFooter>
          <CButton color="primary" onClick={() => setModalVisible(false)}>
            Fechar
          </CButton>
        </CModalFooter>
      </CModal>
    </>
  );
};

export default PermissaoAdd;

