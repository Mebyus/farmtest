import { BaseModel } from './base-model';
import { testData as receiptTestData } from '../index/test-data';
import { testData as detailsTestData } from '../receipt/test-data';
import * as receipt from '../type/receipt';

export class ReceiptModel extends BaseModel {
    public getAll(): Promise<receipt.Info[]> {
        return Promise.resolve(receiptTestData);
    }

    public getDetails(id: number): Promise<receipt.Detail[]> {
        return Promise.resolve(detailsTestData);
    }
}
