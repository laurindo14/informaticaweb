import React from 'react'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
const Colors = React.lazy(() => import('./views/theme/colors/Colors'))
const Typography = React.lazy(() => import('./views/theme/typography/Typography'))

// Base
const Accordion = React.lazy(() => import('./views/base/accordion/Accordion'))
const Breadcrumbs = React.lazy(() => import('./views/base/breadcrumbs/Breadcrumbs'))
const Cards = React.lazy(() => import('./views/base/cards/Cards'))
const Carousels = React.lazy(() => import('./views/base/carousels/Carousels'))
const Collapses = React.lazy(() => import('./views/base/collapses/Collapses'))
const ListGroups = React.lazy(() => import('./views/base/list-groups/ListGroups'))
const Navs = React.lazy(() => import('./views/base/navs/Navs'))
const Paginations = React.lazy(() => import('./views/base/paginations/Paginations'))
const Placeholders = React.lazy(() => import('./views/base/placeholders/Placeholders'))
const Popovers = React.lazy(() => import('./views/base/popovers/Popovers'))
const Progress = React.lazy(() => import('./views/base/progress/Progress'))
const Spinners = React.lazy(() => import('./views/base/spinners/Spinners'))
const Tabs = React.lazy(() => import('./views/base/tabs/Tabs'))
const Tables = React.lazy(() => import('./views/base/tables/Tables'))
const Tooltips = React.lazy(() => import('./views/base/tooltips/Tooltips'))

// Buttons
const Buttons = React.lazy(() => import('./views/buttons/buttons/Buttons'))
const ButtonGroups = React.lazy(() => import('./views/buttons/button-groups/ButtonGroups'))
const Dropdowns = React.lazy(() => import('./views/buttons/dropdowns/Dropdowns'))

//Forms
const ChecksRadios = React.lazy(() => import('./views/forms/checks-radios/ChecksRadios'))
const FloatingLabels = React.lazy(() => import('./views/forms/floating-labels/FloatingLabels'))
const FormControl = React.lazy(() => import('./views/forms/form-control/FormControl'))
const InputGroup = React.lazy(() => import('./views/forms/input-group/InputGroup'))
const Layout = React.lazy(() => import('./views/forms/layout/Layout'))
const Range = React.lazy(() => import('./views/forms/range/Range'))
const Select = React.lazy(() => import('./views/forms/select/Select'))
const Validation = React.lazy(() => import('./views/forms/validation/Validation'))

const Charts = React.lazy(() => import('./views/charts/Charts'))

// Icons
const CoreUIIcons = React.lazy(() => import('./views/icons/coreui-icons/CoreUIIcons'))
const Flags = React.lazy(() => import('./views/icons/flags/Flags'))
const Brands = React.lazy(() => import('./views/icons/brands/Brands'))

// Notifications
const Alerts = React.lazy(() => import('./views/notifications/alerts/Alerts'))
const Badges = React.lazy(() => import('./views/notifications/badges/Badges'))
const Modals = React.lazy(() => import('./views/notifications/modals/Modals'))
const Toasts = React.lazy(() => import('./views/notifications/toasts/Toasts'))

const Widgets = React.lazy(() => import('./views/widgets/Widgets'))

