export class BaseModel {
    public getJSON(uri: string, params?: any): Promise<any> {
        return this.get(uri, params).then((r: Response): any => {
            return r.json();
        });
    }

    public get(uri: string, params?: any): Promise<Response> {
        let url = uri;
        if (params) {
            let query = new URLSearchParams(params);
            url += '?' + query.toString();
        }
        return fetch(url, {
            method: 'GET',
        });
    }
}
