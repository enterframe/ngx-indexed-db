/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable, Inject } from '@angular/core';
import { openDatabase, DBMode, CreateObjectStore } from './ngx-indexed-db';
import { createTransaction, optionsGenerator, validateBeforeTransaction } from '../utils';
import { CONFIG_TOKEN } from './ngx-indexed-db.meta';
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
export { NgxIndexedDBService };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LWluZGV4ZWQtZGIuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1pbmRleGVkLWRiLyIsInNvdXJjZXMiOlsibGliL25neC1pbmRleGVkLWRiLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ25ELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxFQUFxQixpQkFBaUIsRUFBRSxNQUFNLGtCQUFrQixDQUFDO0FBQzlGLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxnQkFBZ0IsRUFBRSx5QkFBeUIsRUFBRSxNQUFNLFVBQVUsQ0FBQztBQUMxRixPQUFPLEVBQUUsWUFBWSxFQUFZLE1BQU0sdUJBQXVCLENBQUM7QUFFL0Q7SUFVQyw2QkFBMEMsUUFBa0I7UUFBbEIsYUFBUSxHQUFSLFFBQVEsQ0FBVTtRQUMzRCxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRTtZQUNuQixNQUFNLElBQUksS0FBSyxDQUFDLCtEQUErRCxDQUFDLENBQUM7U0FDakY7UUFDRCxJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sRUFBRTtZQUN0QixNQUFNLElBQUksS0FBSyxDQUFDLG1FQUFtRSxDQUFDLENBQUM7U0FDckY7UUFDRCxpQkFBaUIsQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLFFBQVEsQ0FBQyxPQUFPLEVBQUUsUUFBUSxDQUFDLGdCQUFnQixFQUFFLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO0lBQzFHLENBQUM7SUFoQkQsc0JBQUksNkNBQVk7Ozs7UUFHaEI7WUFDQyxPQUFPLElBQUksQ0FBQyxhQUFhLENBQUM7UUFDM0IsQ0FBQzs7Ozs7UUFMRCxVQUFpQixhQUFxQjtZQUNyQyxJQUFJLENBQUMsYUFBYSxHQUFHLGFBQWEsQ0FBQztRQUNwQyxDQUFDOzs7T0FBQTs7Ozs7OztJQWdCRCxpQ0FBRzs7Ozs7O0lBQUgsVUFBTyxLQUFRLEVB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LEtBQUssR0FBRyxXQUFXLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQzs7b0JBQ3BDLE9BQU8sR0FBRyxLQUFLLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQztnQkFDekIsT0FBTyxDQUFDLFNBQVM7Ozs7Z0JBQUcsVUFBQyxLQUFZO29CQUNoQyxPQUFPLENBQUMsQ0FBQyxtQkFBa0IsS0FBSyxDQUFDLE1BQU0sRUFBQSxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUM7Z0JBQ2xELENBQUMsQ0FBQSxDQUFDO1lBQ0gsQ0FBQyxFQUFDLENBQUM7UUFDSixDQUFDLEVBQUMsQ0FBQztJQUNKLENBQUM7O2dCQXJNRCxVQUFVOzs7O2dEQVVHLE1BQU0sU0FBQyxZQUFZOztJQTRMakMsMEJBQUM7Q0FBQSxBQXRNRCxJQXNNQztTQXJNWSxtQkFBbUI7Ozs7OztJQU8vQiw0Q0FBOEI7Ozs7O0lBRWxCLHVDQUFnRCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUsIEluamVjdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgb3BlbkRhdGFiYXNlLCBEQk1vZGUsIEtleSwgUmVxdWVzdEV2ZW50LCBDcmVhdGVPYmplY3RTdG9yZSB9IGZyb20gJy4vbmd4LWluZGV4ZWQtZGInO1xuaW1wb3J0IHsgY3JlYXRlVHJhbnNhY3Rpb24sIG9wdGlvbnNHZW5lcmF0b3IsIHZhbGlkYXRlQmVmb3JlVHJhbnNhY3Rpb24gfSBmcm9tICcuLi91dGlscyc7XG5pbXBvcnQgeyBDT05GSUdfVE9LRU4sIERCQ29uZmlnIH0gZnJvbSAnLi9uZ3gtaW5kZXhlZC1kYi5tZXRhJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIE5neEluZGV4ZWREQlNlcnZpY2Uge1xuXHRzZXQgY3VycmVudFN0b3JlKF9jdXJyZW50U3RvcmU6IHN0cmluZykge1xuXHRcdHRoaXMuX2N1cnJlbnRTdG9yZSA9IF9jdXJyZW50U3RvcmU7XG5cdH1cblx0Z2V0IGN1cnJlbnRTdG9yZSgpOiBzdHJpbmcge1xuXHRcdHJldHVybiB0aGlzLl9jdXJyZW50U3RvcmU7XG5cdH1cblx0cHJpdmF0ZSBfY3VycmVudFN0b3JlOiBzdHJpbmc7XG5cblx0Y29uc3RydWN0b3IoQEluamVjdChDT05GSUdfVE9LRU4pIHByaXZhdGUgZGJDb25maWc6IERCQ29uZmlnKSB7XG5cdFx0aWYgKCFkYkNvbmZpZy5uYW1lKSB7XG5cdFx0XHR0aHJvdyBuZXcgRXJyb3IoJ05neEluZGV4ZWREQjogUGxlYXNlLCBwcm92aWRlIHRoZSBkYk5hbWUgaW4gdGhlIGNvbmZpZ3VyYXRpb24nKTtcblx0XHR9XG5cdFx0aWYgKCFkYkNvbmZpZy52ZXJzaW9uKSB7XG5cdFx0XHR0aHJvdyBuZXcgRXJyb3IoJ05neEluZGV4ZWREQjogUGxlYXNlLCBwcm92aWRlIHRoZSBkYiB2ZXJzaW9uIGluIHRoZSBjb25maWd1cmF0aW9uJyk7XG5cdFx0fVxuXHRcdENyZWF0ZU9iamVjdFN0b3JlKGRiQ29uZmlnLm5hbWUsIGRiQ29uZmlnLnZlcnNpb24sIGRiQ29uZmlnLm9iamVjdFN0b3Jlc01ldGEsIGRiQ29uZmlnLm1pZ3JhdGlvbkZhY3RvcnkpO1xuXHR9XG5cblx0YWRkPFQ+KHZhbHVlOiBULCBrZXk/OiBhbnkpIHtcblx0XHRyZXR1cm4gbmV3IFByb21pc2U8bnVtYmVyPigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG5cdFx0XHRvcGVuRGF0YWJhc2UodGhpcy5kYkNvbmZpZy5uYW1lLCB0aGlzLmRiQ29uZmlnLnZlcnNpb24pLnRoZW4oKGRiOiBJREJEYXRhYmFzZSkgPT4ge1xuXHRcdFx0XHRsZXQgdHJhbnNhY3Rpb24gPSBjcmVhdGVUcmFuc2FjdGlvbihcblx0XHRcdFx0XHRcdGRiLFxuXHRcdFx0XHRcdFx0b3B0aW9uc0dlbmVyYXRvcihEQk1vZGUucmVhZHdyaXRlLCB0aGlzLl9jdXJyZW50U3RvcmUsIHJlamVjdCwgcmVzb2x2ZSlcblx0XHRcdFx0XHQpLFxuXHRcdFx0XHRcdG9iamVjdFN0b3JlID0gdHJhbnNhY3Rpb24ub2JqZWN0U3RvcmUodGhpcy5fY3VycmVudFN0b3JlKTtcblx0XHRcdFx0bGV0IHJlcXVlc3QgPSBvYmplY3RTdG9yZS5hZGQodmFsdWUsIGtleSk7XG5cdFx0XHRcdHJlcXVlc3Qub25zdWNjZXNzID0gKGV2dDogYW55KSA9PiB7XG5cdFx0XHRcdFx0a2V5ID0gZXZ0LnRhcmdldC5yZXN1bHQ7XG5cdFx0XHRcdFx0cmVzb2x2ZShrZXkpO1xuXHRcdFx0XHR9O1xuXHRcdFx0fSk7XG5cdFx0fSk7XG5cdH1cblxuXHRnZXRCeUtleTxUPihrZXk6IGFueSkge1xuXHRcdHJldHVybiBuZXcgUHJvbWlzZTxhbnk+KChyZXNvbHZlLCByZWplY3QpID0+IHtcblx0XHRcdG9wZW5EYXRhYmFzZSh0aGlzLmRiQ29uZmlnLm5hbWUsIHRoaXMuZGJDb25maWcudmVyc2lvbikudGhlbigoZGI6IElEQkRhdGFiYXNlKSA9PiB7XG5cdFx0XHRcdGxldCB0cmFuc2FjdGlvbiA9IGNyZWF0ZVRyYW5zYWN0aW9uKFxuXHRcdFx0XHRcdFx0ZGIsXG5cdFx0XHRcdFx0XHRvcHRpb25zR2VuZXJhdG9yKERCTW9kZS5yZWFkb25seSwgdGhpcy5fY3VycmVudFN0b3JlLCByZWplY3QsIHJlc29sdmUpXG5cdFx0XHRcdFx0KSxcblx0XHRcdFx0XHRvYmplY3RTdG9yZSA9IHRyYW5zYWN0aW9uLm9iamVjdFN0b3JlKHRoaXMuX2N1cnJlbnRTdG9yZSk7XG5cdFx0XHRcdGxldCByZXF1ZXN0ID0gb2JqZWN0U3RvcmUuZ2V0KGtleSk7XG5cdFx0XHRcdHJlcXVlc3Qub25zdWNjZXNzID0gZnVuY3Rpb24oZXZlbnQ6IEV2ZW50KSB7XG5cdFx0XHRcdFx0cmVzb2x2ZSgoPGFueT5ldmVudC50YXJnZXQpLnJlc3VsdCk7XG5cdFx0XHRcdH07XG5cdFx0XHRcdHJlcXVlc3Qub25lcnJvciA9IGZ1bmN0aW9uKGV2ZW50OiBFdmVudCkge1xuXHRcdFx0XHRcdHJlamVjdChldmVudCk7XG5cdFx0XHRcdH07XG5cdFx0XHR9KTtcblx0XHR9KTtcblx0fVxuXG5cdGdldEJ5SUQ8VD4oaWQ6IHN0cmluZyB8IG51bWJlcikge1xuXHRcdHJldHVybiBuZXcgUHJvbWlzZTxUPigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG5cdFx0XHRvcGVuRGF0YWJhc2UodGhpcy5kYkNvbmZpZy5uYW1lLCB0aGlzLmRiQ29uZmlnLnZlcnNpb24pLnRoZW4oKGRiOiBJREJEYXRhYmFzZSkgPT4ge1xuXHRcdFx0XHR2YWxpZGF0ZUJlZm9yZVRyYW5zYWN0aW9uKGRiLCB0aGlzLl9jdXJyZW50U3RvcmUsIHJlamVjdCk7XG5cdFx0XHRcdGxldCB0cmFuc2FjdGlvbiA9IGNyZWF0ZVRyYW5zYWN0aW9uKFxuXHRcdFx0XHRcdFx0ZGIsXG5cdFx0XHRcdFx0XHRvcHRpb25zR2VuZXJhdG9yKERCTW9kZS5yZWFkb25seSwgdGhpcy5fY3VycmVudFN0b3JlLCByZWplY3QsIHJlc29sdmUpXG5cdFx0XHRcdFx0KSxcblx0XHRcdFx0XHRvYmplY3RTdG9yZSA9IHRyYW5zYWN0aW9uLm9iamVjdFN0b3JlKHRoaXMuX2N1cnJlbnRTdG9yZSksXG5cdFx0XHRcdFx0cmVxdWVzdDogSURCUmVxdWVzdDtcblx0XHRcdFx0cmVxdWVzdCA9IG9iamVjdFN0b3JlLmdldCgraWQpO1xuXHRcdFx0XHRyZXF1ZXN0Lm9uc3VjY2VzcyA9IGZ1bmN0aW9uKGV2ZW50OiBFdmVudCkge1xuXHRcdFx0XHRcdHJlc29sdmUoKGV2ZW50LnRhcmdldCBhcyBhbnkpLnJlc3VsdCBhcyBUKTtcblx0XHRcdFx0fTtcblx0XHRcdH0pO1xuXHRcdH0pO1xuXHR9XG5cblx0Z2V0QWxsPFQ+KCkge1xuXHRcdHJldHVybiBuZXcgUHJvbWlzZTxUW10+KChyZXNvbHZlLCByZWplY3QpID0+IHtcblx0XHRcdG9wZW5EYXRhYmFzZSh0aGlzLmRiQ29uZmlnLm5hbWUsIHRoaXMuZGJDb25maWcudmVyc2lvbikudGhlbihkYiA9PiB7XG5cdFx0XHRcdHZhbGlkYXRlQmVmb3JlVHJhbnNhY3Rpb24oZGIsIHRoaXMuX2N1cnJlbnRTdG9yZSwgcmVqZWN0KTtcblx0XHRcdFx0bGV0IHRyYW5zYWN0aW9uID0gY3JlYXRlVHJhbnNhY3Rpb24oXG5cdFx0XHRcdFx0XHRkYixcblx0XHRcdFx0XHRcdG9wdGlvbnNHZW5lcmF0b3IoREJNb2RlLnJlYWRvbmx5LCB0aGlzLl9jdXJyZW50U3RvcmUsIHJlamVjdCwgcmVzb2x2ZSlcblx0XHRcdFx0XHQpLFxuXHRcdFx0XHRcdG9iamVjdFN0b3JlID0gdHJhbnNhY3Rpb24ub2JqZWN0U3RvcmUodGhpcy5fY3VycmVudFN0b3JlKSxcblx0XHRcdFx0XHRyZXN1bHQ6IEFycmF5PGFueT4gPSBbXTtcblxuXHRcdFx0XHRjb25zdCByZXF1ZXN0OiBJREJSZXF1ZXN0ID0gb2JqZWN0U3RvcmUuZ2V0QWxsKCk7XG5cblx0XHRcdFx0cmVxdWVzdC5vbmVycm9yID0gZnVuY3Rpb24oZSkge1xuXHRcdFx0XHRcdHJlamVjdChlKTtcblx0XHRcdFx0fTtcblx0XHRcdFx0cmVxdWVzdC5vbnN1Y2Nlc3MgPSBmdW5jdGlvbih7IHRhcmdldDogeyByZXN1bHQ6IFJlc3VsdEFsbCB9IH06IFJlcXVlc3RFdmVudDxUPikge1xuXHRcdFx0XHRcdHJlc29sdmUoUmVzdWx0QWxsIGFzIFRbXSk7XG5cdFx0XHRcdH07XG5cdFx0XHR9KTtcblx0XHR9KTtcblx0fVxuXG5cdHVwZGF0ZTxUPih2YWx1ZTogVCwga2V5PzogYW55KSB7XG5cdFx0cmV0dXJuIG5ldyBQcm9taXNlPGFueT4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuXHRcdFx0b3BlbkRhdGFiYXNlKHRoaXMuZGJDb25maWcubmFtZSwgdGhpcy5kYkNvbmZpZy52ZXJzaW9uKS50aGVuKGRiID0+IHtcblx0XHRcdFx0dmFsaWRhdGVCZWZvcmVUcmFuc2FjdGlvbihkYiwgdGhpcy5fY3VycmVudFN0b3JlLCByZWplY3QpO1xuXHRcdFx0XHRsZXQgdHJhbnNhY3Rpb24gPSBjcmVhdGVUcmFuc2FjdGlvbihcblx0XHRcdFx0XHRcdGRiLFxuXHRcdFx0XHRcdFx0b3B0aW9uc0dlbmVyYXRvcihEQk1vZGUucmVhZHdyaXRlLCB0aGlzLl9jdXJyZW50U3RvcmUsIHJlamVjdCwgcmVzb2x2ZSlcblx0XHRcdFx0XHQpLFxuXHRcdFx0XHRcdG9iamVjdFN0b3JlID0gdHJhbnNhY3Rpb24ub2JqZWN0U3RvcmUodGhpcy5fY3VycmVudFN0b3JlKTtcblx0XHRcdFx0dHJhbnNhY3Rpb24ub25jb21wbGV0ZSA9IGV2ZW50ID0+IHtcblx0XHRcdFx0XHRyZXNvbHZlKGV2ZW50KTtcblx0XHRcdFx0fTtcblx0XHRcdFx0b2JqZWN0U3RvcmUucHV0KHZhbHVlLCBrZXkpO1xuXHRcdFx0fSk7XG5cdFx0fSk7XG5cdH1cblxuXHRkZWxldGVSZWNvcmQoa2V5OiBLZXkpIHtcblx0XHRyZXR1cm4gbmV3IFByb21pc2U8YW55PigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG5cdFx0XHRvcGVuRGF0YWJhc2UodGhpcy5kYkNvbmZpZy5uYW1lLCB0aGlzLmRiQ29uZmlnLnZlcnNpb24pLnRoZW4oZGIgPT4ge1xuXHRcdFx0XHR2YWxpZGF0ZUJlZm9yZVRyYW5zYWN0aW9uKGRiLCB0aGlzLl9jdXJyZW50U3RvcmUsIHJlamVjdCk7XG5cdFx0XHRcdGxldCB0cmFuc2FjdGlvbiA9IGNyZWF0ZVRyYW5zYWN0aW9uKFxuXHRcdFx0XHRcdFx0ZGIsXG5cdFx0XHRcdFx0XHRvcHRpb25zR2VuZXJhdG9yKERCTW9kZS5yZWFkd3JpdGUsIHRoaXMuX2N1cnJlbnRTdG9yZSwgcmVqZWN0LCByZXNvbHZlKVxuXHRcdFx0XHRcdCksXG5cdFx0XHRcdFx0b2JqZWN0U3RvcmUgPSB0cmFuc2FjdGlvbi5vYmplY3RTdG9yZSh0aGlzLl9jdXJyZW50U3RvcmUpO1xuXHRcdFx0XHRsZXQgcmVxdWVzdCA9IG9iamVjdFN0b3JlLmRlbGV0ZShrZXkpO1xuXHRcdFx0XHRyZXF1ZXN0Lm9uc3VjY2VzcyA9IGV2ZW50ID0+IHtcblx0XHRcdFx0XHRyZXNvbHZlKGV2ZW50KTtcblx0XHRcdFx0fTtcblx0XHRcdH0pO1xuXHRcdH0pO1xuXHR9XG5cblx0Y2xlYXIoKSB7XG5cdFx0cmV0dXJuIG5ldyBQcm9taXNlPGFueT4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuXHRcdFx0b3BlbkRhdGFiYXNlKHRoaXMuZGJDb25maWcubmFtZSwgdGhpcy5kYkNvbmZpZy52ZXJzaW9uKS50aGVuKGRiID0+IHtcblx0XHRcdFx0dmFsaWRhdGVCZWZvcmVUcmFuc2FjdGlvbihkYiwgdGhpcy5fY3VycmVudFN0b3JlLCByZWplY3QpO1xuXHRcdFx0XHRsZXQgdHJhbnNhY3Rpb24gPSBjcmVhdGVUcmFuc2FjdGlvbihcblx0XHRcdFx0XHRcdGRiLFxuXHRcdFx0XHRcdFx0b3B0aW9uc0dlbmVyYXRvcihEQk1vZGUucmVhZHdyaXRlLCB0aGlzLl9jdXJyZW50U3RvcmUsIHJlamVjdCwgcmVzb2x2ZSlcblx0XHRcdFx0XHQpLFxuXHRcdFx0XHRcdG9iamVjdFN0b3JlID0gdHJhbnNhY3Rpb24ub2JqZWN0U3RvcmUodGhpcy5fY3VycmVudFN0b3JlKTtcblx0XHRcdFx0b2JqZWN0U3RvcmUuY2xlYXIoKTtcblx0XHRcdFx0dHJhbnNhY3Rpb24ub25jb21wbGV0ZSA9IGV2ZW50ID0+IHtcblx0XHRcdFx0XHRyZXNvbHZlKCk7XG5cdFx0XHRcdH07XG5cdFx0XHR9KTtcblx0XHR9KTtcblx0fVxuXG5cdGRlbGV0ZShrZXk6IGFueSkge1xuXHRcdHJldHVybiBuZXcgUHJvbWlzZTxhbnk+KChyZXNvbHZlLCByZWplY3QpID0+IHtcblx0XHRcdG9wZW5EYXRhYmFzZSh0aGlzLmRiQ29uZmlnLm5hbWUsIHRoaXMuZGJDb25maWcudmVyc2lvbikudGhlbihkYiA9PiB7XG5cdFx0XHRcdHZhbGlkYXRlQmVmb3JlVHJhbnNhY3Rpb24oZGIsIHRoaXMuX2N1cnJlbnRTdG9yZSwgcmVqZWN0KTtcblx0XHRcdFx0bGV0IHRyYW5zYWN0aW9uID0gY3JlYXRlVHJhbnNhY3Rpb24oXG5cdFx0XHRcdFx0XHRkYixcblx0XHRcdFx0XHRcdG9wdGlvbnNHZW5lcmF0b3IoREJNb2RlLnJlYWR3cml0ZSwgdGhpcy5fY3VycmVudFN0b3JlLCByZWplY3QsIHJlc29sdmUpXG5cdFx0XHRcdFx0KSxcblx0XHRcdFx0XHRvYmplY3RTdG9yZSA9IHRyYW5zYWN0aW9uLm9iamVjdFN0b3JlKHRoaXMuX2N1cnJlbnRTdG9yZSk7XG5cdFx0XHRcdG9iamVjdFN0b3JlWydkZWxldGUnXShrZXkpO1xuXHRcdFx0fSk7XG5cdFx0fSk7XG5cdH1cblxuXHRvcGVuQ3Vyc29yKGN1cnNvckNhbGxiYWNrOiAoZXZlbnQ6IEV2ZW50KSA9PiB2b2lkLCBrZXlSYW5nZT86IElEQktleVJhbmdlKSB7XG5cdFx0cmV0dXJuIG5ldyBQcm9taXNlPHZvaWQ+KChyZXNvbHZlLCByZWplY3QpID0+IHtcblx0XHRcdG9wZW5EYXRhYmFzZSh0aGlzLmRiQ29uZmlnLm5hbWUsIHRoaXMuZGJDb25maWcudmVyc2lvbikudGhlbihkYiA9PiB7XG5cdFx0XHRcdHZhbGlkYXRlQmVmb3JlVHJhbnNhY3Rpb24oZGIsIHRoaXMuX2N1cnJlbnRTdG9yZSwgcmVqZWN0KTtcblx0XHRcdFx0bGV0IHRyYW5zYWN0aW9uID0gY3JlYXRlVHJhbnNhY3Rpb24oXG5cdFx0XHRcdFx0XHRkYixcblx0XHRcdFx0XHRcdG9wdGlvbnNHZW5lcmF0b3IoREJNb2RlLnJlYWRvbmx5LCB0aGlzLl9jdXJyZW50U3RvcmUsIHJlamVjdCwgcmVzb2x2ZSlcblx0XHRcdFx0XHQpLFxuXHRcdFx0XHRcdG9iamVjdFN0b3JlID0gdHJhbnNhY3Rpb24ub2JqZWN0U3RvcmUodGhpcy5fY3VycmVudFN0b3JlKSxcblx0XHRcdFx0XHRyZXF1ZXN0ID0gb2JqZWN0U3RvcmUub3BlbkN1cnNvcihrZXlSYW5nZSk7XG5cblx0XHRcdFx0cmVxdWVzdC5vbnN1Y2Nlc3MgPSAoZXZlbnQ6IEV2ZW50KSA9PiB7XG5cdFx0XHRcdFx0Y3Vyc29yQ2FsbGJhY2soZXZlbnQpO1xuXHRcdFx0XHRcdHJlc29sdmUoKTtcblx0XHRcdFx0fTtcblx0XHRcdH0pO1xuXHRcdH0pO1xuXHR9XG5cblx0Z2V0QnlJbmRleChpbmRleE5hbWU6IHN0cmluZywga2V5OiBhbnkpIHtcblx0XHRyZXR1cm4gbmV3IFByb21pc2U8YW55PigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG5cdFx0XHRvcGVuRGF0YWJhc2UodGhpcy5kYkNvbmZpZy5uYW1lLCB0aGlzLmRiQ29uZmlnLnZlcnNpb24pLnRoZW4oZGIgPT4ge1xuXHRcdFx0XHR2YWxpZGF0ZUJlZm9yZVRyYW5zYWN0aW9uKGRiLCB0aGlzLl9jdXJyZW50U3RvcmUsIHJlamVjdCk7XG5cdFx0XHRcdGxldCB0cmFuc2FjdGlvbiA9IGNyZWF0ZVRyYW5zYWN0aW9uKFxuXHRcdFx0XHRcdFx0ZGIsXG5cdFx0XHRcdFx0XHRvcHRpb25zR2VuZXJhdG9yKERCTW9kZS5yZWFkb25seSwgdGhpcy5fY3VycmVudFN0b3JlLCByZWplY3QsIHJlc29sdmUpXG5cdFx0XHRcdFx0KSxcblx0XHRcdFx0XHRvYmplY3RTdG9yZSA9IHRyYW5zYWN0aW9uLm9iamVjdFN0b3JlKHRoaXMuX2N1cnJlbnRTdG9yZSksXG5cdFx0XHRcdFx0aW5kZXggPSBvYmplY3RTdG9yZS5pbmRleChpbmRleE5hbWUpLFxuXHRcdFx0XHRcdHJlcXVlc3QgPSBpbmRleC5nZXQoa2V5KTtcblx0XHRcdFx0cmVxdWVzdC5vbnN1Y2Nlc3MgPSAoZXZlbnQ6IEV2ZW50KSA9PiB7XG5cdFx0XHRcdFx0cmVzb2x2ZSgoPElEQk9wZW5EQlJlcXVlc3Q+ZXZlbnQudGFyZ2V0KS5yZXN1bHQpO1xuXHRcdFx0XHR9O1xuXHRcdFx0fSk7XG5cdFx0fSk7XG5cdH1cbn1cbiJdfQ==