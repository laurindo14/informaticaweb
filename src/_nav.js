import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilBell,
  cilCalculator,
  cilChartPie,
  cilCreditCard,
  cilCursor,
  cilDescription,
  cilDrop,
  cilExternalLink,
  cilHome,
  cilList,
  cilNotes,
  cilPencil,
  cilPeople,
  cilPuzzle,
  cilSpeedometer,
  cilStar,
  cilUser,
} from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'

const _nav = [

  

  {
    component: CNavGroup,
    name: 'Usuário',
    to: '/usuario',
    icon: <CIcon icon={cilUser} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Adicionar',
        to: '/usuario/add',
      },
      {
        component: CNavItem,
        name: 'Listar',
        to: '/usuario/list',
      }
    ],
  },
  {
    component: CNavGroup,
    name: 'Categoria',
    to: '/categoria',
    icon: <CIcon icon={cilList} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Adicionar',
        to: '/categoria/add',
      },
      {
        component: CNavItem,
        name: 'Listar',
        to: '/categoria/list',
      }
    ],
  },
  {
    component: CNavGroup,
    name: 'Cartão',
    to: '/cartao',
    icon: <CIcon icon={cilCreditCard} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Adicionar',
        to: '/cartao/add',
      },
      {
        component: CNavItem,
        name: 'Listar',
        to: '/cartao/list',
      }
    ],
  },
  {
    component: CNavGroup,
    name: 'Endereço',
    to: '/endereco',
    icon: <CIcon icon={cilHome} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Adicionar',
        to: '/endereco/add',
      },
      {
        component: CNavItem,
        name: 'Listar',
        to: '/endereco/list',
      }
    ],
  },
  {
    component: CNavGroup,
    name: 'Cliente',
    to: '/cliente',
    icon: <CIcon icon={cilPeople} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Adicionar',
        to: '/cliente/add',
      },
      {
        component: CNavItem,
        name: 'Listar',
        to: '/cliente/list',
      }
    ],
  },
  {
    component: CNavGroup,
    name: 'Fluxo Financeiro ',
    to: '/FluxoFinanceiro',
    icon: <CIcon icon={cilPeople} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Adicionar',
        to: '/FluxoFinanceiro/add',
      },
      {
        component: CNavItem,
        name: 'Listar',
        to: '/FluxoFinanceiro/list',
      }
    ],
  },
  

  
  
  
  
  
]

export default _nav
