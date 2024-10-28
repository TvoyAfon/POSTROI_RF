export class URLConstructor {
    baseUrl: string = '';

    constructor(baseUrl: string) {
        this.baseUrl = baseUrl
    }

    public constructURL(path: string, params: Record<string, any> = {}): string {
        const url = new URL(`${this.baseUrl}/${path}`);

        Object.entries(params).forEach(([key, value]) => {
            url.searchParams.append(key, value);
        });

        return url.toString();
    }
}