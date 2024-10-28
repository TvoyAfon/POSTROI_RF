import Property from '../../ui/Property/Property'

interface IAboutUser {
	about?: string,
	educational?: {
		name?: string,
		specialization?: string,
		dateStart?: string,
		dateEnd?: string
	},
	experience?:string,
	categoryUser?:string
}

const AboutUser:React.FC<IAboutUser> = ({about,categoryUser,educational,experience}) => {
 
	const isEducationalExist = () =>{
		if(!educational?.name || !educational.specialization){
			return '-'
		}
		else return `${educational.name},${educational.specialization}`
	}

	return (
		<>
			<Property header='О себе' text={about ? about : '-'} />
			<Property header='Образование' text={isEducationalExist()} />
			<Property header='Опыт' text={`На сервисе ${experience} дней`}/>
			<b>Работа по договору</b>
			<b>{categoryUser}</b>
		</>
	)
}

export default AboutUser