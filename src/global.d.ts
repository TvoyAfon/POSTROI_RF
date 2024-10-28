interface Window {
	onTelegramAuth: (user: any) => void,
	YaAuthSuggest: {
		init: (oauthQueryParams: any, tokenPageOrigin: string, options: any) => Promise<{ handler: () => Promise<any> }>
	},
	YaSendSuggestToken: (url: string, options: { flag: boolean }) => void
}


