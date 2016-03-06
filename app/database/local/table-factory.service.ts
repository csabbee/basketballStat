import {Injectable} from 'angular2/core';

@Injectable()
export class TableFactory {
    private _tables: Object;

    getTable(tableName: string): Promise<PouchDB> {
        if (!this._tables[tableName]) {
            this._tables[tableName] = new PouchDB(tableName);
        }

        return Promise.resolve(this._tables[tableName]);
    }

    get tables():Object {
        return this._tables;
    }
}
