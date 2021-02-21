import spinner from '../spinner/spinner';

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
        spinner.Enable();
        return fetch(url, {
            method: 'GET',
        }).then(
            (r: Response): Response => {
                spinner.Disable();
                return r;
            }
        );
    }
}
