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

const VendaAdd = () => {
  const [data, setData] = useState('');
  const [clienteId, setClienteId] = useState('');
  const [endereco, setEnderecoEntrega] = useState('');
  const [vendaPai, setVendaPai] = useState(''); // Referência para a venda pai
  const [vendas, setVendas] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);
  const vendaId = searchParams.get('id');

  useEffect(() => {
    const fetchVendas = async () => {
      try {
        const response = await api.get('/venda');
        setVendas(response.data);
      } catch (error) {
        console.error('Erro ao buscar vendas:', error);
      }
    };
    fetchVendas();
  }, []);

  useEffect(() => {
    if (vendaId) {
      const fetchVenda = async () => {
        try {
          const response = await api.get(`/venda/${vendaId}`);
          const { data, cliente, entrega, parent } = response.data;
          setData(data);
          setClienteId(clienteId );
          setEntregaId(entregaId);
          setVendaPai(vendaPai);
        } catch (error) {
          console.error('Erro ao carregar venda:', error);
        }
      };
      fetchVenda();
    }
  }, [vendaId]);

  const handleSave = async (e) => {
    e.preventDefault();

    const vendaData = {
      data,
      cliente: cliente ? { id: cliente } : null,
      entrega: entrega ? { id: entrega } : null,
      vendaPai: vendaPai ? { id: vendaPai } : null,
    };

    try {
      if (vendaId) {
        await api.put(`/venda/${vendaId}`, vendaData);
      } else {
        await api.post('/venda', vendaData);
      }
      setModalVisible(true);
      resetForm();
    } catch (error) {
      console.error('Erro ao salvar a venda:', error);
      alert('Erro ao salvar a venda');
    }
  };

  const resetForm = () => {
    setData('');
    setClienteId('');
    setEntregaId('');
    setVendaPai('');
  };

  return (
    <>
      <CCard>
        <CCardBody>
          <h4>{vendaId ? 'Editar Venda' : 'Adicionar Venda'}</h4>
          <CForm onSubmit={handleSave}>
            <div className="mb-3">
              <CFormLabel htmlFor="dataVenda">Data</CFormLabel>
              <CFormInput
                type="date"
                id="dataVenda"
                value={data}
                onChange={(e) => setData(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <CFormLabel htmlFor="VendaPai">Venda Pai</CFormLabel>
              <CFormSelect
                id="VendaPai"
                value={parent}
                onChange={(e) => setVendaPai(e.target.value)}
              >
                <option value="">Selecione a Venda </option>
                {Vendas.map((venda) => (
                  <option key={venda.id} value={venda.id}>
                    {venda.nome}
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
        <CModalBody>Venda salva com sucesso!</CModalBody>
        <CModalFooter>
          <CButton color="primary" onClick={() => setModalVisible(false)}>
            Fechar
          </CButton>
        </CModalFooter>
      </CModal>
    </>
  );
};

export default VendaAdd;
