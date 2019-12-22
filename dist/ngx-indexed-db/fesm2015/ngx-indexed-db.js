import { InjectionToken, Injectable, Inject, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @record
 */
function ObjectStoreMeta() { }
if (false) {
    /** @type {?} */
    ObjectStoreMeta.prototype.store;
    /** @type {?} */
    ObjectStoreMeta.prototype.storeConfig;
    /** @type {?} */
    ObjectStoreMeta.prototype.storeSchema;
}
/**
 * @record
 */
function ObjectStoreSchema() { }
if (false) {
    /** @type {?} */
    ObjectStoreSchema.prototype.name;
    /** @type {?} */
    ObjectStoreSchema.prototype.keypath;
    /** @type {?} */
    ObjectStoreSchema.prototype.options;
}
/**
 * @record
 */
function IndexDetails() { }
if (false) {
    /** @type {?} */
    IndexDetails.prototype.indexName;
    /** @type {?} */
    IndexDetails.prototype.order;
}
/**
 * @record
 * @template T
 */
function RequestEventTarget() { }
if (false) {
    /** @type {?} */
    RequestEventTarget.prototype.result;
}
/**
 * @record
 * @template T
 */
function RequestEvent() { }
if (false) {
    /** @type {?} */
    RequestEvent.prototype.target;
}
/** @type {?} */
const indexedDB = window.indexedDB || ((/** @type {?} */ (window))).mozIndexedDB || ((/** @type {?} */ (window))).webkitIndexedDB || ((/** @type {?} */ (window))).msIndexedDB;
/**
 * @param {?} dbName
 * @param {?} version
 * @param {?=} upgradeCallback
 * @return {?}
 */
function openDatabase(dbName, version, upgradeCallback) {
    return new Promise((/**
     * @param {?} resolve
     * @param {?} reject
     * @return {?}
     */
    (resolve, reject) => {
        /** @type {?} */
        const request = indexedDB.open(dbName, version);
        /** @type {?} */
        let db;
        request.onsuccess = (/**
         * @param {?} event
         * @return {?}
         */
        (event) => {
            db = request.result;
            resolve(db);
        });
        request.onerror = (/**
         * @param {?} event
         * @return {?}
         */
        (event) => {
            reject(`IndexedDB error: ${request.error}`);
        });
        if (typeof upgradeCallback === 'function') {
            request.onupgradeneeded = (/**
             * @param {?} event
             * @return {?}
             */
            (event) => {
                console.log('checkout');
                upgradeCallback(event, db);
            });
        }
    }));
}
/**
 * @param {?} dbName
 * @param {?} version
 * @param {?} storeSchemas
 * @param {?=} migrationFactory
 * @return {?}
 */
function CreateObjectStore(dbName, version, storeSchemas, migrationFactory) {
    /** @type {?} */
    const request = indexedDB.open(dbName, version);
    request.onupgradeneeded = (/**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        /** @type {?} */
        const database = ((/** @type {?} */ (event.target))).result;
        storeSchemas.forEach((/**
         * @param {?} storeSchema
         * @return {?}
         */
        (storeSchema) => {
            if (!database.objectStoreNames.contains(storeSchema.store)) {
                /** @type {?} */
                const objectStore = database.createObjectStore(storeSchema.store, storeSchema.storeConfig);
                storeSchema.storeSchema.forEach((/**
                 * @param {?} schema
                 * @return {?}
                 */
                (schema) => {
                    objectStore.createIndex(schema.name, schema.keypath, schema.options);
                }));
            }
        }));
        /** @type {?} */
        const storeMigrations = migrationFactory && migrationFactory();
        if (storeMigrations) {
            Object.keys(storeMigrations)
                .map((/**
             * @param {?} k
             * @return {?}
             */
            k => parseInt(k, 10)))
                .filter((/**
             * @param {?} v
             * @return {?}
             */
            v => v > event.oldVersion))
                .sort((/**
             * @param {?} a
             * @param {?} b
             * @return {?}
             */
            (a, b) => a - b))
                .forEach((/**
             * @param {?} v
             * @return {?}
             */
            v => {
                storeMigrations[v](database, request.transaction);
            }));
        }
        database.close();
    });
    request.onsuccess = (/**
     * @param {?} e
     * @return {?}
     */
    function (e) {
        e.target.result.close();
    });
}
/** @enum {string} */
const DBMode = {
    readonly: 'readonly',
    readwrite: 'readwrite',
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @record
 */
function Options() { }
if (false) {
    /** @type {?} */
    Options.prototype.storeName;
    /** @type {?} */
    Options.prototype.dbMode;
    /** @type {?} */
    Options.prototype.error;
    /** @type {?} */
    Options.prototype.complete;
    /** @type {?|undefined} */
    Options.prototype.abort;
}
/**
 * @param {?} db
 * @param {?} storeName
 * @return {?}
 */
function validateStoreName(db, storeName) {
    return db.objectStoreNames.contains(storeName);
}
/**
 * @param {?} db
 * @param {?} storeName
 * @param {?} reject
 * @return {?}
 */
function validateBeforeTransaction(db, storeName, reject) {
    if (!db) {
        reject('You need to use the openDatabase function to create a database before you query it!');
    }
    if (!validateStoreName(db, storeName)) {
        reject(`objectStore does not exists: ${storeName}`);
    }
}
/**
 * @param {?} db
 * @param {?} options
 * @return {?}
 */
function createTransaction(db, options) {
    /** @type {?} */
    let trans = db.transaction(options.storeName, options.dbMode);
    trans.onerror = options.error;
    trans.oncomplete = options.complete;
    trans.onabort = options.abort;
    return trans;
}
/**
 * @param {?} type
 * @param {?} storeName
 * @param {?} reject
 * @param {?} resolve
 * @return {?}
 */
function optionsGenerator(type, storeName, reject, resolve) {
    return {
        storeName: storeName,
        dbMode: type,
        error: (/**
         * @param {?} e
         * @return {?}
         */
        (e) => {
            reject(e);
        }),
        complete: (/**
         * @param {?} e
         * @return {?}
         */
        (e) => {
            resolve();
        }),
        abort: (/**
         * @param {?} e
         * @return {?}
         */
        (e) => {
            reject(e);
        })
    };
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @record
 */
function DBConfig() { }
if (false) {
    /** @type {?} */
    DBConfig.prototype.name;
    /** @type {?} */
    DBConfig.prototype.version;
    /** @type {?} */
    DBConfig.prototype.objectStoresMeta;
    /** @type {?|undefined} */
    DBConfig.prototype.migrationFactory;
}
/**
 * @record
 */
function ObjectStoreMeta$1() { }
if (false) {
    /** @type {?} */
    ObjectStoreMeta$1.prototype.store;
    /** @type {?} */
    ObjectStoreMeta$1.prototype.storeConfig;
    /** @type {?} */
    ObjectStoreMeta$1.prototype.storeSchema;
}
/**
 * @record
 */
function ObjectStoreSchema$1() { }
if (false) {
    /** @type {?} */
    ObjectStoreSchema$1.prototype.name;
    /** @type {?} */
    ObjectStoreSchema$1.prototype.keypath;
    /** @type {?} */
    ObjectStoreSchema$1.prototype.options;
}
/** @type {?} */
const CONFIG_TOKEN = new InjectionToken(null);

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class NgxIndexedDBService {
    /**
     * @param {?} dbConfig
     */
    constructor(dbConfig) {
        this.dbConfig = dbConfig;
        if (!dbConfig.name) {
            throw new Error('NgxIndexedDB: Please, provide the dbName in the configuration');
        }
        if (!dbConfig.version) {
            throw new Error('NgxIndexedDB: Please, provide the db version in the configuration');
        }
        CreateObjectStore(dbConfig.name, dbConfig.version, dbConfig.objectStoresMeta, dbConfig.migrationFactory);
    }
    /**
     * @param {?} _currentStore
     * @return {?}
     */
    set currentStore(_currentStore) {
        this._currentStore = _currentStore;
    }
    /**
     * @return {?}
     */
    get currentStore() {
        return this._currentStore;
    }
    /**
     * @template T
     * @param {?} value
     * @param {?=} key
     * @return {?}
     */
    add(value, key) {
        return new Promise((/**
         * @param {?} resolve
         * @param {?} reject
         * @return {?}
         */
        (resolve, reject) => {
            openDatabase(this.dbConfig.name, this.dbConfig.version).then((/**
             * @param {?} db
             * @return {?}
             */
            (db) => {
                /** @type {?} */
                let transaction = createTransaction(db, optionsGenerator(DBMode.readwrite, this._currentStore, reject, resolve));
                /** @type {?} */
                let objectStore = transaction.objectStore(this._currentStore);
                /** @type {?} */
                let request = objectStore.add(value, key);
                request.onsuccess = (/**
                 * @param {?} evt
                 * @return {?}
                 */
                (evt) => {
                    key = evt.target.result;
                    resolve(key);
                });
            }));
        }));
    }
    /**
     * @template T
     * @param {?} key
     * @return {?}
     */
    getByKey(key) {
        return new Promise((/**
         * @param {?} resolve
         * @param {?} reject
         * @return {?}
         */
        (resolve, reject) => {
            openDatabase(this.dbConfig.name, this.dbConfig.version).then((/**
             * @param {?} db
             * @return {?}
             */
            (db) => {
                /** @type {?} */
                let transaction = createTransaction(db, optionsGenerator(DBMode.readonly, this._currentStore, reject, resolve));
                /** @type {?} */
                let objectStore = transaction.objectStore(this._currentStore);
                /** @type {?} */
                let request = objectStore.get(key);
                request.onsuccess = (/**
                 * @param {?} event
                 * @return {?}
                 */
                function (event) {
                    resolve(((/** @type {?} */ (event.target))).result);
                });
                request.onerror = (/**
                 * @param {?} event
                 * @return {?}
                 */
                function (event) {
                    reject(event);
                });
            }));
        }));
    }
    /**
     * @template T
     * @param {?} id
     * @return {?}
     */
    getByID(id) {
        return new Promise((/**
         * @param {?} resolve
         * @param {?} reject
         * @return {?}
         */
        (resolve, reject) => {
            openDatabase(this.dbConfig.name, this.dbConfig.version).then((/**
             * @param {?} db
             * @return {?}
             */
            (db) => {
                validateBeforeTransaction(db, this._currentStore, reject);
                /** @type {?} */
                let transaction = createTransaction(db, optionsGenerator(DBMode.readonly, this._currentStore, reject, resolve));
                /** @type {?} */
                let objectStore = transaction.objectStore(this._currentStore);
                /** @type {?} */
                let request;
                request = objectStore.get(+id);
                request.onsuccess = (/**
                 * @param {?} event
                 * @return {?}
                 */
                function (event) {
                    resolve((/** @type {?} */ (((/** @type {?} */ (event.target))).result)));
                });
            }));
        }));
    }
    /**
     * @template T
     * @return {?}
     */
    getAll() {
        return new Promise((/**
         * @param {?} resolve
         * @param {?} reject
         * @return {?}
         */
        (resolve, reject) => {
            openDatabase(this.dbConfig.name, this.dbConfig.version).then((/**
             * @param {?} db
             * @return {?}
             */
            db => {
                validateBeforeTransaction(db, this._currentStore, reject);
                /** @type {?} */
                let transaction = createTransaction(db, optionsGenerator(DBMode.readonly, this._currentStore, reject, resolve));
                /** @type {?} */
                let objectStore = transaction.objectStore(this._currentStore);
                /** @type {?} */
                let result = [];
                /** @type {?} */
                const request = objectStore.getAll();
                request.onerror = (/**
                 * @param {?} e
                 * @return {?}
                 */
                function (e) {
                    reject(e);
                });
                request.onsuccess = (/**
                 * @param {?} __0
                 * @return {?}
                 */
                function ({ target: { result: ResultAll } }) {
                    resolve((/** @type {?} */ (ResultAll)));
                });
            }));
        }));
    }
    /**
     * @template T
     * @param {?} value
     * @param {?=} key
     * @return {?}
     */
    update(value, key) {
        return new Promise((/**
         * @param {?} resolve
         * @param {?} reject
         * @return {?}
         */
        (resolve, reject) => {
            openDatabase(this.dbConfig.name, this.dbConfig.version).then((/**
             * @param {?} db
             * @return {?}
             */
            db => {
                validateBeforeTransaction(db, this._currentStore, reject);
                /** @type {?} */
                let transaction = createTransaction(db, optionsGenerator(DBMode.readwrite, this._currentStore, reject, resolve));
                /** @type {?} */
                let objectStore = transaction.objectStore(this._currentStore);
                transaction.oncomplete = (/**
                 * @param {?} event
                 * @return {?}
                 */
                event => {
                    resolve(event);
                });
                objectStore.put(value, key);
            }));
        }));
    }
    /**
     * @param {?} key
     * @return {?}
     */
    deleteRecord(key) {
        return new Promise((/**
         * @param {?} resolve
         * @param {?} reject
         * @return {?}
         */
        (resolve, reject) => {
            openDatabase(this.dbConfig.name, this.dbConfig.version).then((/**
             * @param {?} db
             * @return {?}
             */
            db => {
                validateBeforeTransaction(db, this._currentStore, reject);
                /** @type {?} */
                let transaction = createTransaction(db, optionsGenerator(DBMode.readwrite, this._currentStore, reject, resolve));
                /** @type {?} */
                let objectStore = transaction.objectStore(this._currentStore);
                /** @type {?} */
                let request = objectStore.delete(key);
                request.onsuccess = (/**
                 * @param {?} event
                 * @return {?}
                 */
                event => {
                    resolve(event);
                });
            }));
        }));
    }
    /**
     * @return {?}
     */
    clear() {
        return new Promise((/**
         * @param {?} resolve
         * @param {?} reject
         * @return {?}
         */
        (resolve, reject) => {
            openDatabase(this.dbConfig.name, this.dbConfig.version).then((/**
             * @param {?} db
             * @return {?}
             */
            db => {
                validateBeforeTransaction(db, this._currentStore, reject);
                /** @type {?} */
                let transaction = createTransaction(db, optionsGenerator(DBMode.readwrite, this._currentStore, reject, resolve));
                /** @type {?} */
                let objectStore = transaction.objectStore(this._currentStore);
                objectStore.clear();
                transaction.oncomplete = (/**
                 * @param {?} event
                 * @return {?}
                 */
                event => {
                    resolve();
                });
            }));
        }));
    }
    /**
     * @param {?} key
     * @return {?}
     */
    delete(key) {
        return new Promise((/**
         * @param {?} resolve
         * @param {?} reject
         * @return {?}
         */
        (resolve, reject) => {
            openDatabase(this.dbConfig.name, this.dbConfig.version).then((/**
             * @param {?} db
             * @return {?}
             */
            db => {
                validateBeforeTransaction(db, this._currentStore, reject);
                /** @type {?} */
                let transaction = createTransaction(db, optionsGenerator(DBMode.readwrite, this._currentStore, reject, resolve));
                /** @type {?} */
                let objectStore = transaction.objectStore(this._currentStore);
                objectStore['delete'](key);
            }));
        }));
    }
    /**
     * @param {?} cursorCallback
     * @param {?=} keyRange
     * @return {?}
     */
    openCursor(cursorCallback, keyRange) {
        return new Promise((/**
         * @param {?} resolve
         * @param {?} reject
         * @return {?}
         */
        (resolve, reject) => {
            openDatabase(this.dbConfig.name, this.dbConfig.version).then((/**
             * @param {?} db
             * @return {?}
             */
            db => {
                validateBeforeTransaction(db, this._currentStore, reject);
                /** @type {?} */
                let transaction = createTransaction(db, optionsGenerator(DBMode.readonly, this._currentStore, reject, resolve));
                /** @type {?} */
                let objectStore = transaction.objectStore(this._currentStore);
                /** @type {?} */
                let request = objectStore.openCursor(keyRange);
                request.onsuccess = (/**
                 * @param {?} event
                 * @return {?}
                 */
                (event) => {
                    cursorCallback(event);
                    resolve();
                });
            }));
        }));
    }
    /**
     * @param {?} indexName
     * @param {?} key
     * @return {?}
     */
    getByIndex(indexName, key) {
        return new Promise((/**
         * @param {?} resolve
         * @param {?} reject
         * @return {?}
         */
        (resolve, reject) => {
            openDatabase(this.dbConfig.name, this.dbConfig.version).then((/**
             * @param {?} db
             * @return {?}
             */
            db => {
                validateBeforeTransaction(db, this._currentStore, reject);
                /** @type {?} */
                let transaction = createTransaction(db, optionsGenerator(DBMode.readonly, this._currentStore, reject, resolve));
                /** @type {?} */
                let objectStore = transaction.objectStore(this._currentStore);
                /** @type {?} */
                let index = objectStore.index(indexName);
                /** @type {?} */
                let request = index.get(key);
                request.onsuccess = (/**
                 * @param {?} event
                 * @return {?}
                 */
                (event) => {
                    resolve(((/** @type {?} */ (event.target))).result);
                });
            }));
        }));
    }
}
NgxIndexedDBService.decorators = [
    { type: Injectable }
];
/** @nocollapse */
NgxIndexedDBService.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Inject, args: [CONFIG_TOKEN,] }] }
];
if (false) {
    /**
     * @type {?}
     * @private
     */
    NgxIndexedDBService.prototype._currentStore;
    /**
     * @type {?}
     * @private
     */
    NgxIndexedDBService.prototype.dbConfig;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class NgxIndexedDBModule {
    /**
     * @param {?} dbConfig
     * @return {?}
     */
    static forRoot(dbConfig) {
        return {
            ngModule: NgxIndexedDBModule,
            providers: [NgxIndexedDBService, { provide: CONFIG_TOKEN, useValue: dbConfig }]
        };
    }
}
NgxIndexedDBModule.decorators = [
    { type: NgModule, args: [{
                declarations: [],
                imports: [CommonModule]
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

export { CONFIG_TOKEN, NgxIndexedDBModule, NgxIndexedDBService };
//# sourceMappingURL=ngx-indexed-db.js.map
