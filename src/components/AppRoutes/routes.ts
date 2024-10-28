import { OPTIONAL_ROUTES, ROUTES_AUTHED_NAVBAR, ROUTES_CATEGORY, ROUTES_NAVBAR, ROUTES_PATH, ROUTES_SOCIALS_HANDLER } from '../../routes/routes'
import MailRuAuthHandler from '../../services/auth/authSocials/MailRu/MailRuAuthHandler'
import VkAuthHandler from '../../services/auth/authSocials/Vk/VkAuthHandler'
import YandexAuthHandler from '../../services/auth/authSocials/Yandex/YandexAuthHandler'
import BalancePage from '../BalancePage/BalancePage'
import CreateOrder from '../CreateOrder/CreateOrder'
import CategoryType from '../CreateOrder/CreateOrderMaterials/CategoryType/CategoryType'
import CategoryVendorInfo from '../CreateOrder/CreateOrderMaterials/CategoryType/CategoryVendorPage/CategoryVendorInfo'
import CategoryVendorProfile from '../CreateOrder/CreateOrderMaterials/CategoryType/CategoryVendorPage/CategoryVendorProfile/CategoryVendorProfile'
import VendorEditRequesites from '../CreateOrder/CreateOrderMaterials/CategoryType/CategoryVendorPage/CategoryVendorProfile/VendorRequesites/VendorEditReq/VendorEditRequesites'
import VendorRequesites from '../CreateOrder/CreateOrderMaterials/CategoryType/CategoryVendorPage/CategoryVendorProfile/VendorRequesites/VendorRequesites'
import ModalRegisterFormInfo from '../CreateOrder/CreateOrderMaterials/CategoryType/ModalRegisterForms/ModalRegisterFormInfo'
import EditOrder from '../CreateOrder/edit/EditOrder'
import EditMasterResume from '../CreateOrder/WorkersAndMasters/MastersMarket/ShowMasters/CardMasters/CardMastersDetail/CardMasterResume/EditMasterResume'
import CardMastersDetail from '../CreateOrder/WorkersAndMasters/MastersMarket/ShowMasters/CardMasters/CardMastersDetail/CardMastersDetail'
import CardVakancyDetail from '../CreateOrder/WorkersAndMasters/MastersMarket/ShowMasters/CardVakancy/CardVakancyDetail/CardVakancyDetail'
import ShowMastersOrVakancy from '../CreateOrder/WorkersAndMasters/MastersMarket/ShowMasters/ShowMastersOrVakancy'

import UserMastersProfile from '../CreateOrder/WorkersAndMasters/MastersMarket/UserMastersProfile/UserMastersProfile'
import WorkersAndMasters from '../CreateOrder/WorkersAndMasters/WorkersAndMasters'
import CardWorkersEdit from '../CreateOrder/WorkersAndMasters/WorkersMarket/CardWorkers/MyCardOrdersEdit'
import FindWorkers from '../CreateOrder/WorkersAndMasters/WorkersMarket/FindWorkers/FindWorkers'
import ShowWorkersOrders from '../CreateOrder/WorkersAndMasters/WorkersMarket/ShowWorkersOrders/ShowWorkersOrders'
import UserWorkerProfile from '../CreateOrder/WorkersAndMasters/WorkersMarket/UserProfile/UserWorkerProfile'
import ErrorPage from '../ErrorPage/ErrorPage'
import BuildExpertise from '../MainPage/Categories/CategoryCardDetail/BuildExpertise/BuildExpertise'
import BuildingAndRepair from '../MainPage/Categories/CategoryCardDetail/BuildingAndRepair/BuildingAndRepair'
import CleaningCardDetail from '../MainPage/Categories/CategoryCardDetail/CleaningCardDetail/CleaningCardDetail'
import GeoCard from '../MainPage/Categories/CategoryCardDetail/GeoCard/GeoCard'
import ProjectAndDesign from '../MainPage/Categories/CategoryCardDetail/ProjectAndDesign/ProjectAndDesign'
import RentCardDetail from '../MainPage/Categories/CategoryCardDetail/RentCardDetail/RentCardDetail'
import TruckingAndServices from '../MainPage/Categories/CategoryCardDetail/TruckingAndServices/TruckingAndServices'
import MainPage from '../MainPage/MainPage'
import MapProject from '../MapProject/MapProject'
import NewOrderProject from '../OrdersAndProjectsPage/OrderProject/NewOrderProject/NewOrderProject'
import OrdersAndProjectsPage from '../OrdersAndProjectsPage/OrdersAndProjectsPage'
import FullPortfolio from '../Profile/MyProfile/AboutProfile/TabsComponents/Portfolio/FullPortfolio'
import EditServices from '../Profile/MyProfile/AboutProfile/TabsComponents/Services/EditServices/modal/EditServices'
import ConnectedServices from '../Profile/MyProfile/ConnectedServices/ConnectedServices'
import Favorites from '../Profile/MyProfile/Favorites/Favorites'
import MyProfile from '../Profile/MyProfile/MyProfile'
import Settings from '../Profile/MyProfile/Settings/Settings'
import UserProfile from '../Profile/UserProfile/UserProfile'
import CardOrderEditCard from '../SearchOrder/CardOrderInfo/CardOrderEditCard/CardOrderEditCard'
import SearchOrder from '../SearchOrder/SearchOrder'
import CreateSigns from '../Signs/CreateSigns'
import Signs from '../Signs/Signs'
import SignsEditCard from '../Signs/SignsCard/modal/SignsEditCard'

