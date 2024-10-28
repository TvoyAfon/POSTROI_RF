import cleaning1_svg from '../assets/images/mainpage_images/cleaning_1.svg'
import cleaning2_svg from '../assets/images/mainpage_images/cleaning_2.svg'

import { useSelector } from 'react-redux'
import building2_svg from '../assets/images/mainpage_images/building2_svg.svg'
import building1_svg from '../assets/images/mainpage_images/building_1.svg'
import materials1_svg from '../assets/images/mainpage_images/materials1_svg.svg'
import materials2_svg from '../assets/images/mainpage_images/materials2_svg.svg'
import tractor1_svg from '../assets/images/mainpage_images/tractor1_svg.svg'
import tractor2_svg from '../assets/images/mainpage_images/tractor2_svg.svg'
import trucking1_svg from '../assets/images/mainpage_images/trucking1_svg.svg'
import trucking2_svg from '../assets/images/mainpage_images/trucking2_svg.svg'
import workers1_svg from '../assets/images/mainpage_images/workers1_svg.svg'
import workers2_svg from '../assets/images/mainpage_images/workers2_svg.svg'
import { ROUTES_AUTHED_NAVBAR, ROUTES_NAVBAR } from '../routes/routes'
import { CategoryOrder } from '../services/order/types/enums'
import { RootState } from '../store/store'


export const categories = ['Строительство и ремонт', 'Проектирование и дизайн', 'Геология,геодезия и кадастровые услуги', 'Поставщики и строительные материалы', 'Грузоперевозки', 'Услуги и спецтехника', 'Строительно-техническая экспертиза и контроль', 'Клининг', 'Аренда инструментов и оборудования', 'Биржа разнорабочих и специалистов']

export const section = ['Раздел', 'Раздел', 'Раздел', 'Раздел', 'Раздел']

export const underSection = ['Подкатегория', 'Подкатегория', 'Подкатегория', 'Подкатегория', 'Подкатегория']

export const materialsCateg = ['Отделочные материалы', 'Строительные материалы', 'Электрика', 'Сантехника', "Вентиляция", "Кровля и фасад", "Другое"]

export const allSteps: any = {
	'Строительство и ремонт': '/6',
	'Грузоперевозки и услуги спецтехники': '/7',
	'Клининг': '/7',
	'Поставщики и строительные материалы': '/6',
	'Биржа разнорабочих и специалистов': '/7',
	'Проектирование и дизайн': '/6',
	'Геология,геодезия и кадастровые услуги': '/6',
	'Аренда инструментов и оборудования': '/6',
	'Строительно-техническая экспертиза и контроль': '/6'
}

export const payMethods = ['Наличными или переводом на карту после получения товара', 'Через приложение в предоплату.Поставщик получит оплату после того, как вы получите товар', 'Напрямую поставщику на расчетный счет в предоплату', 'Напрямую поставщику на расчетный счет в предоплату', 'У поставщика банковской картой через терминал', 'При получении банковской картой через терминал']


export const payMethodsObject = [
	{
		key: 'settlement',
		name: 'Наличными или переводом на карту после получения товара'
	},
	{
		key: 'fromApp',
		name: 'Через приложение в предоплату.Поставщик получит оплату после того, как вы получите товар'
	},
	{
		key: 'directly',
		name: 'Напрямую поставщику на расчетный счет в предоплату'
	},

]

export const categoriesForAnimation = [
	{ name: 'Строительство и ремонт', route: '/6', key: 'building', img1: building1_svg, img2: building2_svg },
	{ name: 'Клининг', route: '/7', key: 'cleaning', img1: cleaning1_svg, img2: cleaning2_svg },
	{ name: 'Стройматериалы', route: '/6', key: 'materials', img1: materials1_svg, img2: materials2_svg },
	{ name: 'Грузоперевозки', route: '/7', key: 'trucking', img1: trucking1_svg, img2: trucking2_svg },
	{ name: 'Услуги и спецтехника', route: '/7', key: 'services', img1: tractor1_svg, img2: tractor2_svg },
	{ name: 'Разнорабочие', route: '/6', key: 'workers', img1: workers1_svg, img2: workers2_svg },
]


