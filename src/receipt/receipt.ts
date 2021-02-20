import { ReceiptModel } from '../model/receipt';
import { Table } from '../table/table';
import { TableConfig } from '../table/table-config';
import * as receipt from '../type/receipt';
import '../table/table.css';

const config: TableConfig = {
    columns: [
        {
            source: 'fabr',
            caption: 'Производитель',
            type: 'string',
        },
        {
            source: 'drug',
            caption: 'Товар',
            type: 'string',
        },
        {
            source: 'form',
            caption: 'Форма выпуска',
            type: 'string',
        },
        {
            source: 'srokG',
            caption: 'Срок годности',
            type: 'datetime',
        },
        {
            source: 'quantity',
            caption: 'Количество товара',
            type: 'float',
        },
        {
            source: 'sumRoznWNDS',
            caption: 'Сумма продажи',
            type: 'float',
        },
        {
            source: 'nds',
            caption: 'НДС',
            type: 'float',
        },
    ],
};

function getUrlParams(search: string): any {
    const hashes = search.slice(search.indexOf('?') + 1).split('&');
    const params: any = {};
    hashes.forEach((hash: string): void => {
        const [key, val] = hash.split('=');
        params[key] = decodeURIComponent(val);
    });
    return params;
}

const table = new Table<receipt.Detail>(config, 'root');
const model = new ReceiptModel();
const queryParams = getUrlParams(window.location.search);
const receiptId = parseInt(queryParams.id);
if (receiptId) {
    model.getDetails(receiptId).then((entries: receipt.Detail[]): void => {
        table.parse(entries);
    });
}
