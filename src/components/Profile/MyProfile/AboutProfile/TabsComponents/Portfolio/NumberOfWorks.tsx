
const NumberOfWorks = () => {

	const countAlbums = localStorage.getItem('count_albums')

	return (
		<span style={{
			fontWeight: 700,
			fontSize: '16px',
			marginTop: '4px'
		}}>{countAlbums}</span>
	)
}

export default NumberOfWorks