export const categoriesData = [
	{
		name: 'Клининг',
		img1: cleaning1_svg,
		img2: cleaning2_svg,
		route: '/7'
	},
	{
		name: 'Строительство и ремонт',
		img1: building1_svg,
		img2: building2_svg,
		route: '/6'
	},
	{
		name: 'Стройматериалы',
		img1: materials1_svg,
		img2: materials2_svg,
		route: '/6'
	},
	{
		name: 'Грузоперевозки',
		img1: trucking1_svg,
		img2: trucking2_svg,
		route: '/7'
	},
	{
		name: 'Услуги и спецтехника',
		img1: tractor1_svg,
		img2: tractor2_svg,
		route: '/7'
	},
	{
		name: 'Разнорабочие',
		img1: workers1_svg,
		img2: workers2_svg,
		route: '/6'
	}
]
export const useCurrentNavRoute = () => {

	const { user } = useSelector((state: RootState) => state.auth)
	const popupRoutes = [
		{
			routeName: user ? 'Заказы и проекты' : 'Создать заказ',
			route: user ? ROUTES_AUTHED_NAVBAR.ordersAndProjects : ROUTES_NAVBAR.createOrder
		},
		{
			routeName: user ? 'Объявления' : 'Найти заказ',
			route: user ? ROUTES_AUTHED_NAVBAR.ads : ROUTES_NAVBAR.searchOrder
		},
		{
			routeName: user ? 'Баланс' : 'Объявления',
			route: user ? ROUTES_AUTHED_NAVBAR.balance : ROUTES_NAVBAR.signs
		},
	]
	return popupRoutes
}

export enum Categories {
	Building = 'Строительство и ремонт',
	ProjectAndDesign = 'Проектирование и дизайн',
	Geo = 'Геология,геодезия и кадастровые услуги',
	TRUCKINGANDSERVCES = 'Грузоперевозки и услуги спецтехники',
	WORKERSANDSPEC = 'Биржа разнорабочих и специалистов',
	Cleaning = 'Клининг',
	Materials = 'Поставщики и строительные материалы',
	BuildExpertise = 'Строительно-техническая экспертиза и контроль',
	Rent = 'Аренда инструментов и оборудования'
}

export enum SubsectionsByBuiding {
	MASTER = 'Мастер на час',
	FINISHING_WORKS = 'Отделочные работы',
	INSTALLATION_WORKS = 'Строительно монтажные работы',
	ELECTRIC = 'Электрика',
	PLUMBING = 'Сантехника',
	INSTALLATION_NETWORKS = 'Монтаж наружных сетей канализации',
	AIR = 'Монтаж систем вентиляции',
	CONDICIONER = 'Монтаж кондиционеров',
	GUARD = 'Монтаж охранной сигнализации',
	FIRE = 'Монтаж пожарной сигнализации',
	WINDOW = 'Монтаж пластиковых окон и алюминиевых конструкций',
	DIAMOND = 'Алмазное бурение и алмазная резка',
	IMPROVEMENT = 'Благоустройство',

	INSTALLATION_WATER = 'Монтаж наружных сетей водопровода',
	INSTALLATION_VIDEO = 'Монтаж систем видео наблюдения',
	INSTALLATION_SKS = 'Монтаж СКС и СКУД',
	INSTALLATION_CROVLE = 'Монтаж кровли',
	INSTALLATION_FASADE = 'Монтаж фасадов'
}

export enum SubSectionsByGeo {
	SKVASHINA = 'Бурение скважины',
	IZISKANIYA = 'Геодезические изыскания',
	IZISKANIYA_GEOLOGIC = 'Геологические изыскания',
	HYDROMETER = 'Гидрометеорологические изыскания',
	KADASTR = 'Кадастровые услуги',
	EKO = 'Экологические изыскания'
}

export enum subsubSectionsByGeo {
	BURENIE_WATER = 'Бурение скважин на воду',
	BURENUE_ISVESTNYAK = 'Бурение скважин на известняк',
	BURENIE_PESOK = 'Бурение скважин на песок',
	OBUSTROISTBO = 'Обустройство скважины',
	OTHER = 'Другое',

