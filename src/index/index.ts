import { Table } from '../table/table';
import { testData } from './test-data';
import { TableConfig } from '../table/table-config';
import './index.css';

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

const table = new Table(config, 'root');
table.attachEvent('itemClick', (item: any): void => {
    console.log(item);
});
table.parse(testData);
