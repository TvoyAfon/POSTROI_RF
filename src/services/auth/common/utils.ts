export function showError(title: string, error: any) {
    console.error(`${title} - occured error ${JSON.stringify(error.response)}`)
}

export function throwError(error: any) {
    throw new Error(error.response.data.detail)
}