	RECORD_UCHASTKA = 'Геодезическая съемка земельного участка',
	GPZU = 'ГПЗУ',
	GEO_OSNOVA = 'Геоподоснова земельного участка',
	RECORD_LANDSCAPE = 'Ландшафтная съемка',
	GEO_BUILDING = 'Геодезия зданий и сооружений',
	GEO_MONITORING = 'Геодезический мониторинг',
	GEO_WORK_LINEAR_OBJECTS = 'Геодезические работы с линейными объектами',
	GEO_WORK_CONSTRUCTION = 'Геодезические работы в строительстве',
	TOPOSURVEY_LEP = 'Топосъемка ЛЭП и электросетей',
	TOPOSURVEY_CONSTRUCTION = 'Топосъемка для разрешения на строительство',
	TOPOSURVEY_WATER = 'Топосъемка водопровода, канализации или теплосетей',
	TOPOSURVEY_TOPOGRAPHIC = 'Топографо-геодезическая съемка',
	TOPOSURVEY_LINEAR = 'Топосъемка линейного объекта',
	TOPOSURVEY_ROSNEDRA = 'Топографическая съемка для Роснедра',
	TOPOSURVEY_GASIFICATION = 'Топографическая съемка для газификации',
	TOPOSURVEY_1_500 = 'Топографическая съемка 1:500',
	TOPOSURVEY_1_200 = 'Топографическая съемка 1:200',
	TOPOSURVEY_DESIGN = 'Топографическая съемка для проектирования',
	TOPOSURVEY_ROADS = 'Топографическая съемка дорог',
	AEROPHOTO_SURVEY = 'Аэрофотосъемка',
	LASER_SCANNING = 'Лазерное сканирование',
	CARTOGRAPHY = 'Картография',

	ENGINEERING_GEOLOGICAL_DRILLING = 'Инженерно-геологическое бурение',
	SOIL_INVESTIGATION = 'Исследование грунтов',
	CONSTRUCTION_GEOLOGY = 'Геология для строительства',
	GEOLOGICAL_SURVEYS = 'Геологические изыскания',
	INLINE_OBJECT_SURVEYS = 'Геологические изыскания линейных объектов',
	GEOLOGICAL_EXPLORATIONS = 'Геологические изыскания',


	MEZHEVOY_PLAN = 'Межевой план земельного участка',
	VYNOS_KOORDINAT = 'Вынос характерных точек в натуру (вынос координат)',
	SHEMA_RASPOLOZHENIYA = 'Схема расположения земельного участка на кадастровом плане территории',
	AKT_OBSEDOVANIYA = 'Акт обследования (снос) объекта',
	TEKH_PASPORT_OBJEKTA = 'Технический паспорт объекта',
	TEKH_PLAN_OBJEKTA = 'Технический план объекта',

	ENG_ECO_SURVEY = 'Инженерно-экологическая съемка территории',
	CHEM_POLLUTION = 'Исследование на химическое загрязнение',
	RADIATION_SURVEY = 'Исследование радиационной обстановки',
	ECO_RESEARCH_ANGAR = 'Экологические изыскания ангара',
	ECO_RESEARCH_LINEAR = 'Экологические изыскания для линейных сооружений',
	ECO_MEASURES_LINEAR = 'Разработка перечня мероприятий по охране окружающей среды для линейных объектов',
	ECO_RESEARCH_PLAZHT_AUTH = 'Экологические изыскания для площадных сооружений',
	ECO_RESEARCH_CONSTRUCTION = 'Экологические изыскания для строительства',
	ECO_RESEARCH_PROJECT = 'Экологические изыскания для проектирования',
	ECO_RESEARCH_EXPERTISE = 'Экологические изыскания для прохождения экспертизы',
	ECO_RESEARCH_REGISTRATION = 'Экологические изыскания для регистрации документов в ВИС-ИСОГД',
	ECO_MEASURES_NONLINEAR = 'Разработка перечня мероприятий по охране окружающей среды для нелинейных объектов',
	ENG_ECO_RESEARCH_SOCIAL = 'Инженерно–экологические изыскания для социальных учреждений',
	ECO_RESEARCH_SCHOOL = 'Экологические изыскания для детского сада, школы',
	ENG_ECO_RESEARCH_HOUSES = 'Инженерно–экологические изыскания для жилых многоквартирных домов'
}



export enum SubsectionsByWorkers {
	WORKER = 'Разнорабочий',
	WORKERS = 'Разнорабочие',
	LOADER = 'Грузчик'
}
export enum SubsectionsByCleaning {
	CLEANING_HOUSE = 'Уборка домов',
	CLEANING_OFFICE = 'Уборка офисов',
	CLEANING_PROM = 'Уборка промышленных объектов',
	AFTER_REPAIR = 'Комплексная уборка объектов после ремонта',
	OTHER = 'Другое'
}
export enum SubsectionsByTruckingAndServices {
	TRUCKING = 'Грузоперевозки',
	CARS = 'Спецтехника'
}

