import axios from 'axios'

const mail_url = `https://oauth.mail.ru/userinfo`

interface IMailUserInfo {
	id: string,
	client_id: string,
	gender: string,
	name: string,
	nickname: string,
	locale: string,
	first_name: string,
	last_name: string,
	email: string,
	image: string
}

export const getMailInfoUser = async (access_token: string) => {
	const response = await axios.get<IMailUserInfo>(`${mail_url}?access_token=${access_token}`)

	return response.data.client_id
}