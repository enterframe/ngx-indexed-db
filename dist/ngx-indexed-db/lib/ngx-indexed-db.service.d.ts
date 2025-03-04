import { Key } from './ngx-indexed-db';
import { DBConfig } from './ngx-indexed-db.meta';
export declare class NgxIndexedDBService {
    private dbConfig;
    currentStore: string;
    private _currentStore;
    constructor(dbConfig: DBConfig);
    add<T>(value: T, key?: any): Promise<number>;
    getByKey<T>(key: any): Promise<any>;
    getByID<T>(id: string | number): Promise<T>;
    getAll<T>(): Promise<T[]>;
    update<T>(value: T, key?: any): Promise<any>;
    deleteRecord(key: Key): Promise<any>;
    clear(): Promise<any>;
    delete(key: any): Promise<any>;
    openCursor(cursorCallback: (event: Event) => void, keyRange?: IDBKeyRange): Promise<void>;
    getByIndex(indexName: string, key: any): Promise<any>;
}