export enum SubsectionByRent {
	RENT_HANDLE = 'Аренда ручного, электро и бензо инструмента',
	RENT_BUILDING = 'Аренда строительного оборудования',
	REPAIR = 'Ремонт оборудования и инструмента'
}
export enum SubsubsectionByRent {
	RENT_HANDLE_HANDLE = 'Аренда ручного инструмента',
	RENT_ISMERIT = 'Аренда измерительного инструмента',
	RENT_ELECTRO = 'Аренда электро и аккумуляторного инструмента',
	RENT_BENSIN = 'Аренда Бензинового и дизельного инструмента',

	RENT_POLYPIPE_WELDER = 'Аппарат для сварки полиэтиленовых труб',
	RENT_GAS_GENERATOR = 'Бензиновый генератор',
	RENT_GAS_CUTTER = 'Бензорез',
	RENT_CONCRETE_MIXER = 'Бетономешалка',
	RENT_CONTAINER = 'Бытовки и вагончики',
	RENT_VIBRO_COMPACTOR = 'Виброкаток',
	RENT_VIBRO_PLATE = 'Виброплита',
	RENT_VIBRO_BEAM = 'Виброрейка для бетона',
	RENT_VIBRO_RAMMER = 'Вибротрамбовка',
	RENT_TOWER_SCAFFOLDING = 'Вышка-тура',
	RENT_CRANE = 'Грузоподъемный кран',
	RENT_DIESEL_GENERATOR = 'Дизельный генератор',
	RENT_DIESEL_COMPRESSORS = 'Дизельные компрессоры',
	RENT_SCREED_MACHINES = 'Затирочные машины для бетона и полусухой стяжки',
	RENT_JOINT_LIFT = 'Коленчатый подъемник',
	RENT_BREAKER_HAMMER = 'Компресорный отбойный молоток',
	RENT_GRINDING_MACHINE = 'Мозаично шлифовальная машина',
	RENT_SCISSOR_LIFT = 'Ножнечный подъемник',
	RENT_CONCRETE_HEATING = 'Оборудование для обогрева бетона',
	RENT_REINFORCEMENT_BENDING = 'Оборудование для гибки арматуры',
	RENT_REINFORCEMENT_CUTTING = 'Оборудование для резки арматуры',
	RENT_FORMWORK = 'Опалубка для бетона и комплектующие',
	RENT_LIGHT_MAST = 'Осветительная мачта',
	RENT_SANDER = 'Паркетно шлифовальная машина',
	RENT_INDUSTRIAL_STEAM_GENERATOR = 'Парогенератор промышленный',
	RENT_TOWER_CRANE = 'Подъемный башенный кран',
	RENT_PAINTING_APPARATUSES = 'Промышленные окрасочные аппараты высокого давления',
	RENT_MORTAR_TANKS = 'Растворные емкости',
	RENT_MORTAR_STATION = 'Растворная станция',
	RENT_MEMBRANE_WELDING = 'Сварочный аппарат для мембранной кровли',
	RENT_PLANING_MACHINE = 'Строгальная машина',
	RENT_CONSTRUCTION_SCAFFOLDING = 'Строительные леса',
	RENT_CONSTRUCTION_TRASH_CONVEYOR = 'Строительный мусоропровод',
	RENT_TELESCOPIC_LIFTS = 'Телескопический подъемник',
	RENT_TELESCOPIC_SUPPORTS = 'Телескопические стойки для опалубки',
	RENT_HEAT_GENERATOR = 'Теплогенератор',
	RENT_DIAMOND_DRILLING = 'Установка алмазного бурения',
	RENT_DIAMOND_CUTTING = 'Установка алмазной резки',
	RENT_GROUND_HEATING = 'Установка прогрева грунта',
	RENT_FACADE_LIFT = 'Фасадный подъемник',
	RENT_CONCRETE_MILLING_MACHINES = 'Фрезеровальные машины по бетону',
	RENT_JOINT_CUTTER = 'Швонарезчик',
	RENT_STACKER = 'Штабелер',
	RENT_PLASTER_STATION = 'Штукатурная станция',
	RENT_ELECTRIC_COMPRESSORS = 'Электрические компрессоры',
	RENT_ELECTRIC_STATIONS = 'Электростанции и подстанции',
	RENT_OTHER = 'Другое'
}

