export class BaseModel {
    public get(uri: string, params: any): Promise<any> {
        let url = uri;
        if (params) {
            let query = new URLSearchParams(params);
            url += '?' + query.toString();
        }
        return fetch(url, {
            method: 'GET',
        }).then((r: Response): any => {
            return r.json();
        });
    }
}