const FluxoFinanceiroList = React.lazy(() => import('./views/fluxoFinanceiro/FluxoFinanceiroList'))
const FluxoFinanceiroAdd = React.lazy(() => import('./views/fluxoFinanceiro/FluxoFinanceiroAdd'))
const ClienteAdd = React.lazy(() => import('./views/cliente/ClienteAdd'));
const ClienteList = React.lazy(() => import('./views/cliente/ClienteList'));
const AvaliacaoProdutoAdd = React.lazy(() => import('./views/avaliacaoProduto/avaliacaoProdutoAdd'))
const AvaliacaoProdutoList = React.lazy(() => import('./views/avaliacaoProduto/avaliacaoProdutoList'))
const CartaoAdd = React.lazy(() => import('./views/cartao/cartaoAdd'))
const CartaoList = React.lazy(() => import('./views/cartao/cartaoList'))
const CategoriaAdd = React.lazy(() => import('./views/categoria/categoriaAdd'))
const CategoriaList = React.lazy(() => import('./views/categoria/categoriaList'))
const EnderecoAdd = React.lazy(() => import('./views/endereco/enderecoAdd'))
const EnderecoList = React.lazy(() => import('./views/endereco/enderecoList'))
const EntregaAdd = React.lazy(() => import('./views/entrega/entregaAdd'))
const EntregaList = React.lazy(() => import('./views/entrega/entregaList'))
const EstoqueAdd = React.lazy(() => import('./views/estoque/estoqueAdd'))
const EstoqueList = React.lazy(() => import('./views/estoque/estoqueList'))
const HistoricoEntregaAdd = React.lazy(() => import('./views/historicoEntrega/historicoEntregaAdd'))
const HistoricoEntregaList = React.lazy(() => import('./views/historicoEntrega/historicoEntregaList'))
const ImagemProdutoAdd = React.lazy(() => import('./views/imagemProduto/imagemProdutoAdd'))
const ImagemProdutoList = React.lazy(() => import('./views/imagemProduto/imagemProdutoList'))
const ItemVendaAdd = React.lazy(() => import('./views/itemVenda/itemVendaAdd'))
const ItemVendaList = React.lazy(() => import('./views/itemVenda/itemVendaList'))
const PermissaoAdd = React.lazy(() => import('./views/permissao/permissaoAdd'))
const PermissaoList = React.lazy(() => import('./views/permissao/permissaoList'))
const ProdutoAdd = React.lazy(() => import('./views/produto/produtoAdd'))
const ProdutoList = React.lazy(() => import('./views/produto/produtoList'))
const ProdutoEstoqueAdd = React.lazy(() => import('./views/produtoEstoque/produtoEstoqueAdd'))
const ProdutoEstoqueList = React.lazy(() => import('./views/produtoEstoque/produtoEstoqueList'))
const ProdutoFornecedorAdd = React.lazy(() => import('./views/produtoFornecedor/produtoFornecedorAdd'))
const ProdutoFornecedorList = React.lazy(() => import('./views/produtoFornecedor/produtoFornecedorList'))
const TransportadoraAdd = React.lazy(() => import('./views/transportadora/transportadoraAdd'))
const TranspostadoraList = React.lazy(() => import('./views/transportadora/transportadoraList'))
const UsuarioList = React.lazy(() => import('./views/usuario/usuarioList'))
const UsuarioAdd = React.lazy(() => import('./views/usuario/usuarioAdd'))
const VendaList = React.lazy(() => import('./views/venda/vendaList'))
const VendaAdd = React.lazy(() => import('./views/venda/vendaAdd'))