export enum subSubSectionByTruckingAndServices {
	ONE_TONN = 'До 1.5 тонны',
	THREE_TONN = 'До 3 тонн',
	FIVE_TONN = 'До 5 тонн',
	TEN_TONN = 'До 10 тонн',
	TWENTE_TONN = 'До 20 тонн',
	TRUCKING_HARD = 'Перевозка спецтехники, негаборитного или тяжелого груза тралом',
	GABBAGE = 'Вывоз строительного мусора',
	SNOW = 'Вывоз снего',
	GRUNTE = 'Вывоз грунта',
	CHEMENT = 'Цементовоз',
	OTHER_TRUCKING = 'Другое',

	BETON_NASOS = 'Услуги Автобетононасосы',
	VISHKA = 'Услуги Автовышки',
	CRAN = 'Услуги Автокрана',
	ASSENIZATOR = 'Услуги ассенизатора',
	ASPHALT = 'Услуги асфальтоукладчика',
	BETON = 'Услуги бетоновоза',
	BULDOZER = 'Услуги бульдозера',
	VILKA = 'Услуги вилочного погрузчика',
	HYDROMOLOT = 'Услуги гидромолота',
	GRAYDER = 'Услуги грейдера',
	GRAIPHER = 'Услуги грейферного погрузчика',
	SAMOSVAL = 'Услуги грузовых самосвалов и тонаров',
	GRUNTOASPHALTRES = 'Услуги грунтореза и асфальтореза',
	KATOK = 'Услуги дорожного катка',
	ILOSOS = 'Услуги илососа',
	KDM = 'Услуги КДМ',
	MANIPULATOR = 'Услуги манипулятора',
	MINI_LOADER = 'Услуги минипогрузчика',
	MINI_ESCOVATOR = 'Услуги мини-эскаватора',
	MINI_MOLOT = 'Услуги мини-гидромолота',
	BUR_YAMA = 'Услуги мини-ямобура',
	MULTCHER = 'Услуги мульчера',
	EKSKOVATOR = 'Услуги полноповоротного экскаватора',
	SVAEBOI = 'Услуги сваебоя',
	FRONT_LOADER = 'Услуги фронтального погрузчика',
	EKS_LOADER = 'Услуги экскаватора погрузчика',
	YAMOBUR = 'Услуги ямобура',
	OTHER_SERVICE = 'Другое'
}

export enum subsectionByDesign {
	PROJECT = 'Проектирование',
	DESIGN = 'Дизайн'
}
export enum subsubsectionByDesign {
	PRIVATE_HOUSING_DESIGN = 'Проектирование частных жилых домов',
	COMPLEX_RESIDENTIAL_DESIGN = 'Комплексное проектирование жилых зданий',
	COMPLEX_NON_RESIDENTIAL_DESIGN = 'Комплексное проектирование не жилых зданий',
	COMPLEX_INDUSTRIAL_DESIGN = 'Комплексное проектирование промышленных объектов',
	SEPARATE_SECTION_DESIGN = 'Проектирование по отдельным разделам',
	OTHER_PROJECT = 'Другое',

	APARTMENT_AND_PRIVATE_HOUSE_DESIGN = 'Дизайн квартир и частных домов',
	INTERIOR_DESIGN = 'Дизайн интерьера',
	FACADE_DESIGN = 'Дизайн фасадов',
	OFFICE_DESIGN = 'Дизайн офиса',
	LANDSCAPE_DESIGN = 'Ландшафтный дизайн',
	NON_RESIDENTIAL_BUILDING_DESIGN = 'Дизайн нежилых зданий',
	ARCHITECTURAL_DESIGN = 'Архитектурный дизайн',
	STREET_LIGHTING_DESIGN = 'Дизайн уличного освещения',
	OTHER_DESIGN = 'Другое'
}

