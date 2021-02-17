import { TableConfig, ColumnConfig } from './table-config';

/**
 * Class for a dynamic table creation and adding new data into the table
 */
export class Table {
    private readonly config: TableConfig;
    private readonly root: HTMLTableElement;
    private body: HTMLTableSectionElement;
    private header: HTMLTableSectionElement;

    constructor(config: TableConfig, element?: HTMLTableElement | string) {
        this.config = config;
        if (element) {
            if (element instanceof HTMLTableElement) {
                this.root = element;
            } else if (typeof element === 'string') {
                const parent = document.getElementById(element);
                if (!parent) {
                    throw Error("Can't find an element with the id: " + element);
                }
                this.root = parent.appendChild(document.createElement('table'));
            } else {
                throw Error('Wrong type of element: ' + element);
            }
        } else {
            this.root = document.createElement('table');
        }
        this.build();
    }

    private build(): void {
        let usesGravity = this.usesGravity();
        if (usesGravity) {
            this.rescaleGravity();
        }
        this.body = this.root.createTBody();
        this.header = this.root.createTHead();
        let headerRow = this.header.insertRow();
        this.config.columns.forEach((column: ColumnConfig): void => {
            let headerCell = headerRow.insertCell();
            headerCell.innerText = column.caption;
            if (usesGravity) {
                headerCell.width = column.gravity + '%';
            }
        });
    }

    /**
     * Determines whether table config uses gravity parameter
     */
    private usesGravity(): boolean {
        return this.config.columns.some((column: ColumnConfig): boolean => {
            return Boolean(column.gravity);
        });
    }

    /**
     * Rescales gravity parameter from arbitrary relative values
     * into percentage values
     */
    private rescaleGravity(): void {
        this.config.columns.forEach((column: ColumnConfig): void => {
            column.gravity = column.gravity || 1;
        });
        let totalGravity = 0;
        for (let i = 0; i < this.config.columns.length; i++) {
            totalGravity += this.config.columns[i].gravity!;
        }
        this.config.columns.forEach((column: ColumnConfig): void => {
            column.gravity = (100 * column.gravity!) / totalGravity;
        });
    }

    public getRoot(): HTMLTableElement {
        return this.root;
    }

    public parse(data: any): void {
        if (!data) {
            return;
        }
        data.forEach((item: any): void => {
            item.id = this.root.rows.length;
            this.parseItem(item);
        });
    }

    private parseItem(item: any): void {
        let row = this.body.insertRow();
        this.config.columns.forEach((column: ColumnConfig): void => {
            let cell = row.insertCell();
            let parser = this.chooseParser(column.type);
            let content = item[column.source];
            if (content !== undefined) {
                parser(content, cell);
            }
        });
    }

    private chooseParser(columnType: string): (content: any, cell: HTMLTableCellElement) => void {
        switch (columnType) {
            case 'b64image':
                return this.b64ImageParser;
            case 'datetime':
                return this.dateTimeParser;
            case 'integer':
            case 'float':
            case 'string':
            default:
                return this.stringParser;
        }
    }

    private b64ImageParser(content: any, cell: HTMLTableCellElement): void {
        cell.innerHTML = `<img src="data:image/jpeg;base64,${content}" style="width:100px">`;
    }

    private dateTimeParser(content: any, cell: HTMLTableCellElement): void {
        cell.innerText = String(new Date(content));
    }

    private stringParser(content: any, cell: HTMLTableCellElement): void {
        cell.innerText = content;
    }

    public getCaptions(): string[] {
        let arrayCaption: string[] = [];
        this.config.columns.forEach((column: ColumnConfig): void => {
            arrayCaption.push(column.caption);
        });
        return arrayCaption;
    }
}
