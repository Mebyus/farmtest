import { BaseModel } from './base-model';
import * as receipt from '../type/receipt';

export class ReceiptModel extends BaseModel {
    public getAll(): Promise<receipt.Info[]> {
        return this.get('receipt');
    }

    public getDetails(id: number): Promise<receipt.Detail[]> {
        return this.get('details', { id: id });
    }
}