export enum subSectByExpertise {
	NEZAVISIM = 'Независимая и судебная строительно-техническая экспертиза',
	BUILDING_CONTROL = 'Строительный контроль',
	LABORAT = 'Лабораторные испытания и исследования в строительстве',

}
export enum subsubSectByExpertise {
	QUALITY_EXPERTISE = 'Экспертиза качества строительно-монтажных работ',
	COMPLIANCE_EXPERTISE = 'Экспертиза соответствия ремонтных и строительно-монтажных работ действующим СНиПам и проектно-сметной документации',
	VOLUME_COST_EXPERTISE = 'Экспертиза объёма и стоимости строительно-монтажных работ',
	DEFECTS_COST_EXPERTISE = 'Экспертиза стоимости устранения дефектов, допущенных при строительстве и ремонте зданий, помещений, инженерных коммуникаций',
	CONTRACTOR_PROPOSALS_EXPERTISE = 'Экспертиза обоснованности конкурсных предложений подрядчиков',
	PROJECT_DOCUMENTATION_EXPERTISE = 'Экспертиза проектной документации (проекта)',
	ESTIMATE_DOCUMENTATION_EXPERTISE = 'Экспертиза сметной документации (сметы)',
	ENGINEERING_SYSTEMS_EXPERTISE = 'Экспертиза качества инженерных систем и коммуникаций зданий и сооружений и их соответствие действующим СНиПам, проектно-сметной документации',

	REPLANNING_FEASIBILITY_EXPERTISE = 'Экспертиза возможности осуществления работ по перепланировке строительных объектов (зданий, сооружений, квартир)',
	REPLANNING_COMPLIANCE_EXPERTISE = 'Экспертиза соответствия перепланировок зданий, помещений, самовольно возведенных строений действующим строительным нормам и правилам',
	CAUSAL_RELATIONSHIP_EXPERTISE = 'Экспертиза причинно-следственной связи преобразования конструктивных элементов',
	HABITABILITY_EXPERTISE = 'Экспертиза пригодности здания, домовладения, квартиры и т.п. для проживания',
	CAPITALITY_EXPERTISE = 'Экспертиза капитальности строения, в целях признания (непризнания) его объектом недвижимости',
	ACCIDENT_CAUSES_EXPERTISE = 'Определение причин аварий, источников затоплений (проливов) и т.д.',
	DAMAGE_ASSESSMENT_EXPERTISE = 'Экспертиза по определению величины ущерба, причиненного зданиям, помещениям (квартирам) и т.п., пожаром, затоплением, промерзанием, воздействием на них третьих лиц',
	TECHNICAL_CONDITION_EXPERTISE = 'Экспертиза технического состояния зданий и сооружений',

	NOISE_VIBRATION_MEASUREMENT = 'Замер шума, вибраций в помещениях',
	THERMAL_VISION_INSPECTION = 'Тепловизионное обследование',
	ROAD_SURFACE_EXPERTISE = 'Экспертиза дорожных покрытий, тоннелей, мостов и других объектов',
	WOODEN_HOUSES_EXPERTISE = 'Экспертиза деревянных домов, срубов, бань из оцилиндрованного, клееного, прямоугольно пиленного бруса, каркасных домов, технических построек',
	ACTUAL_COST_EXPERTISE = 'Экспертиза действительной стоимости объектов строительства',
	IMPROVEMENTS_CLASSIFICATION_EXPERTISE = 'Экспертиза с целью классификации отделимых улучшений, реконструкции (неотделимые улучшения), ремонт (капитальный или текущий)',
	INDUSTRIAL_SAFETY_EXPERTISE = 'Экспертиза промышленной безопасности',
	REVIEW_EXPERT_OPINIONS = 'Рецензирование экспертных заключений',
	ENGINEERING_SURVEY_RESULTS_EXPERTISE = 'Экспертиза результатов инженерных изысканий',
	OTHER_EXPERTISE = 'Другое',


	BUILDING_CONTROL_REPAIR = 'Строительный контроль при ремонте квартиры',
	BUILDING_CONTROL_IJSC = 'Строительный контроль при строительстве ИЖС',
	TECHNICAL_CUSTOMER_FUNCTION = 'Функция технического заказчика',
	COMPLEX_BUILDING_CONTROL = 'Комплексный строительный контроль при строительстве зданий и сооружений',
	SEPARATE_TYPE_CONTROL = 'Строительный контроль по отдельным видам',



