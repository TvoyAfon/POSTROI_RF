import React, { useState } from 'react'
import { ROUTES_CATEGORY, ROUTES_NAVBAR } from '../../../routes/routes'
import styles from '../MainPage.module.scss'
import CardBuilding from './CategoryCard/CardBuilding'
import CardCleaning from './CategoryCard/CardCleaning'
import CardDesignEngineering from './CategoryCard/CardDesignEngineering'
import CardTrucking from './CategoryCard/CardTrucking'
import CardVendorAndMaterials from './CategoryCard/CardVendorAndMaterials'
import CardWorkersAndMasters from './CategoryCard/CardWorkersAndMasters'
import CategoryCardExpertise from './CategoryCard/CategoryCardExpertise'
import CategoryCardGeo from './CategoryCard/CategoryCardGeo'
import CategoryCardHelpBuilding from './CategoryCard/CategoryCardHelpBuilding'
import CategoryCardRent from './CategoryCard/CategoryCardRent'
import CategoryCardSigns from './CategoryCard/CategoryCardSigns'
import CategoryCardTender from './CategoryCard/CategoryCardTender'


const Categories: React.FC = () => {
  const [wall, setWall] = useState(false)

  return (
    <ul className={styles.mainPage_categories}>
      <CardBuilding
        to={ROUTES_CATEGORY.buildingAndRepair}
        onMouseEnter={() => setWall(true)}
        onMouseLeave={() => setWall(false)}
        wall={wall} />
      <CardDesignEngineering
        to={ROUTES_CATEGORY.projectAndDesign}
      />
      <CategoryCardGeo
        to={ROUTES_CATEGORY.geo}
      />
      <CardVendorAndMaterials
        to={ROUTES_CATEGORY.vendorsandmaterials}
      />
      <CardTrucking   /*ГРУЗОПЕРЕВОЗКИ И УСЛУГИ СПЕЦТЕХНИКИ */
        to={ROUTES_CATEGORY.truckingAndServices}
      />
      <CategoryCardExpertise
        to={ROUTES_CATEGORY.buildExpertise} />
      <CardCleaning
        to={ROUTES_CATEGORY.cleaning} />
      <CategoryCardRent
        to={ROUTES_CATEGORY.rent}
      />
      <CardWorkersAndMasters
        to={ROUTES_CATEGORY.workersAndMasters}
      />
      <CategoryCardTender
        to={'/'} />

      <CategoryCardSigns
        to={ROUTES_NAVBAR.signs} />
      <CategoryCardHelpBuilding
        to={'/'} />
    </ul>
  )
}

export default Categories
/*<CardServices
        to={ROUTES_NAVBAR.createOrder}
        onClick={() => handleClickCategory('Услуги и спецтехника', '/7')} />*/