import { RefObject } from 'react'
import pdfFormat from '../../../assets/images/chat_images/files/pdf-format.svg'
import txtFormat from '../../../assets/images/chat_images/files/txt-format.svg'
import wordFormat from '../../../assets/images/chat_images/files/word-format.svg'
import xlsFormat from '../../../assets/images/chat_images/files/xls-format.svg'
import readIcon from '../../../assets/images/chat_images/read_message.svg'
import readIconWhite from '../../../assets/images/chat_images/read_message_white.svg'
import unreadIcon from '../../../assets/images/chat_images/unread_message.svg'
import unreadIconWhite from '../../../assets/images/chat_images/unread_message_white.svg'
import sound from '../../../resources/notification-sound.wav'
import { IUserWithoutPassword } from "../../../services/auth/common/types"
import { ChatItem } from '../../../services/chat/common/types'
import { DocumentType } from '../../CreateOrder/edit/ui/Files/DocumentCard'
import { IMessage } from "../ChatComponents/Conversation/Messages/types"

export function getElementY(_ref: RefObject<HTMLElement>, container: RefObject<HTMLElement>) {
	if (!_ref?.current || !container?.current) {
		return
	}

	const elRect = _ref.current.getBoundingClientRect()
	const containerRect = _ref.current.getBoundingClientRect()
	return elRect.top - containerRect.top
}

export function nameToColor(name?: string) {
	if (!name) return

	let hash = 0
	let colour = '#'

	name.split('').forEach(char => {
		hash = char.charCodeAt(0) + ((hash << 5) - hash)
	})

	for (let i = 0; i < 3; i++) {
		const value = (hash >> (i * 8)) & 0xff
		colour += value.toString(16).padStart(2, '0')
	}

	return colour
}

export function textOverflow(text: string, maxLength: number) {
	if (text.length < maxLength) return text

	let result = ''

	for (let i = 0; i < maxLength; i++) {
		result += text[i]
	}

	result += '...'
	return result
}

export function getPersonalChatTitle(
	userId?: number,
	userOwner?: IUserWithoutPassword,
	userMember?: IUserWithoutPassword
) {
	if (!userOwner || !userMember) return ''
	return userId === userMember.id ? userOwner.first_name : userMember.first_name
}

export function getDestinationId(
	userId?: number,
	userOwner?: IUserWithoutPassword,
	userMember?: IUserWithoutPassword
) {
	if (!userOwner || !userMember) return null
	return userId === userMember.id ? userOwner.id : userMember.id
}

export function getReadIcon(isRead?: boolean, useWhiteColor?: boolean) {
	if (isRead === undefined) return null

	if (useWhiteColor) {
		return isRead ? readIconWhite : unreadIconWhite
	}

	return isRead ? readIcon : unreadIcon
}

export function convertLinksToAnchors(text: string): string {
	const urlPattern = /https?:\/\/[^\s]+/g

	const convertedText = text.replace(urlPattern, (url) => {
		return `<a href="${url}" style="color: #7099ED;" target="_blank">${url}</a>`
	})

	return convertedText
}

export function getContact(chatData: ChatItem, userId: number | undefined) {
	if (chatData.chat_type === 'group') {
		return null
	}
	return userId === chatData.user_owner.id ? chatData.user_member : chatData.user_owner
}

export function getFileTypeIcon(fileExt: string, _default: any) {
	if (
		fileExt.includes('doc')
		|| fileExt.includes('docx')
		|| fileExt.includes('word')
	) {
		return wordFormat
	}

	if (
		fileExt.includes('xls') ||
		fileExt.includes('openxml')
	) {
		return xlsFormat
	}

	if (
		fileExt.includes('text') ||
		fileExt.includes('txt')
	) {
		return txtFormat
	}

	if (fileExt.includes('pdf')) {
		return pdfFormat
	}

	return _default
}

export function getDocumentType(filename: string): DocumentType {
	if (filename.endsWith('.docx') || filename.endsWith('.doc')) {
		return 'word'
	}

	if (filename.endsWith('.txt')) {
		return 'txt'
	}

	if (filename.endsWith('.xls')) {
		return 'xls'
	}

	if (filename.endsWith('.pdf')) {
		return 'pdf'
	}

	return 'generic'
}

export function getFilesFromMessgaes(messages: IMessage[], regExp: RegExp): string[] {
	return messages.map(message => {
		const urls = message.docs_url.split('|')
		return urls.filter(url => regExp.test(url))
	}).flat()
}

export function getFilename(url: string) {
	return url.split('~').pop() || ''
}

export function getFileMeta(url: string) {
	const splitted = url.split('~')

	return {
		url: url.startsWith('blob') ? splitted[0] : url,
		filename: splitted[1]
	}
}

export const playNotificationSound = () => {
	const audio = new Audio(sound)
	audio.play()
}