	LAB_TEST_MATERIALS = 'Лабораторные испытания строительных материалов',
	VISUAL_AND_MEASUREMENT_CONTROL = 'Визуальный и измерительный контроль',
	NDT_CONTROL = 'Неразрушающий контроль',
	ULTRASONIC_CONTROL = 'Ультразвуковой контроль',
	ENTRY_CONTROL = 'Входной контроль',
	ROAD_MATERIAL_TESTING = 'Испытания дорожных материалов',
	ACOUSTIC_CONTROL = 'Акустический контроль',
	HYDRAULIC_TESTING_WATER = 'Гидравлические испытания водопровода',
	HYDRAULIC_TESTING_HEATING = 'Гидравлические испытания теплотрассы и систем отопления',
	ELECTRICAL_LABORATORY = 'Электротехническая лаборатория',
	RADIATION_CONTROL = 'Радиационный контроль готового объекта',
	NON_IONIZING_FACTORS_MEASUREMENT = 'Измерения неионизирующих факторов внутри объекта',
	WATER_ANALYSIS_COLD_HOT_SUPPLY = 'Анализ воды систем холодного и горячего водоснабжения'
}


export enum SubsectionsByMaterials {
	MATERIALS = 'Строительные материалы'
}

export const subSectOfBuilding = ['Мастер на час', 'Отделочные работы', 'Строительно-монтажные работы', 'Электрика', 'Сантехника', 'Монтаж наружных сетей теплоснабжения водопровода и канализации', 'Вентиляция и кондиционеры', 'Охранно-пожарная сигнализация', 'Монтаж пластиковых окон и алюминиевых конструкций', 'Алмазное бурение и алмазная резка', 'Благоустройство']
export const subsubSectofBuilding = ['Подраздел', 'Подраздел', 'Подраздел', 'Подраздел']

export const subbSectOfBuilding = [
	{
		name: 'Мастер на час',
		subsubSection: ['Подраздел 1', 'Подраздел 2']
	},
	{
		name: 'Строительные работы',
		subsubSection: ['Подраздел 1', 'Подраздел 2']
	},
	{
		name: 'Благоустройство',
		subsubSection: ['Подраздел 1', 'Подраздел 2']
	},
	{
		name: 'Проектирование',
		subsubSection: ['Подраздел 1', 'Подраздел 2']
	},
	{
		name: 'Дизайн',
		subsubSection: ['Подраздел 1', 'Подраздел 2']
	},
	{
		name: 'Сантехника',
		subsubSection: ['Подраздел 1', 'Подраздел 2']
	},
	{
		name: 'Электрика',
		subsubSection: ['Подраздел 1', 'Подраздел 2']
	},
	{
		name: 'Охранно-пожарная сигнализация и видеонаблюдение',
		subsubSection: ['Подраздел 1', 'Подраздел 2']
	},
	{
		name: 'Отделочные работы',
		subsubSection: ['Подраздел 1', 'Подраздел 2']
	},
	{
		name: 'Другое',
		subsubSection: ['Подраздел 1', 'Подраздел 2']
	}
]

export const sectionsOfCategories = [
	{
		name: Categories.Building,
		subSection: subSectOfBuilding
	},
	{
		name: Categories.Cleaning,
		subSection: []
	}
]


export const educationalType = ['Среднее', 'Среднее специальное', 'Неоконченное высшее', 'Высшее', 'Бакалавр', 'Магистр', 'Кандидат наук', 'Доктор наук']



interface CategoryMapping {
	[key: string]: CategoryOrder
}

export const categoryMapping: CategoryMapping = {
	'Строительство и ремонт': CategoryOrder.BUILD_REPAIR,
	'Грузоперевозки': CategoryOrder.TRANSPORTATION,
	'Клининг': CategoryOrder.CLEANING,
	'Биржа разнорабочих и специалистов': CategoryOrder.HANDYMAN,
	'Стройматериалы': CategoryOrder.BUILDING_MATERIALS,
	'Услуги спецтехники': CategoryOrder.SPECIAL_EQUIPMENT
}

export enum SubCategoriesOfBuilding {
	MasterForHour = 'Мастер на час',
	FinishingWorks = 'Отделочные работы',
	InstallationAndConstruction = 'Строительно-монтажные работы',
	Electrics = 'Электрика',
	Plumbing = 'Сантехника',
	InstallationOfNetworks = 'Монтаж наружных сетей теплоснабжения,водопровода и канализации',
	VentilationAndAirConditioners = 'Вентиляция и кондиционеры',
	SecurityAndFireAlarm = 'Охранно-пожарная сигнализация',
	InstallationWindows = 'Монтаж пластиковых окон и алюминиевых конструкций',
	DiamondDrilling = 'Алмазное бурение и алмазная резка',
	Improvement = 'Благоустройство',
	InstallationSpecial = 'Монтаж и обслуживание специализированного оборудования и установок'
}

