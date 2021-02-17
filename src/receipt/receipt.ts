import { Table } from '../table/table';
import { TableConfig } from '../table/table-config';
import { testData } from './test-data';

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

const table = new Table(config, 'root');
table.parse(testData);
