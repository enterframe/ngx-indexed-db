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
var indexedDB = window.indexedDB || ((/** @type {?} */ (window))).mozIndexedDB || ((/** @type {?} */ (window))).webkitIndexedDB || ((/** @type {?} */ (window))).msIndexedDB;
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
    function (resolve, reject) {
        /** @type {?} */
        var request = indexedDB.open(dbName, version);
        /** @type {?} */
        var db;
        request.onsuccess = (/**
         * @param {?} event
         * @return {?}
         */
        function (event) {
            db = request.result;
            resolve(db);
        });
        request.onerror = (/**
         * @param {?} event
         * @return {?}
         */
        function (event) {
            reject("IndexedDB error: " + request.error);
        });
        if (typeof upgradeCallback === 'function') {
            request.onupgradeneeded = (/**
             * @param {?} event
             * @return {?}
             */
            function (event) {
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
    var request = indexedDB.open(dbName, version);
    request.onupgradeneeded = (/**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        /** @type {?} */
        var database = ((/** @type {?} */ (event.target))).result;
        storeSchemas.forEach((/**
         * @param {?} storeSchema
         * @return {?}
         */
        function (storeSchema) {
            if (!database.objectStoreNames.contains(storeSchema.store)) {
                /** @type {?} */
                var objectStore_1 = database.createObjectStore(storeSchema.store, storeSchema.storeConfig);
                storeSchema.storeSchema.forEach((/**
                 * @param {?} schema
                 * @return {?}
                 */
                function (schema) {
                    objectStore_1.createIndex(schema.name, schema.keypath, schema.options);
                }));
            }
        }));
        /** @type {?} */
        var storeMigrations = migrationFactory && migrationFactory();
        if (storeMigrations) {
            Object.keys(storeMigrations)
                .map((/**
             * @param {?} k
             * @return {?}
             */
            function (k) { return parseInt(k, 10); }))
                .filter((/**
             * @param {?} v
             * @return {?}
             */
            function (v) { return v > event.oldVersion; }))
                .sort((/**
             * @param {?} a
             * @param {?} b
             * @return {?}
             */
            function (a, b) { return a - b; }))
                .forEach((/**
             * @param {?} v
             * @return {?}
             */
            function (v) {
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
var DBMode = {
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
        reject("objectStore does not exists: " + storeName);
    }
}
/**
 * @param {?} db
 * @param {?} options
 * @return {?}
 */
function createTransaction(db, options) {
    /** @type {?} */
    var trans = db.transaction(options.storeName, options.dbMode);
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
        function (e) {
            reject(e);
        }),
        complete: (/**
         * @param {?} e
         * @return {?}
         */
        function (e) {
            resolve();
        }),
        abort: (/**
         * @param {?} e
         * @return {?}
         */
        function (e) {
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
var CONFIG_TOKEN = new InjectionToken(null);

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var NgxIndexedDBService = /** @class */ (function () {
    function NgxIndexedDBService(dbConfig) {
        this.dbConfig = dbConfig;
        if (!dbConfig.name) {
            throw new Error('NgxIndexedDB: Please, provide the dbName in the configuration');
        }
        if (!dbConfig.version) {
            throw new Error('NgxIndexedDB: Please, provide the db version in the configuration');
        }
        CreateObjectStore(dbConfig.name, dbConfig.version, dbConfig.objectStoresMeta, dbConfig.migrationFactory);
    }
    Object.defineProperty(NgxIndexedDBService.prototype, "currentStore", {
        get: /**
         * @return {?}
         */
        function () {
            return this._currentStore;
        },
        set: /**
         * @param {?} _currentStore
         * @return {?}
         */
        function (_currentStore) {
            this._currentStore = _currentStore;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @template T
     * @param {?} value
     * @param {?=} key
     * @return {?}
     */
    NgxIndexedDBService.prototype.add = /**
     * @template T
     * @param {?} value
     * @param {?=} key
     * @return {?}
     */
    function (value, key) {
        var _this = this;
        return new Promise((/**
         * @param {?} resolve
         * @param {?} reject
         * @return {?}
         */
        function (resolve, reject) {
            openDatabase(_this.dbConfig.name, _this.dbConfig.version).then((/**
             * @param {?} db
             * @return {?}
             */
            function (db) {
                /** @type {?} */
                var transaction = createTransaction(db, optionsGenerator(DBMode.readwrite, _this._currentStore, reject, resolve));
                /** @type {?} */
                var objectStore = transaction.objectStore(_this._currentStore);
                /** @type {?} */
                var request = objectStore.add(value, key);
                request.onsuccess = (/**
                 * @param {?} evt
                 * @return {?}
                 */
                function (evt) {
                    key = evt.target.result;
                    resolve(key);
                });
            }));
        }));
    };
    /**
     * @template T
     * @param {?} key
     * @return {?}
     */
    NgxIndexedDBService.prototype.getByKey = /**
     * @template T
     * @param {?} key
     * @return {?}
     */
    function (key) {
        var _this = this;
        return new Promise((/**
         * @param {?} resolve
         * @param {?} reject
         * @return {?}
         */
        function (resolve, reject) {
            openDatabase(_this.dbConfig.name, _this.dbConfig.version).then((/**
             * @param {?} db
             * @return {?}
             */
            function (db) {
                /** @type {?} */
                var transaction = createTransaction(db, optionsGenerator(DBMode.readonly, _this._currentStore, reject, resolve));
                /** @type {?} */
                var objectStore = transaction.objectStore(_this._currentStore);
                /** @type {?} */
                var request = objectStore.get(key);
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
    };
    /**
     * @template T
     * @param {?} id
     * @return {?}
     */
    NgxIndexedDBService.prototype.getByID = /**
     * @template T
     * @param {?} id
     * @return {?}
     */
    function (id) {
        var _this = this;
        return new Promise((/**
         * @param {?} resolve
         * @param {?} reject
         * @return {?}
         */
        function (resolve, reject) {
            openDatabase(_this.dbConfig.name, _this.dbConfig.version).then((/**
             * @param {?} db
             * @return {?}
             */
            function (db) {
                validateBeforeTransaction(db, _this._currentStore, reject);
                /** @type {?} */
                var transaction = createTransaction(db, optionsGenerator(DBMode.readonly, _this._currentStore, reject, resolve));
                /** @type {?} */
                var objectStore = transaction.objectStore(_this._currentStore);
                /** @type {?} */
                var request;
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
    };
    /**
     * @template T
     * @return {?}
     */
    NgxIndexedDBService.prototype.getAll = /**
     * @template T
     * @return {?}
     */
    function () {
        var _this = this;
        return new Promise((/**
         * @param {?} resolve
         * @param {?} reject
         * @return {?}
         */
        function (resolve, reject) {
            openDatabase(_this.dbConfig.name, _this.dbConfig.version).then((/**
             * @param {?} db
             * @return {?}
             */
            function (db) {
                validateBeforeTransaction(db, _this._currentStore, reject);
                /** @type {?} */
                var transaction = createTransaction(db, optionsGenerator(DBMode.readonly, _this._currentStore, reject, resolve));
                /** @type {?} */
                var objectStore = transaction.objectStore(_this._currentStore);
                /** @type {?} */
                var result = [];
                /** @type {?} */
                var request = objectStore.getAll();
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
                function (_a) {
                    var ResultAll = _a.target.result;
                    resolve((/** @type {?} */ (ResultAll)));
                });
            }));
        }));
    };
    /**
     * @template T
     * @param {?} value
     * @param {?=} key
     * @return {?}
     */
    NgxIndexedDBService.prototype.update = /**
     * @template T
     * @param {?} value
     * @param {?=} key
     * @return {?}
     */
    function (value, key) {
        var _this = this;
        return new Promise((/**
         * @param {?} resolve
         * @param {?} reject
         * @return {?}
         */
        function (resolve, reject) {
            openDatabase(_this.dbConfig.name, _this.dbConfig.version).then((/**
             * @param {?} db
             * @return {?}
             */
            function (db) {
                validateBeforeTransaction(db, _this._currentStore, reject);
                /** @type {?} */
                var transaction = createTransaction(db, optionsGenerator(DBMode.readwrite, _this._currentStore, reject, resolve));
                /** @type {?} */
                var objectStore = transaction.objectStore(_this._currentStore);
                transaction.oncomplete = (/**
                 * @param {?} event
                 * @return {?}
                 */
                function (event) {
                    resolve(event);
                });
                objectStore.put(value, key);
            }));
        }));
    };
    /**
     * @param {?} key
     * @return {?}
     */
    NgxIndexedDBService.prototype.deleteRecord = /**
     * @param {?} key
     * @return {?}
     */
    function (key) {
        var _this = this;
        return new Promise((/**
         * @param {?} resolve
         * @param {?} reject
         * @return {?}
         */
        function (resolve, reject) {
            openDatabase(_this.dbConfig.name, _this.dbConfig.version).then((/**
             * @param {?} db
             * @return {?}
             */
            function (db) {
                validateBeforeTransaction(db, _this._currentStore, reject);
                /** @type {?} */
                var transaction = createTransaction(db, optionsGenerator(DBMode.readwrite, _this._currentStore, reject, resolve));
                /** @type {?} */
                var objectStore = transaction.objectStore(_this._currentStore);
                /** @type {?} */
                var request = objectStore.delete(key);
                request.onsuccess = (/**
                 * @param {?} event
                 * @return {?}
                 */
                function (event) {
                    resolve(event);
                });
            }));
        }));
    };
    /**
     * @return {?}
     */
    NgxIndexedDBService.prototype.clear = /**
     * @return {?}
     */
    function () {
        var _this = this;
        return new Promise((/**
         * @param {?} resolve
         * @param {?} reject
         * @return {?}
         */
        function (resolve, reject) {
            openDatabase(_this.dbConfig.name, _this.dbConfig.version).then((/**
             * @param {?} db
             * @return {?}
             */
            function (db) {
                validateBeforeTransaction(db, _this._currentStore, reject);
                /** @type {?} */
                var transaction = createTransaction(db, optionsGenerator(DBMode.readwrite, _this._currentStore, reject, resolve));
                /** @type {?} */
                var objectStore = transaction.objectStore(_this._currentStore);
                objectStore.clear();
                transaction.oncomplete = (/**
                 * @param {?} event
                 * @return {?}
                 */
                function (event) {
                    resolve();
                });
            }));
        }));
    };
    /**
     * @param {?} key
     * @return {?}
     */
    NgxIndexedDBService.prototype.delete = /**
     * @param {?} key
     * @return {?}
     */
    function (key) {
        var _this = this;
        return new Promise((/**
         * @param {?} resolve
         * @param {?} reject
         * @return {?}
         */
        function (resolve, reject) {
            openDatabase(_this.dbConfig.name, _this.dbConfig.version).then((/**
             * @param {?} db
             * @return {?}
             */
            function (db) {
                validateBeforeTransaction(db, _this._currentStore, reject);
                /** @type {?} */
                var transaction = createTransaction(db, optionsGenerator(DBMode.readwrite, _this._currentStore, reject, resolve));
                /** @type {?} */
                var objectStore = transaction.objectStore(_this._currentStore);
                objectStore['delete'](key);
            }));
        }));
    };
    /**
     * @param {?} cursorCallback
     * @param {?=} keyRange
     * @return {?}
     */
    NgxIndexedDBService.prototype.openCursor = /**
     * @param {?} cursorCallback
     * @param {?=} keyRange
     * @return {?}
     */
    function (cursorCallback, keyRange) {
        var _this = this;
        return new Promise((/**
         * @param {?} resolve
         * @param {?} reject
         * @return {?}
         */
        function (resolve, reject) {
            openDatabase(_this.dbConfig.name, _this.dbConfig.version).then((/**
             * @param {?} db
             * @return {?}
             */
            function (db) {
                validateBeforeTransaction(db, _this._currentStore, reject);
                /** @type {?} */
                var transaction = createTransaction(db, optionsGenerator(DBMode.readonly, _this._currentStore, reject, resolve));
                /** @type {?} */
                var objectStore = transaction.objectStore(_this._currentStore);
                /** @type {?} */
                var request = objectStore.openCursor(keyRange);
                request.onsuccess = (/**
                 * @param {?} event
                 * @return {?}
                 */
                function (event) {
                    cursorCallback(event);
                    resolve();
                });
            }));
        }));
    };
    /**
     * @param {?} indexName
     * @param {?} key
     * @return {?}
     */
    NgxIndexedDBService.prototype.getByIndex = /**
     * @param {?} indexName
     * @param {?} key
     * @return {?}
     */
    function (indexName, key) {
        var _this = this;
        return new Promise((/**
         * @param {?} resolve
         * @param {?} reject
         * @return {?}
         */
        function (resolve, reject) {
            openDatabase(_this.dbConfig.name, _this.dbConfig.version).then((/**
             * @param {?} db
             * @return {?}
             */
            function (db) {
                validateBeforeTransaction(db, _this._currentStore, reject);
                /** @type {?} */
                var transaction = createTransaction(db, optionsGenerator(DBMode.readonly, _this._currentStore, reject, resolve));
                /** @type {?} */
                var objectStore = transaction.objectStore(_this._currentStore);
                /** @type {?} */
                var index = objectStore.index(indexName);
                /** @type {?} */
                var request = index.get(key);
                request.onsuccess = (/**
                 * @param {?} event
                 * @return {?}
                 */
                function (event) {
                    resolve(((/** @type {?} */ (event.target))).result);
                });
            }));
        }));
    };
    NgxIndexedDBService.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    NgxIndexedDBService.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: Inject, args: [CONFIG_TOKEN,] }] }
    ]; };
    return NgxIndexedDBService;
}());
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
var NgxIndexedDBModule = /** @class */ (function () {
    function NgxIndexedDBModule() {
    }
    /**
     * @param {?} dbConfig
     * @return {?}
     */
    NgxIndexedDBModule.forRoot = /**
     * @param {?} dbConfig
     * @return {?}
     */
    function (dbConfig) {
        return {
            ngModule: NgxIndexedDBModule,
            providers: [NgxIndexedDBService, { provide: CONFIG_TOKEN, useValue: dbConfig }]
        };
    };
    NgxIndexedDBModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [],
                    imports: [CommonModule]
                },] }
    ];
    return NgxIndexedDBModule;
}());

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
