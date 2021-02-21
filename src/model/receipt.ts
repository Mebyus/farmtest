import { BaseModel } from './base-model';
import * as receipt from '../type/receipt';

export class ReceiptModel extends BaseModel {
    public getAll(): Promise<receipt.Info[]> {
        return this.getJSON('receipt');
    }

    public getReceiptPage(page: number, size: number): Promise<receipt.Info[]> {
        return this.getJSON('receipt', { p: page, s: size });
    }

    public getDetails(id: number): Promise<receipt.Detail[]> {
        return this.getJSON('details', { id: id });
    }

    public estimateCount(): Promise<number> {
        return this.get('receipt/estimate')
            .then(
                (r: Response): Promise<string> => {
                    return r.text();
                }
            )
            .then((str: string): number => {
                return parseInt(str);
            });
    }
}
