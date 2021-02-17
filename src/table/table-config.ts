export type ColumnType = 'string' | 'integer' | 'float' | 'datetime' | 'b64image';

export interface ColumnConfig {
    source: string;
    caption: string;
    type: ColumnType;
    gravity?: number;
}

export interface TableConfig {
    columns: ColumnConfig[];
}
