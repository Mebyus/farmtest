import { TableConfig, ColumnConfig } from './table-config';

type TableEvent = 'itemClick';
/**
 * Class for a dynamic table creation and adding new data into the table
 */
export class Table<T> {
    private readonly config: TableConfig;
    private readonly root: HTMLTableElement;
    private body: HTMLTableSectionElement;
    private header: HTMLTableSectionElement;
    private handlers: Map<TableEvent, ((item: T) => void)[]>;
    private data: T[];

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
        this.handlers = new Map<TableEvent, ((item: T) => void)[]>();
        this.data = [];
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

    public clearData(): void {
        this.data = [];
        this.body.innerHTML = '';
    }

    public attachEvent(eventName: TableEvent, handler: (item: T) => void): void {
        if (this.handlers.has(eventName)) {
            let handlers = this.handlers.get(eventName);
            handlers.push(handler);
        } else {
            this.handlers.set(eventName, [handler]);
        }
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

    public parse(data: T[]): void {
        if (!data) {
            return;
        }
        data.forEach((item: T): void => {
            this.data.push(item);
            this.parseItem(item);
        });
    }

    private parseItem(item: T): void {
        let row = this.body.insertRow();
        row.addEventListener('click', (e: MouseEvent): void => {
            if (!this.handlers.has('itemClick')) {
                return;
            }
            let handlers = this.handlers.get('itemClick');
            for (let i = 0; i < handlers.length; i++) {
                handlers[i](this.data[row.rowIndex - 1]);
            }
        });
        this.config.columns.forEach((column: ColumnConfig): void => {
            let cell = row.insertCell();
            let parser = this.chooseParser(column.type);
            let content = (item as any)[column.source];
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
