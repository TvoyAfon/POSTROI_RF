import React from 'react'
import { materialsCateg } from '../../../../common/categories'

import MaterialCard from './MaterialCard'

const CategoriesMaterials: React.FC = () => {



	return (
		<section className='flex-column gap-small'>
			{materialsCateg.map((material, index) => (
				<MaterialCard  material={material} key={index}/>
			))}
		</section>
	)
}

export default CategoriesMaterials
