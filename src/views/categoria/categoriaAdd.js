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

const CategoriaAdd = () => {
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [categoriaPai, setCategoriaPai] = useState('');
  const [categorias, setCategorias] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);
  const categoriaId = searchParams.get('id');

  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        const response = await api.get('/categoria');
        setCategorias(response.data);
      } catch (error) {
        console.error('Erro ao buscar categorias:', error);
      }
    };
    fetchCategorias();
  }, []);

  useEffect(() => {
    if (categoriaId) {
      const fetchCategoria = async () => {
        try {
          const response = await api.get(`/categoria/${categoriaId}`);
          const { nome, descricao, categoriaPai } = response.data;
          setNome(nome);
          setDescricao(descricao);
          setCategoriaPai(categoriaPai ? categoriaPai.id : '');
        } catch (error) {
          console.error('Erro ao carregar categoria:', error);
        }
      };
      fetchCategoria();
    }
  }, [categoriaId]);

  const handleSave = async (e) => {
    e.preventDefault();

    const categoriaData = {
      nome,
      descricao,
      categoriaPai: categoriaPai ? { id: categoriaPai } : null,
    };

    try {
      if (categoriaId) {
        await api.put(`/categoria/${categoriaId}`, categoriaData);
      } else {
        await api.post('/categoria', categoriaData);
      }
      setModalVisible(true);
      resetForm();
    } catch (error) {
      console.error('Erro ao salvar a categoria:', error);
      alert('Erro ao salvar a categoria');
    }
  };

  const resetForm = () => {
    setNome('');
    setDescricao('');
    setCategoriaPai('');
  };

  return (
    <>
      <CCard>
        <CCardBody>
          <h4>{categoriaId ? 'Editar Categoria' : 'Adicionar Categoria'}</h4>
          <CForm onSubmit={handleSave}>
            <div className="mb-3">
              <CFormLabel htmlFor="nomeCategoria">Nome</CFormLabel>
              <CFormInput
                type="text"
                id="nomeCategoria"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <CFormLabel htmlFor="descricaoCategoria">Descrição</CFormLabel>
              <CFormInput
                type="text"
                id="descricaoCategoria"
                value={descricao}
                onChange={(e) => setDescricao(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <CFormLabel htmlFor="categoriaPai">Categoria Pai</CFormLabel>
              <CFormSelect
                id="categoriaPai"
                value={categoriaPai}
                onChange={(e) => setCategoriaPai(e.target.value)}
              >
                <option value="">Selecione uma Categoria Pai</option>
                {categorias.map((categoria) => (
                  <option key={categoria.id} value={categoria.id}>
                    {categoria.nome}
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
        <CModalBody>Categoria salva com sucesso!</CModalBody>
        <CModalFooter>
          <CButton color="primary" onClick={() => setModalVisible(false)}>
            Fechar
          </CButton>
        </CModalFooter>
      </CModal>
    </>
  );
};

export default CategoriaAdd;
