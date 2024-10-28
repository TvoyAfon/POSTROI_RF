import tgIcon from '../assets/images/auth_images/Artboard.png'
import vkIcon from '../assets/images/auth_images/VK Logo.png'
import yandexIcon from '../assets/images/auth_images/image 40.png'
import gosuslugiIcon from '../assets/images/auth_images/image 41.png'
import mailRuIcon from '../assets/images/auth_images/image 42.png'

export const ROUTES_PATH = {
  main: '/',
  myProfile: '/me',
  settings: '/settings',
  connectedServices: '/connected-services',
  favorites: '/favorites',
  vendorsAndMaterials: '/createorder/vendors-and-materials',
  vendors: '/createorder/vendors-and-materials/vendors',
  registerVendors: '/createorder/vendors-and-materials/register-vendors',
  vendorsProfile: '/createorder/vendors-and-materials/vendors/:id',
  vendorsProfileRequisistes: '/createorder/vendors-and-materials/vendors/:id/requisites',
  vendorsProfileEditRequisistes: '/createorder/vendors-and-materials/vendors/:id/requisites/editReq',
  signsEditCard: '/signs/edit-card/:id',
}

export const ROUTES_NAVBAR = {
  createOrder: '/createorder',
  searchOrder: '/searchorder',
  signs: '/signs',
  createSigns: '/create-signs'
}

export const ROUTES_CATEGORY = {
  vendorsandmaterials: '/createorder/vendors-and-materials',
  vendors: '/createorder/vendors-and-materials/vendors',
  registerVendors: '/createorder/vendors-and-materials/register-vendors',
  vendorsProfile: '/createorder/vendors-and-materials/vendors/:id',
  vendorsProfileRequisistes: '/createorder/vendors-and-materials/vendors/:id/requisites',
  vendorsProfileEditRequisistes: '/createorder/vendors-and-materials/vendors/:id/requisites/editReq',
  signsEditCard: '/signs/edit-card/:id',
  workersAndMasters: '/workers-and-masters',
  findWorkers: '/workers-and-masters/find-workers',
  cardWorkersEditCard: '/workers-and-masters/find-workers/edit-card/:id',
  ordersAndProjectsEditCard: '/orders-and-projects/edit-card/:id',
  ordersAndProjectsNewProject: '/orders-and-projects/project/:id',
  showWorkersOrder: '/workers-and-masters/show-workers-order',
  showMasters: '/workers-and-masters/show-masters',
  showVakancy: '/workers-and-masters/show-vakancy',
  vakancyCardDetail: '/workers-and-masters/show-vakancy/vakancy/:vakancyId',
  mastersDetail: '/workers-and-masters/show-masters/:userId',
  mastersResume: '/mastersProfile/:userId/resume/:resumeId',
  editServicesInProfile: '/profile/:userId/editServices',
  portfolio: '/portfolio/:userId',
  projectMap: '/projectmap',
  projectAndDesign: '/project-and-design',
  buildingAndRepair: '/building-and-repair',
  geo: '/geo',
  truckingAndServices: '/trucking-and-services',
  buildExpertise: '/build-expertise',
  cleaning: '/cleaning',
  rent: '/rent'

}

export const ROUTES_AUTHED_NAVBAR = {
  ordersAndProjects: '/orders-and-projects',
  ads: '/signs',
  balance: '/balance'
}
export const ROUTES_SOCIALS_HANDLER = {
  vkHandler: '/redirect',
  yandexHandler: '/yandex',
  mailruHandler: '/mailru'
}

export const OPTIONAL_ROUTES = {
  userProfile: '/profile/:userId',
  userWorkersProfile: '/workersProfile/:userId',
  userMastersProfile: '/mastersProfile/:userId',
  editOrder: '/edit-order/:orderId'
}

export const ROUTES_NAVBAR_LIST = [...Object.values(ROUTES_NAVBAR), ...Object.values(ROUTES_AUTHED_NAVBAR)]

export const ROUTES_SOCIALS = [
  {
    icon: vkIcon,
    link: '#'
  },
  {
    icon: yandexIcon,
    link: '#'
  },
  {
    icon: tgIcon,
    link: '#'
  },
  {
    icon: gosuslugiIcon,
    link: '#'
  },
  {
    icon: mailRuIcon,
    link: '#'
  }
]