import { ReceiptModel } from '../model/receipt';
import { Table } from '../table/table';
import { TableConfig } from '../table/table-config';
import * as receipt from '../type/receipt';

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

const table = new Table<receipt.Detail>(config, 'root');
const model = new ReceiptModel();
model.getDetails(10).then((entries: receipt.Detail[]): void => {
    table.parse(entries);
});
