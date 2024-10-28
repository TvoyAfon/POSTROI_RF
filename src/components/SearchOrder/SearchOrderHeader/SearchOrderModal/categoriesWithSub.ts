import { Categories, subSectByExpertise, subsectionByDesign, SubsectionByRent, SubsectionsByBuiding, SubsectionsByCleaning, SubSectionsByGeo, SubsectionsByTruckingAndServices, subsubSectByExpertise, subsubsectionByDesign, SubsubsectionByRent, subSubSectionByTruckingAndServices, subsubSectionsByGeo } from '../../../../common/categories'

export const categoriesWithSubSections = [
	{
		title: Categories.Building,
		subcategories: [
			{
				title: SubsectionsByBuiding.MASTER,
				sections: [
				],
			},
			{
				title: SubsectionsByBuiding.ELECTRIC,
				sections: [
				],
			},
			{
				title: SubsectionsByBuiding.AIR,
				sections: [


				],
			},
			{
				title: SubsectionsByBuiding.FINISHING_WORKS,
				sections: [

				],
			},
			{
				title: SubsectionsByBuiding.GUARD,
				sections: [


				],
			},
			{
				title: SubsectionsByBuiding.PLUMBING,
				sections: [


				],
			},
			{
				title: SubsectionsByBuiding.DIAMOND,
				sections: [


				],
			},
			{
				title: SubsectionsByBuiding.IMPROVEMENT,
				sections: [


				],
			},
			{
				title: SubsectionsByBuiding.WINDOW,
				sections: [


				],
			},
			{
				title: SubsectionsByBuiding.INSTALLATION_NETWORKS,
				sections: [


				],
			},
			{
				title: SubsectionsByBuiding.INSTALLATION_WORKS,
				sections: [


				],
			},
			{
				title: SubsectionsByBuiding.INSTALLATION_CROVLE,
				sections: [

				],
			},
			{
				title: SubsectionsByBuiding.INSTALLATION_FASADE,
				sections: [


				],
			},
			{
				title: SubsectionsByBuiding.INSTALLATION_WATER,
				sections: [

				],
			},
			{
				title: SubsectionsByBuiding.INSTALLATION_SKS,
				sections: [


				],
			},
			{
				title: SubsectionsByBuiding.FIRE,
				sections: [


				],
			},
		],
	},
	{
		title: Categories.Geo,
		subcategories: [
			{
				title: SubSectionsByGeo.SKVASHINA,
				sections: [
					{ title: subsubSectionsByGeo.BURENIE_WATER, content: "Содержимое раздела 2.1.1" },
					{ title: subsubSectionsByGeo.BURENUE_ISVESTNYAK, content: "Содержимое раздела 2.1.2" },
					{ title: subsubSectionsByGeo.BURENIE_PESOK, content: "Содержимое раздела 2.1.1" },
					{ title: subsubSectionsByGeo.OBUSTROISTBO, content: "Содержимое раздела 2.1.2" },
					{ title: subsubSectionsByGeo.OTHER, content: "Содержимое раздела 2.1.1" },

				],
			},
			{
				title: SubSectionsByGeo.IZISKANIYA,
				sections: [
					{ title: subsubSectionsByGeo.RECORD_UCHASTKA, content: "Содержимое раздела 2.1.1" },
					{ title: subsubSectionsByGeo.GPZU, content: "Содержимое раздела 2.1.2" },
					{ title: subsubSectionsByGeo.GEO_OSNOVA, content: "Содержимое раздела 2.1.1" },
					{ title: subsubSectionsByGeo.RECORD_LANDSCAPE, content: "Содержимое раздела 2.1.2" },
					{ title: subsubSectionsByGeo.GEO_BUILDING, content: "Содержимое раздела 2.1.1" },
					{ title: subsubSectionsByGeo.GEO_MONITORING, content: "Содержимое раздела 2.1.2" },
					{ title: subsubSectionsByGeo.GEO_WORK_LINEAR_OBJECTS, content: "Содержимое раздела 2.1.1" },
					{ title: subsubSectionsByGeo.GEO_WORK_CONSTRUCTION, content: "Содержимое раздела 2.1.2" },
					{ title: subsubSectionsByGeo.TOPOSURVEY_LEP, content: "Содержимое раздела 2.1.1" },
					{ title: subsubSectionsByGeo.TOPOSURVEY_CONSTRUCTION, content: "Содержимое раздела 2.1.2" },
					{ title: subsubSectionsByGeo.TOPOSURVEY_WATER, content: "Содержимое раздела 2.1.1" },
					{ title: subsubSectionsByGeo.TOPOSURVEY_TOPOGRAPHIC, content: "Содержимое раздела 2.1.2" },
					{ title: subsubSectionsByGeo.TOPOSURVEY_LINEAR, content: "Содержимое раздела 2.1.1" },
					{ title: subsubSectionsByGeo.TOPOSURVEY_ROSNEDRA, content: "Содержимое раздела 2.1.2" },
					{ title: subsubSectionsByGeo.TOPOSURVEY_GASIFICATION, content: "Содержимое раздела 2.1.2" },
					{ title: subsubSectionsByGeo.TOPOSURVEY_1_500, content: "Содержимое раздела 2.1.1" },
					{ title: subsubSectionsByGeo.TOPOSURVEY_1_200, content: "Содержимое раздела 2.1.2" },
					{ title: subsubSectionsByGeo.TOPOSURVEY_DESIGN, content: "Содержимое раздела 2.1.1" },
					{ title: subsubSectionsByGeo.TOPOSURVEY_ROADS, content: "Содержимое раздела 2.1.2" },
					{ title: subsubSectionsByGeo.AEROPHOTO_SURVEY, content: "Содержимое раздела 2.1.1" },
					{ title: subsubSectionsByGeo.LASER_SCANNING, content: "Содержимое раздела 2.1.2" },
					{ title: subsubSectionsByGeo.CARTOGRAPHY, content: "Содержимое раздела 2.1.1" },
					{ title: subsubSectionsByGeo.OTHER, content: "Содержимое раздела 2.1.1" },
				],
			},
			{
				title: SubSectionsByGeo.IZISKANIYA_GEOLOGIC,
				sections: [
					{ title: subsubSectionsByGeo.ENGINEERING_GEOLOGICAL_DRILLING, content: "Содержимое раздела 2.1.2" },
					{ title: subsubSectionsByGeo.SOIL_INVESTIGATION, content: "Содержимое раздела 2.1.1" },
					{ title: subsubSectionsByGeo.CONSTRUCTION_GEOLOGY, content: "Содержимое раздела 2.1.2" },
					{ title: subsubSectionsByGeo.GEOLOGICAL_SURVEYS, content: "Содержимое раздела 2.1.1" },
					{ title: subsubSectionsByGeo.INLINE_OBJECT_SURVEYS, content: "Содержимое раздела 2.1.2" },
					{ title: subsubSectionsByGeo.GEOLOGICAL_EXPLORATIONS, content: "Содержимое раздела 2.1.1" },
					{ title: subsubSectionsByGeo.OTHER, content: "Содержимое раздела 2.1.2" },
					{ title: subsubSectionsByGeo.CARTOGRAPHY, content: "Содержимое раздела 2.1.1" },
				],
			},
			{
				title: SubSectionsByGeo.HYDROMETER,
				sections: [

				],
			},
			{
				title: SubSectionsByGeo.KADASTR,
				sections: [
					{ title: subsubSectionsByGeo.MEZHEVOY_PLAN, content: "Содержимое раздела 2.1.1" },
					{ title: subsubSectionsByGeo.VYNOS_KOORDINAT, content: "Содержимое раздела 2.1.2" },
					{ title: subsubSectionsByGeo.SHEMA_RASPOLOZHENIYA, content: "Содержимое раздела 2.1.1" },
					{ title: subsubSectionsByGeo.AKT_OBSEDOVANIYA, content: "Содержимое раздела 2.1.2" },
					{ title: subsubSectionsByGeo.TEKH_PASPORT_OBJEKTA, content: "Содержимое раздела 2.1.1" },
					{ title: subsubSectionsByGeo.TEKH_PLAN_OBJEKTA, content: "Содержимое раздела 2.1.2" },
					{ title: subsubSectionsByGeo.OTHER, content: "Содержимое раздела 2.1.2" },
				],
			},
			{
				title: SubSectionsByGeo.EKO,
				sections: [
					{ title: subsubSectionsByGeo.ENG_ECO_SURVEY, content: "Содержимое раздела 2.1.1" },
					{ title: subsubSectionsByGeo.CHEM_POLLUTION, content: "Содержимое раздела 2.1.2" },
					{ title: subsubSectionsByGeo.RADIATION_SURVEY, content: "Содержимое раздела 2.1.1" },
					{ title: subsubSectionsByGeo.ECO_RESEARCH_ANGAR, content: "Содержимое раздела 2.1.2" },
					{ title: subsubSectionsByGeo.ECO_RESEARCH_LINEAR, content: "Содержимое раздела 2.1.1" },
					{ title: subsubSectionsByGeo.ECO_MEASURES_LINEAR, content: "Содержимое раздела 2.1.2" },
					{ title: subsubSectionsByGeo.ECO_RESEARCH_PLAZHT_AUTH, content: "Содержимое раздела 2.1.1" },
					{ title: subsubSectionsByGeo.ECO_RESEARCH_CONSTRUCTION, content: "Содержимое раздела 2.1.2" },
					{ title: subsubSectionsByGeo.ECO_RESEARCH_PROJECT, content: "Содержимое раздела 2.1.1" },
					{ title: subsubSectionsByGeo.ECO_RESEARCH_EXPERTISE, content: "Содержимое раздела 2.1.2" },
					{ title: subsubSectionsByGeo.ECO_RESEARCH_REGISTRATION, content: "Содержимое раздела 2.1.1" },
					{ title: subsubSectionsByGeo.ECO_MEASURES_NONLINEAR, content: "Содержимое раздела 2.1.2" },
					{ title: subsubSectionsByGeo.ENG_ECO_RESEARCH_SOCIAL, content: "Содержимое раздела 2.1.1" },
					{ title: subsubSectionsByGeo.ECO_RESEARCH_SCHOOL, content: "Содержимое раздела 2.1.2" },
					{ title: subsubSectionsByGeo.ENG_ECO_RESEARCH_HOUSES, content: "Содержимое раздела 2.1.2" },
					{ title: subsubSectionsByGeo.OTHER, content: "Содержимое раздела 2.1.1" },
				],
			},
		],
	},
	{
		title: Categories.Cleaning,
		subcategories: [
			{
				title: SubsectionsByCleaning.CLEANING_HOUSE,
				sections: [

				],
			},
			{
				title: SubsectionsByCleaning.CLEANING_OFFICE,
				sections: [

				],
			},
			{
				title: SubsectionsByCleaning.CLEANING_PROM,
				sections: [

				],
			},
			{
				title: SubsectionsByCleaning.AFTER_REPAIR,
				sections: [

				],
			},
			{
				title: SubsectionsByCleaning.OTHER,
				sections: [

				],
			},

		],
	},
	{
		title: Categories.TRUCKINGANDSERVCES,
		subcategories: [
			{
				title: SubsectionsByTruckingAndServices.CARS,
				sections: [
					{ title: subSubSectionByTruckingAndServices.ONE_TONN, content: "Содержимое раздела 2.2.1" },
					{ title: subSubSectionByTruckingAndServices.THREE_TONN, content: "Содержимое раздела 2.2.1" },
					{ title: subSubSectionByTruckingAndServices.FIVE_TONN, content: "Содержимое раздела 2.2.1" },
					{ title: subSubSectionByTruckingAndServices.TEN_TONN, content: "Содержимое раздела 2.2.1" },
					{ title: subSubSectionByTruckingAndServices.TWENTE_TONN, content: "Содержимое раздела 2.2.1" },
					{ title: subSubSectionByTruckingAndServices.TRUCKING_HARD, content: "Содержимое раздела 2.2.1" },
					{ title: subSubSectionByTruckingAndServices.GABBAGE, content: "Содержимое раздела 2.2.1" },
					{ title: subSubSectionByTruckingAndServices.SNOW, content: "Содержимое раздела 2.2.1" },
					{ title: subSubSectionByTruckingAndServices.GRUNTE, content: "Содержимое раздела 2.2.1" },
					{ title: subSubSectionByTruckingAndServices.CHEMENT, content: "Содержимое раздела 2.2.1" },
					{ title: subSubSectionByTruckingAndServices.OTHER_TRUCKING, content: "Содержимое раздела 2.2.1" },
				],

			},
			{
				title: SubsectionsByTruckingAndServices.TRUCKING,
				sections: [
					{ title: subSubSectionByTruckingAndServices.BETON_NASOS, content: "Содержимое раздела 2.2.1" },
					{ title: subSubSectionByTruckingAndServices.VISHKA, content: "Содержимое раздела 2.2.1" },
					{ title: subSubSectionByTruckingAndServices.CRAN, content: "Содержимое раздела 2.2.1" },
					{ title: subSubSectionByTruckingAndServices.ASSENIZATOR, content: "Содержимое раздела 2.2.1" },
					{ title: subSubSectionByTruckingAndServices.ASPHALT, content: "Содержимое раздела 2.2.1" },
					{ title: subSubSectionByTruckingAndServices.BETON, content: "Содержимое раздела 2.2.1" },
					{ title: subSubSectionByTruckingAndServices.BULDOZER, content: "Содержимое раздела 2.2.1" },
					{ title: subSubSectionByTruckingAndServices.VILKA, content: "Содержимое раздела 2.2.1" },
					{ title: subSubSectionByTruckingAndServices.HYDROMOLOT, content: "Содержимое раздела 2.2.1" },
					{ title: subSubSectionByTruckingAndServices.GRAYDER, content: "Содержимое раздела 2.2.1" },
					{ title: subSubSectionByTruckingAndServices.GRAIPHER, content: "Содержимое раздела 2.2.1" },
					{ title: subSubSectionByTruckingAndServices.SAMOSVAL, content: "Содержимое раздела 2.2.1" },
					{ title: subSubSectionByTruckingAndServices.GRUNTOASPHALTRES, content: "Содержимое раздела 2.2.1" },
					{ title: subSubSectionByTruckingAndServices.KATOK, content: "Содержимое раздела 2.2.1" },
					{ title: subSubSectionByTruckingAndServices.ILOSOS, content: "Содержимое раздела 2.2.1" },
					{ title: subSubSectionByTruckingAndServices.KDM, content: "Содержимое раздела 2.2.1" },
					{ title: subSubSectionByTruckingAndServices.MANIPULATOR, content: "Содержимое раздела 2.2.1" },
					{ title: subSubSectionByTruckingAndServices.MINI_LOADER, content: "Содержимое раздела 2.2.1" },
					{ title: subSubSectionByTruckingAndServices.MINI_ESCOVATOR, content: "Содержимое раздела 2.2.1" },
					{ title: subSubSectionByTruckingAndServices.MINI_MOLOT, content: "Содержимое раздела 2.2.1" },
					{ title: subSubSectionByTruckingAndServices.BUR_YAMA, content: "Содержимое раздела 2.2.1" },
					{ title: subSubSectionByTruckingAndServices.MULTCHER, content: "Содержимое раздела 2.2.1" },
					{ title: subSubSectionByTruckingAndServices.EKSKOVATOR, content: "Содержимое раздела 2.2.1" },
					{ title: subSubSectionByTruckingAndServices.SVAEBOI, content: "Содержимое раздела 2.2.1" },
					{ title: subSubSectionByTruckingAndServices.FRONT_LOADER, content: "Содержимое раздела 2.2.1" },
					{ title: subSubSectionByTruckingAndServices.EKS_LOADER, content: "Содержимое раздела 2.2.1" },
					{ title: subSubSectionByTruckingAndServices.YAMOBUR, content: "Содержимое раздела 2.2.1" },
					{ title: subSubSectionByTruckingAndServices.OTHER_SERVICE, content: "Содержимое раздела 2.2.1" },
				],
			},
		],
	},
	{
		title: Categories.Materials,
		subcategories: [

		],
	},
	{
		title: Categories.BuildExpertise,
		subcategories: [
			{
				title: subSectByExpertise.NEZAVISIM,
				sections: [
					{ title: subsubSectByExpertise.QUALITY_EXPERTISE, content: "Содержимое раздела 6.1.1" },
					{ title: subsubSectByExpertise.COMPLIANCE_EXPERTISE, content: "Содержимое раздела 6.1.2" },
					{ title: subsubSectByExpertise.VOLUME_COST_EXPERTISE, content: "Содержимое раздела 6.1.1" },
					{ title: subsubSectByExpertise.DEFECTS_COST_EXPERTISE, content: "Содержимое раздела 6.1.2" },
					{ title: subsubSectByExpertise.CONTRACTOR_PROPOSALS_EXPERTISE, content: "Содержимое раздела 6.1.1" },
					{ title: subsubSectByExpertise.PROJECT_DOCUMENTATION_EXPERTISE, content: "Содержимое раздела 6.1.2" },
					{ title: subsubSectByExpertise.ESTIMATE_DOCUMENTATION_EXPERTISE, content: "Содержимое раздела 6.1.1" },
					{ title: subsubSectByExpertise.ENGINEERING_SYSTEMS_EXPERTISE, content: "Содержимое раздела 6.1.2" },
					{ title: subsubSectByExpertise.REPLANNING_FEASIBILITY_EXPERTISE, content: "Содержимое раздела 6.1.1" },
					{ title: subsubSectByExpertise.REPLANNING_COMPLIANCE_EXPERTISE, content: "Содержимое раздела 6.1.2" },
					{ title: subsubSectByExpertise.CAUSAL_RELATIONSHIP_EXPERTISE, content: "Содержимое раздела 6.1.1" },
					{ title: subsubSectByExpertise.HABITABILITY_EXPERTISE, content: "Содержимое раздела 6.1.2" },
					{ title: subsubSectByExpertise.CAPITALITY_EXPERTISE, content: "Содержимое раздела 6.1.1" },
					{ title: subsubSectByExpertise.ACCIDENT_CAUSES_EXPERTISE, content: "Содержимое раздела 6.1.2" },
					{ title: subsubSectByExpertise.DAMAGE_ASSESSMENT_EXPERTISE, content: "Содержимое раздела 6.1.1" },
					{ title: subsubSectByExpertise.TECHNICAL_CONDITION_EXPERTISE, content: "Содержимое раздела 6.1.2" },
					{ title: subsubSectByExpertise.NOISE_VIBRATION_MEASUREMENT, content: "Содержимое раздела 6.1.1" },
					{ title: subsubSectByExpertise.THERMAL_VISION_INSPECTION, content: "Содержимое раздела 6.1.2" },
					{ title: subsubSectByExpertise.ROAD_SURFACE_EXPERTISE, content: "Содержимое раздела 6.1.1" },
					{ title: subsubSectByExpertise.WOODEN_HOUSES_EXPERTISE, content: "Содержимое раздела 6.1.2" },
					{ title: subsubSectByExpertise.ACTUAL_COST_EXPERTISE, content: "Содержимое раздела 6.1.1" },
					{ title: subsubSectByExpertise.IMPROVEMENTS_CLASSIFICATION_EXPERTISE, content: "Содержимое раздела 6.1.2" },
					{ title: subsubSectByExpertise.INDUSTRIAL_SAFETY_EXPERTISE, content: "Содержимое раздела 6.1.1" },
					{ title: subsubSectByExpertise.REVIEW_EXPERT_OPINIONS, content: "Содержимое раздела 6.1.2" },
					{ title: subsubSectByExpertise.ENGINEERING_SURVEY_RESULTS_EXPERTISE, content: "Содержимое раздела 6.1.1" },
					{ title: subsubSectByExpertise.OTHER_EXPERTISE, content: "Содержимое раздела 6.1.2" },
				],
			},
			{
				title: subSectByExpertise.BUILDING_CONTROL,
				sections: [
					{ title: subsubSectByExpertise.BUILDING_CONTROL_REPAIR, content: "Содержимое раздела 6.1.1" },
					{ title: subsubSectByExpertise.BUILDING_CONTROL_IJSC, content: "Содержимое раздела 6.1.2" },
					{ title: subsubSectByExpertise.TECHNICAL_CUSTOMER_FUNCTION, content: "Содержимое раздела 6.1.1" },
					{ title: subsubSectByExpertise.COMPLEX_BUILDING_CONTROL, content: "Содержимое раздела 6.1.2" },
					{ title: subsubSectByExpertise.SEPARATE_TYPE_CONTROL, content: "Содержимое раздела 6.1.1" },
					{ title: subsubSectByExpertise.OTHER_EXPERTISE, content: "Содержимое раздела 6.1.2" },
				],
			},
			{
				title: subSectByExpertise.LABORAT,
				sections: [
					{ title: subsubSectByExpertise.LAB_TEST_MATERIALS, content: "Содержимое раздела 6.1.1" },
					{ title: subsubSectByExpertise.VISUAL_AND_MEASUREMENT_CONTROL, content: "Содержимое раздела 6.1.2" },
					{ title: subsubSectByExpertise.NDT_CONTROL, content: "Содержимое раздела 6.1.1" },
					{ title: subsubSectByExpertise.ULTRASONIC_CONTROL, content: "Содержимое раздела 6.1.2" },
					{ title: subsubSectByExpertise.ENTRY_CONTROL, content: "Содержимое раздела 6.1.1" },
					{ title: subsubSectByExpertise.ROAD_MATERIAL_TESTING, content: "Содержимое раздела 6.1.2" },
					{ title: subsubSectByExpertise.ACOUSTIC_CONTROL, content: "Содержимое раздела 6.1.1" },
					{ title: subsubSectByExpertise.HYDRAULIC_TESTING_WATER, content: "Содержимое раздела 6.1.2" },
					{ title: subsubSectByExpertise.HYDRAULIC_TESTING_HEATING, content: "Содержимое раздела 6.1.1" },
					{ title: subsubSectByExpertise.ELECTRICAL_LABORATORY, content: "Содержимое раздела 6.1.2" },
					{ title: subsubSectByExpertise.RADIATION_CONTROL, content: "Содержимое раздела 6.1.1" },
					{ title: subsubSectByExpertise.NON_IONIZING_FACTORS_MEASUREMENT, content: "Содержимое раздела 6.1.2" },
					{ title: subsubSectByExpertise.WATER_ANALYSIS_COLD_HOT_SUPPLY, content: "Содержимое раздела 6.1.1" },
					{ title: subsubSectByExpertise.OTHER_EXPERTISE, content: "Содержимое раздела 6.1.2" },
				],
			},
		],
	},
	{
		title: Categories.ProjectAndDesign,
		subcategories: [
			{
				title: subsectionByDesign.PROJECT,
				sections: [
					{ title: subsubsectionByDesign.PRIVATE_HOUSING_DESIGN, content: "Содержимое раздела 6.1.1" },
					{ title: subsubsectionByDesign.COMPLEX_RESIDENTIAL_DESIGN, content: "Содержимое раздела 6.1.2" },
					{ title: subsubsectionByDesign.COMPLEX_NON_RESIDENTIAL_DESIGN, content: "Содержимое раздела 6.1.1" },
					{ title: subsubsectionByDesign.COMPLEX_INDUSTRIAL_DESIGN, content: "Содержимое раздела 6.1.2" },
					{ title: subsubsectionByDesign.SEPARATE_SECTION_DESIGN, content: "Содержимое раздела 6.1.1" },
					{ title: subsubsectionByDesign.OTHER_PROJECT, content: "Содержимое раздела 6.1.1" },
				],
			},
			{
				title: subsectionByDesign.DESIGN,
				sections: [
					{ title: subsubsectionByDesign.APARTMENT_AND_PRIVATE_HOUSE_DESIGN, content: "Содержимое раздела 6.1.1" },
					{ title: subsubsectionByDesign.INTERIOR_DESIGN, content: "Содержимое раздела 6.1.2" },
					{ title: subsubsectionByDesign.FACADE_DESIGN, content: "Содержимое раздела 6.1.1" },
					{ title: subsubsectionByDesign.OFFICE_DESIGN, content: "Содержимое раздела 6.1.2" },
					{ title: subsubsectionByDesign.LANDSCAPE_DESIGN, content: "Содержимое раздела 6.1.1" },
					{ title: subsubsectionByDesign.NON_RESIDENTIAL_BUILDING_DESIGN, content: "Содержимое раздела 6.1.1" },
					{ title: subsubsectionByDesign.ARCHITECTURAL_DESIGN, content: "Содержимое раздела 6.1.2" },
					{ title: subsubsectionByDesign.STREET_LIGHTING_DESIGN, content: "Содержимое раздела 6.1.1" },
					{ title: subsubsectionByDesign.OTHER_DESIGN, content: "Содержимое раздела 6.1.1" },
				],
			},
		],
	},
	{
		title: Categories.Rent,
		subcategories: [
			{
				title: SubsectionByRent.RENT_HANDLE,
				sections: [
					{ title: SubsubsectionByRent.RENT_HANDLE_HANDLE, content: "Содержимое раздела 6.1.1" },
					{ title: SubsubsectionByRent.RENT_ISMERIT, content: "Содержимое раздела 6.1.2" },
					{ title: SubsubsectionByRent.RENT_ELECTRO, content: "Содержимое раздела 6.1.1" },
					{ title: SubsubsectionByRent.RENT_BENSIN, content: "Содержимое раздела 6.1.2" },
				],
			},
			{
				title: SubsectionByRent.RENT_BUILDING,
				sections: [
					{ title: SubsubsectionByRent.RENT_POLYPIPE_WELDER, content: "Содержимое раздела 6.1.1" },
					{ title: SubsubsectionByRent.RENT_GAS_GENERATOR, content: "Содержимое раздела 6.1.2" },
					{ title: SubsubsectionByRent.RENT_GAS_CUTTER, content: "Содержимое раздела 6.1.1" },
					{ title: SubsubsectionByRent.RENT_CONCRETE_MIXER, content: "Содержимое раздела 6.1.2" },
					{ title: SubsubsectionByRent.RENT_CONTAINER, content: "Содержимое раздела 6.1.1" },
					{ title: SubsubsectionByRent.RENT_VIBRO_COMPACTOR, content: "Содержимое раздела 6.1.2" },
					{ title: SubsubsectionByRent.RENT_VIBRO_PLATE, content: "Содержимое раздела 6.1.1" },
					{ title: SubsubsectionByRent.RENT_VIBRO_BEAM, content: "Содержимое раздела 6.1.2" },
					{ title: SubsubsectionByRent.RENT_VIBRO_RAMMER, content: "Содержимое раздела 6.1.1" },
					{ title: SubsubsectionByRent.RENT_TOWER_SCAFFOLDING, content: "Содержимое раздела 6.1.2" },
					{ title: SubsubsectionByRent.RENT_CRANE, content: "Содержимое раздела 6.1.1" },
					{ title: SubsubsectionByRent.RENT_DIESEL_GENERATOR, content: "Содержимое раздела 6.1.2" },
					{ title: SubsubsectionByRent.RENT_DIESEL_COMPRESSORS, content: "Содержимое раздела 6.1.1" },
					{ title: SubsubsectionByRent.RENT_SCREED_MACHINES, content: "Содержимое раздела 6.1.2" },
					{ title: SubsubsectionByRent.RENT_JOINT_LIFT, content: "Содержимое раздела 6.1.1" },
					{ title: SubsubsectionByRent.RENT_BREAKER_HAMMER, content: "Содержимое раздела 6.1.2" },
					{ title: SubsubsectionByRent.RENT_GRINDING_MACHINE, content: "Содержимое раздела 6.1.1" },
					{ title: SubsubsectionByRent.RENT_SCISSOR_LIFT, content: "Содержимое раздела 6.1.2" },
					{ title: SubsubsectionByRent.RENT_CONCRETE_HEATING, content: "Содержимое раздела 6.1.2" },
					{ title: SubsubsectionByRent.RENT_REINFORCEMENT_BENDING, content: "Содержимое раздела 6.1.1" },
					{ title: SubsubsectionByRent.RENT_REINFORCEMENT_CUTTING, content: "Содержимое раздела 6.1.2" },
					{ title: SubsubsectionByRent.RENT_FORMWORK, content: "Содержимое раздела 6.1.1" },
					{ title: SubsubsectionByRent.RENT_LIGHT_MAST, content: "Содержимое раздела 6.1.2" },
					{ title: SubsubsectionByRent.RENT_SANDER, content: "Содержимое раздела 6.1.1" },
					{ title: SubsubsectionByRent.RENT_INDUSTRIAL_STEAM_GENERATOR, content: "Содержимое раздела 6.1.2" },
					{ title: SubsubsectionByRent.RENT_TOWER_CRANE, content: "Содержимое раздела 6.1.1" },
					{ title: SubsubsectionByRent.RENT_PAINTING_APPARATUSES, content: "Содержимое раздела 6.1.2" },
					{ title: SubsubsectionByRent.RENT_MORTAR_TANKS, content: "Содержимое раздела 6.1.1" },
					{ title: SubsubsectionByRent.RENT_MORTAR_STATION, content: "Содержимое раздела 6.1.2" },
					{ title: SubsubsectionByRent.RENT_MEMBRANE_WELDING, content: "Содержимое раздела 6.1.1" },
					{ title: SubsubsectionByRent.RENT_PLANING_MACHINE, content: "Содержимое раздела 6.1.2" },
					{ title: SubsubsectionByRent.RENT_CONSTRUCTION_SCAFFOLDING, content: "Содержимое раздела 6.1.1" },
					{ title: SubsubsectionByRent.RENT_CONSTRUCTION_TRASH_CONVEYOR, content: "Содержимое раздела 6.1.2" },
					{ title: SubsubsectionByRent.RENT_TELESCOPIC_LIFTS, content: "Содержимое раздела 6.1.1" },
					{ title: SubsubsectionByRent.RENT_TELESCOPIC_SUPPORTS, content: "Содержимое раздела 6.1.2" },
					{ title: SubsubsectionByRent.RENT_HEAT_GENERATOR, content: "Содержимое раздела 6.1.1" },
					{ title: SubsubsectionByRent.RENT_DIAMOND_DRILLING, content: "Содержимое раздела 6.1.2" },
					{ title: SubsubsectionByRent.RENT_DIAMOND_CUTTING, content: "Содержимое раздела 6.1.1" },
					{ title: SubsubsectionByRent.RENT_GROUND_HEATING, content: "Содержимое раздела 6.1.2" },
					{ title: SubsubsectionByRent.RENT_FACADE_LIFT, content: "Содержимое раздела 6.1.1" },
					{ title: SubsubsectionByRent.RENT_CONCRETE_MILLING_MACHINES, content: "Содержимое раздела 6.1.2" },
					{ title: SubsubsectionByRent.RENT_JOINT_CUTTER, content: "Содержимое раздела 6.1.1" },
					{ title: SubsubsectionByRent.RENT_STACKER, content: "Содержимое раздела 6.1.2" },
					{ title: SubsubsectionByRent.RENT_PLASTER_STATION, content: "Содержимое раздела 6.1.1" },
					{ title: SubsubsectionByRent.RENT_ELECTRIC_COMPRESSORS, content: "Содержимое раздела 6.1.2" },
					{ title: SubsubsectionByRent.RENT_ELECTRIC_STATIONS, content: "Содержимое раздела 6.1.1" },
					{ title: SubsubsectionByRent.RENT_OTHER, content: "Содержимое раздела 6.1.2" },

				],
			},
			{
				title: SubsectionByRent.REPAIR,
				sections: [

				],
			},
		],
	},
	{
		title: Categories.WORKERSANDSPEC,
		subcategories: [

		],
	},
]