export const routes = [
	{
		path: ROUTES_PATH.main,
		element: MainPage,
		auth: false
	},
	{
		path: ROUTES_NAVBAR.createOrder,
		element: CreateOrder,
		auth: false
	},
	{
		path: ROUTES_NAVBAR.signs,
		element: Signs,
		auth: false
	},
	{
		path: ROUTES_NAVBAR.createSigns,
		element: CreateSigns,
		auth: false
	},
	{
		path: OPTIONAL_ROUTES.editOrder,
		element: EditOrder,
		auth: true
	},
	{
		path: ROUTES_NAVBAR.searchOrder,
		element: SearchOrder,
		auth: false
	},
	{
		path: ROUTES_PATH.myProfile,
		element: MyProfile,
		auth: true
	},
	{
		path: ROUTES_CATEGORY.editServicesInProfile,
		element: EditServices,
		auth: true
	},
	{
		path: '*',
		element: ErrorPage,
		auth: false
	},
	{
		path: ROUTES_AUTHED_NAVBAR.ordersAndProjects,
		element: OrdersAndProjectsPage,
		auth: true
	},
	{
		path: ROUTES_AUTHED_NAVBAR.balance,
		element: BalancePage,
		auth: true
	},
	{
		path: OPTIONAL_ROUTES.userProfile,
		element: UserProfile,
		auth: false
	},
	{
		path: ROUTES_CATEGORY.portfolio,
		element: FullPortfolio,
		auth: false
	},
	{
		path: ROUTES_PATH.settings,
		element: Settings,
		auth: true
	},
	{
		path: ROUTES_PATH.favorites,
		element: Favorites,
		auth: true
	},
	{
		path: ROUTES_PATH.connectedServices,
		element: ConnectedServices,
		auth: true
	},
	{
		path: ROUTES_PATH.vendorsAndMaterials,
		element: CategoryType,
		auth: false
	},
	{
		path: ROUTES_PATH.vendors,
		element: CategoryVendorInfo,
		auth: false
	},
	{
		path: ROUTES_PATH.registerVendors,
		element: ModalRegisterFormInfo,
		auth: false
	},
	{
		path: ROUTES_PATH.vendorsProfile,
		element: CategoryVendorProfile,
		auth: false
	},
	{
		path: ROUTES_PATH.vendorsProfileRequisistes,
		element: VendorRequesites,
		auth: false    /* проверить потом тру или фолс */
	},
	{
		path: ROUTES_PATH.vendorsProfileEditRequisistes,
		element: VendorEditRequesites,
		auth: false    /* проверить потом тру или фолс */
	},
	{
		path: ROUTES_PATH.signsEditCard,
		element: SignsEditCard,
		auth: false
	},
	{
		path: ROUTES_CATEGORY.workersAndMasters,
		element: WorkersAndMasters,
		auth: false
	},
	{
		path: ROUTES_CATEGORY.findWorkers,
		element: FindWorkers,
		auth: false
	},
	{
		path: ROUTES_CATEGORY.cardWorkersEditCard,
		element: CardWorkersEdit,
		auth: false
	},
	{
		path: ROUTES_CATEGORY.showWorkersOrder,
		element: ShowWorkersOrders,
		auth: false
	},
	{
		path: ROUTES_CATEGORY.showWorkersOrder,
		element: ShowWorkersOrders,
		auth: false
	},
	{
		path: OPTIONAL_ROUTES.userWorkersProfile,
		element: UserWorkerProfile,
		auth: false
	},
	{
		path: OPTIONAL_ROUTES.userMastersProfile,
		element: UserMastersProfile,
		auth: false
	},
	{
		path: ROUTES_CATEGORY.showMasters,
		element: ShowMastersOrVakancy,
		auth: false
	},
	{
		path: ROUTES_CATEGORY.mastersDetail,
		element: CardMastersDetail,
		auth: false
	},
	{
		path: ROUTES_CATEGORY.showVakancy,
		element: ShowMastersOrVakancy,
		auth: false
	},
	{
		path: ROUTES_CATEGORY.vakancyCardDetail,
		element: CardVakancyDetail,
		auth: false
	},
	{
		path: ROUTES_CATEGORY.ordersAndProjectsEditCard,
		element: CardOrderEditCard,
		auth: false
	},
	{
		path: ROUTES_CATEGORY.ordersAndProjectsNewProject,
		element: NewOrderProject,
		auth: false
	},
	{
		path: ROUTES_CATEGORY.mastersResume,
		element: EditMasterResume,
		auth: false
	},
	{
		path: ROUTES_SOCIALS_HANDLER.vkHandler,
		element: VkAuthHandler,
		auth: false
	},

	{
		path: ROUTES_SOCIALS_HANDLER.yandexHandler,
		element: YandexAuthHandler,
		auth: false
	},
	{
		path: ROUTES_SOCIALS_HANDLER.mailruHandler,
		element: MailRuAuthHandler,
		auth: false
	},
	{
		path: ROUTES_CATEGORY.projectMap,
		element: MapProject,
		auth: false
	},
	{
		path: ROUTES_CATEGORY.projectAndDesign,
		element: ProjectAndDesign,
		auth: false
	},
	{
		path: ROUTES_CATEGORY.buildingAndRepair,
		element: BuildingAndRepair,
		auth: false
	},
	{
		path: ROUTES_CATEGORY.geo,
		element: GeoCard,
		auth: false
	},
	{
		path: ROUTES_CATEGORY.truckingAndServices,
		element: TruckingAndServices,
		auth: false
	},

	{
		path: ROUTES_CATEGORY.buildExpertise,
		element: BuildExpertise,
		auth: false
	},
	{
		path: ROUTES_CATEGORY.cleaning,
		element: CleaningCardDetail,
		auth: false
	},
	{
		path: ROUTES_CATEGORY.rent,
		element: RentCardDetail,
		auth: false
	},

]