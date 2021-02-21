import { Table } from '../table/table';
import { TableConfig } from '../table/table-config';
import '../table/table.css';
import { ReceiptModel } from '../model/receipt';
import * as receipt from '../type/receipt';
import * as pagenav from '../pagenav/pagenav';

const config: TableConfig = {
    columns: [
        {
            source: 'branch',
            caption: 'Филиал',
            type: 'string',
        },
        {
            source: 'docType',
            caption: 'Документ',
            type: 'string',
        },
        {
            source: 'posCount',
            caption: 'Количество позиций',
            type: 'integer',
        },
        {
            source: 'createDate',
            caption: 'Дата продажи',
            type: 'datetime',
        },
        {
            source: 'sumQuantity',
            caption: 'Количество товара',
            type: 'float',
        },
        {
            source: 'sumRoznWNDS',
            caption: 'Общая сумма',
            type: 'float',
        },
    ],
};

const navigationBar = new pagenav.Bar(20, 'pagenav');
navigationBar.attachEvent('pageChange', (n: number, o: number): void => {
    console.log(n, o);
});
const table = new Table<receipt.Info>(config, 'root');
const model = new ReceiptModel();
table.attachEvent('itemClick', (item: any): void => {
    window.location.assign(`receipt.html?id=${item.id}`);
});
// model.getReceiptPage(1, 100).then((entries: receipt.Info[]): void => {
//     table.parse(entries);
// });
