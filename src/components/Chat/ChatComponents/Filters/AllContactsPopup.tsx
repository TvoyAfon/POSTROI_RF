import { useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import arrowDownIcon from '../../../../assets/images/mainpage_images/caret-up-solid 1.png'
import { usePopup } from '../../../../hooks/usePopup'
import { setUsersFilter } from '../../../../store/slices/ChatSlice/ChatSlice'
import { RootState } from '../../../../store/store'
import IconButton from '../../../ui/IconButton/IconButton'
import PopupMenu from '../../../ui/PopupMenu/PopupMenu'
import RadioButton from '../../../ui/RadioButton/RadioButton'
import { UserCategoryFilter, userCategories } from '../ChatList/types'

const AllContactsPopup = () => {
	const { handleToggle, isOpen, anchorEl, triggerClassName, setAnchorEl } = usePopup()
	const { usersFilter } = useSelector((state: RootState) => state.chat)
	const dispatch = useDispatch()

	const categories = useMemo(() => Object.values(userCategories), [userCategories])

	const handleSelectCategory = (key: string) => {
		dispatch(setUsersFilter(key as UserCategoryFilter))
		setAnchorEl(null)
	}

	return (
		<>
			<IconButton icon={arrowDownIcon} onClick={handleToggle} className={triggerClassName} imgClassName={triggerClassName} />
			<PopupMenu
				style={{
					width: '200px',
					borderRadius: '8px',
					padding: '8px',
					display: 'flex',
					flexDirection: 'column',
					gap: '8px',
					fontSize: '14px',
					fontWeight: 300,
					marginTop: '-20px'
				}}
				left={115}
				isOpen={isOpen}
				anchorEl={anchorEl}
				triggerClassName={triggerClassName}
				onClose={() => setAnchorEl(null)}
			>
				{
					categories.map(category => (
						<RadioButton
							key={category.key}
							checked={usersFilter === category.key}
							label={category.full}
							onClick={() => handleSelectCategory(category.key)} />
					))
				}
			</PopupMenu>
		</>
	)
}

export default AllContactsPopup