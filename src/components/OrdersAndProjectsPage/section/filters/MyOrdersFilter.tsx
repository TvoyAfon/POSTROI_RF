import React, { useState } from 'react'
import CheckboxButton from '../../../ui/CheckboxButton/CheckboxButton'
import { catStyles } from './styles/filterstyles'

const MyOrdersFilter: React.FC = () => {
	const [orderFilterState, setOrderFilterState] = useState<'Все' | 'В работе'>('Все')

	const handleFilterChange = (filter: 'Все' | 'В работе') => {
		setOrderFilterState(filter)
	}

	const getStyles = (state: string) => {
		return {
			color: state === orderFilterState ? '#282930' : '#8E8E93',
			textDecoration: state === orderFilterState ? 'underline' : 'none',
			cursor: 'pointer'
		}
	}

	return (
		<div style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
			<div style={{ display: 'flex', justifyContent: 'center', gap: 24, alignItems: 'center', ...catStyles }}>
				<span style={getStyles('Все')} onClick={() => handleFilterChange('Все')}>Все</span>
				<span style={getStyles('В работе')} onClick={() => handleFilterChange('В работе')}>В работе</span>
				<CheckboxButton label='С откликами' />
			</div>
		</div>
	)
}

export default MyOrdersFilter