const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/avaliacaoProduto/list', name: 'Avaliação Produto List', element: AvaliacaoProdutoList },
  { path: '/avaliacaoProduto/add', name: 'Usuário Produto Add', element: AvaliacaoProdutoAdd },
  { path: '/cartao/list', name: 'Cartão List', element: CartaoList },
  { path: '/FluxoFinanceiro/add', name: 'Adicionar Fluxo', element: FluxoFinanceiroAdd },
  { path: '/FluxoFinanceiro/list', name: 'Listar Fluxo', element: FluxoFinanceiroList },
  { path: '/cartao/add', name: 'Cartão Add', element: CartaoAdd },
  { path: '/cliente/add', name: 'Adicionar Cliente', element: ClienteAdd },
  { path: '/cliente/list', name: 'Listar Clientes', element: ClienteList },
  { path: '/venda/add', name: 'Adicionar Vendas', element: VendaAdd },
  { path: '/venda/list', name: 'Listar Vendas', element: VendaList },
  { path: '/categoria/list', name: 'Categoria List', element: CategoriaList },
  { path: '/categoria/add', name: 'Categoria Add', element: CategoriaAdd },
  { path: '/endereco/list', name: 'Endereço List', element: EnderecoList },
  { path: '/endereco/add', name: 'Endreço Add', element: EnderecoAdd },
  { path: '/entrega/list', name: 'Entrega List', element: EntregaList },
  { path: '/entrega/add', name: 'Entrega Add', element: EntregaAdd },
  { path: '/estoque/list', name: 'Estoque List', element: EstoqueList },
  { path: '/estoque/add', name: 'Estoque Add', element: EstoqueAdd },
  { path: '/historicoEntrega/list', name: 'Historico Entrega List', element: HistoricoEntregaList },
  { path: '/historicoEntrega/add', name: 'Hitorico Entrega Add', element: HistoricoEntregaAdd },
  { path: '/imagemProduto/list', name: 'Imagem Produto List', element: ImagemProdutoList },
  { path: '/imagemProduto/add', name: 'Imagem Produto Add', element: ImagemProdutoAdd },
  { path: '/permissao/list', name: 'Permissão List', element: PermissaoList},
  { path: '/permissao/add', name: 'Permissão Add', element: PermissaoAdd },
  { path: '/produto/list', name: 'Produto List', element: ProdutoList },
  { path: '/produto/add', name: 'Produto Add', element: ProdutoAdd },
  { path: '/produtoEstoque/list', name: 'Produto Estoque List', element: ProdutoEstoqueList },
  { path: '/produtoEstoque/add', name: 'Produto Estoque Add', element: ProdutoEstoqueAdd },
  { path: '/produtoFornecedor/list', name: 'Produto Fornecedor List', element: ProdutoFornecedorList },
  { path: '/produtoFornecedor/add', name: 'Produto Fornecedor Add', element: ProdutoFornecedorAdd },
  { path: '/transportadora/list', name: 'Transportadora List', element: TranspostadoraList },
  { path: '/transportadora/add', name: 'Transportadora Add', element: TransportadoraAdd },
  { path: '/usuario/list', name: 'Usuário List', element: UsuarioList },
  { path: '/usuario/add', name: 'Usuário Add', element: UsuarioAdd },
  { path: '/theme', name: 'Theme', element: Colors, exact: true },
  { path: '/theme/colors', name: 'Colors', element: Colors },
  { path: '/theme/typography', name: 'Typography', element: Typography },
  { path: '/base', name: 'Base', element: Cards, exact: true },
  { path: '/base/accordion', name: 'Accordion', element: Accordion },
  { path: '/base/breadcrumbs', name: 'Breadcrumbs', element: Breadcrumbs },
  { path: '/base/cards', name: 'Cards', element: Cards },
  { path: '/base/carousels', name: 'Carousel', element: Carousels },
  { path: '/base/collapses', name: 'Collapse', element: Collapses },
  { path: '/base/list-groups', name: 'List Groups', element: ListGroups },
  { path: '/base/navs', name: 'Navs', element: Navs },
  { path: '/base/paginations', name: 'Paginations', element: Paginations },
  { path: '/base/placeholders', name: 'Placeholders', element: Placeholders },
  { path: '/base/popovers', name: 'Popovers', element: Popovers },
  { path: '/base/progress', name: 'Progress', element: Progress },
  { path: '/base/spinners', name: 'Spinners', element: Spinners },
  { path: '/base/tabs', name: 'Tabs', element: Tabs },
  { path: '/base/tables', name: 'Tables', element: Tables },
  { path: '/base/tooltips', name: 'Tooltips', element: Tooltips },
  { path: '/buttons', name: 'Buttons', element: Buttons, exact: true },
  { path: '/buttons/buttons', name: 'Buttons', element: Buttons },
  { path: '/buttons/dropdowns', name: 'Dropdowns', element: Dropdowns },
  { path: '/buttons/button-groups', name: 'Button Groups', element: ButtonGroups },
  { path: '/charts', name: 'Charts', element: Charts },
  { path: '/forms', name: 'Forms', element: FormControl, exact: true },
  { path: '/forms/form-control', name: 'Form Control', element: FormControl },
  { path: '/forms/select', name: 'Select', element: Select },
  { path: '/forms/checks-radios', name: 'Checks & Radios', element: ChecksRadios },
  { path: '/forms/range', name: 'Range', element: Range },
  { path: '/forms/input-group', name: 'Input Group', element: InputGroup },
  { path: '/forms/floating-labels', name: 'Floating Labels', element: FloatingLabels },
  { path: '/forms/layout', name: 'Layout', element: Layout },
  { path: '/forms/validation', name: 'Validation', element: Validation },
  { path: '/icons', exact: true, name: 'Icons', element: CoreUIIcons },
  { path: '/icons/coreui-icons', name: 'CoreUI Icons', element: CoreUIIcons },
  { path: '/icons/flags', name: 'Flags', element: Flags },
  { path: '/icons/brands', name: 'Brands', element: Brands },
  { path: '/notifications', name: 'Notifications', element: Alerts, exact: true },
  { path: '/notifications/alerts', name: 'Alerts', element: Alerts },
  { path: '/notifications/badges', name: 'Badges', element: Badges },
  { path: '/notifications/modals', name: 'Modals', element: Modals },
  { path: '/notifications/toasts', name: 'Toasts', element: Toasts },
  { path: '/widgets', name: 'Widgets', element: Widgets },
]

export default routes