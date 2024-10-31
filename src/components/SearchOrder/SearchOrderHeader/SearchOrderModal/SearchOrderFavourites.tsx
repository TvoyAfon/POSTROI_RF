import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../../../store/store'

const SearchOrderFavourites: React.FC = () => {
	const categories = useSelector((state: RootState) => state.favCategories.categories)


	if (categories.length === 0) {
		return (
			<div style={{ fontWeight: 500, textAlign: 'center' }}>
				Нет избранных категорий.<br />
				Нажмите на кнопку 'Настройки' сверху, чтобы добавить интересующие вас категории в избранное.
			</div>
		)
	}

	return (
		<div style={{ height: 300, overflowY: 'scroll' }} className='flex-column'>
			{categories.map(category => (
				<div key={category.name}>
					<span style={{ fontWeight: 600 }}>{category.name.toUpperCase()}</span>
					{category.subCategories && category.subCategories.length > 0 && (
						<div style={{ display: 'flex', gap: 32, paddingTop: 12 }}>
							<div className='flex-column gap-medium'>
								{category.subCategories.map(sub => (
									<div key={sub.name} style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
										{/* Check if sub has its own sub-subcategories */}
										{/*sub.subsubcategories && sub.subsubcategories.length > 0 ? (
											<span style={{ fontWeight: 700, color: '#282930' }}>{sub.name}</span>
										) : (
											<CheckboxButton labelStyle={{ fontWeight: 700 }} label={sub.name} />
										)}
										{/* Render sub-subcategories if they exist */}
										{/*sub.subsubcategories && sub.subsubcategories.length > 0 && (
											<div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
												{sub.subsubcategories.map(subsub => (
													subsub.name ? <CheckboxButton key={subsub.name} label={subsub.name} /> : null
												))}
											</div>
										)*/}
									</div>
								))}
							</div>
						</div>
					)}
				</div>
			))}
		</div>
	)
}

export default SearchOrderFavourites