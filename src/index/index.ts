import { Table } from '../table/table';
import { TableConfig } from '../table/table-config';
import '../table/table.css';
import './index.css';
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
const table = new Table<receipt.Info>(config, 'root');
const model = new ReceiptModel();
const gotoInput = document.getElementById('goto') as HTMLInputElement;

table.attachEvent('itemClick', (item: any): void => {
    window.location.assign(`receipt.html?id=${item.id}`);
});
model.estimateCount().then((estimatedRows: number): void => {
    const pages = Math.ceil(estimatedRows / 100);
    gotoInput.max = estimatedRows.toString();
    navigationBar.changePagesNumber(pages);
});
navigationBar.attachEvent('pageChange', (n: number, o: number): void => {
    model.getReceiptPage(n, 100).then((entries: receipt.Info[]): void => {
        table.clearData();
        table.parse(entries);
    });
    gotoInput.value = n.toString();
});
model.getReceiptPage(1, 100).then((entries: receipt.Info[]): void => {
    table.parse(entries);
});
gotoInput.addEventListener('keyup', function (e: KeyboardEvent): void {
    if (e.key === 'Enter') {
        this.blur();
        navigationBar.changePage(parseInt(this.value));
    }
});
