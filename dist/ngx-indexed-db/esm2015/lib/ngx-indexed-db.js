/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @record
 */
export function ObjectStoreMeta() { }
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
export function ObjectStoreSchema() { }
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
export function IndexDetails() { }
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
export function RequestEventTarget() { }
if (false) {
    /** @type {?} */
    RequestEventTarget.prototype.result;
}
/**
 * @record
 * @template T
 */
export function RequestEvent() { }
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
export function openDatabase(dbName, version, upgradeCallback) {
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
export function CreateObjectStore(dbName, version, storeSchemas, migrationFactory) {
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
export { DBMode };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LWluZGV4ZWQtZGIuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtaW5kZXhlZC1kYi8iLCJzb3VyY2VzIjpbImxpYi9uZ3gtaW5kZXhlZC1kYi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUEscUNBSUM7OztJQUhBLGdDQUFjOztJQUNkLHNDQUE2RTs7SUFDN0Usc0NBQWlDOzs7OztBQUdsQyx1Q0FJQzs7O0lBSEEsaUNBQWE7O0lBQ2Isb0NBQTJCOztJQUMzQixvQ0FBaUQ7Ozs7O0FBR2xELGtDQUdDOzs7SUFGQSxpQ0FBa0I7O0lBQ2xCLDZCQUFjOzs7Ozs7QUFFZix3Q0FFQzs7O0lBREEsb0NBQWdCOzs7Ozs7QUFHakIsa0NBRUM7OztJQURBLDhCQUE4Qjs7O01BR3pCLFNBQVMsR0FDZCxNQUFNLENBQUMsU0FBUyxJQUFJLENBQUMsbUJBQUssTUFBTSxFQUFBLENBQUMsQ0FBQyxZQUFZLElBQUksQ0FBQyxtQkFBSyxNQUFNLEVBQUEsQ0FBQyxDQUFDLGVBQWUsSUFBSSxDQUFDLG1CQUFLLE1BQU0sRUFBQSxDQUFDLENBQUMsV0FBVzs7Ozs7OztBQUU3RyxNQUFNLFVBQVUsWUFBWSxDQUFDLE1BQWMsRUFBRSxPQUFlLEVBQUUsZUFBMEI7SUFDdkYsT0FBTyxJQUFJLE9BQU87Ozs7O0lBQWMsQ0FBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLEVBQUU7O2NBQzdDLE9BQU8sR0FBRyxTQUFTLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxPQUFPLENBQUM7O1lBQzNDLEVBQWU7UUFDbkIsT0FBTyxDQUFDLFNBQVM7Ozs7UUFBRyxDQUFDLEtBQVksRUFBRSxFQUFFO1lBQ3BDLEVBQUUsR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDO1lBQ3BCLE9BQU8sQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUNiLENBQUMsQ0FBQSxDQUFDO1FBQ0YsT0FBTyxDQUFDLE9BQU87Ozs7UUFBRyxDQUFDLEtBQVksRUFBRSxFQUFFO1lBQ2xDLE1BQU0sQ0FBQyxvQkFBb0IsT0FBTyxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUM7UUFDN0MsQ0FBQyxDQUFBLENBQUM7UUFDRixJQUFJLE9BQU8sZUFBZSxLQUFLLFVBQVUsRUFBRTtZQUMxQyxPQUFPLENBQUMsZUFBZTs7OztZQUFHLENBQUMsS0FBWSxFQUFFLEVBQUU7Z0JBQzFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLENBQUM7Z0JBQ3hCLGVBQWUsQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLENBQUM7WUFDNUIsQ0FBQyxDQUFBLENBQUM7U0FDRjtJQUNGLENBQUMsRUFBQyxDQUFDO0FBQ0osQ0FBQzs7Ozs7Ozs7QUFFRCxNQUFNLFVBQVUsaUJBQWlCLENBQ2hDLE1BQWMsRUFDZCxPQUFlLEVBQ2YsWUFBK0IsRUFDL0IsZ0JBQWtHOztVQUU1RixPQUFPLEdBQXFCLFNBQVMsQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLE9BQU8sQ0FBQztJQUVqRSxPQUFPLENBQUMsZUFBZTs7OztJQUFHLFVBQVMsS0FBNEI7O2NBQ3hELFFBQVEsR0FBZ0IsQ0FBQyxtQkFBQSxLQUFLLENBQUMsTUFBTSxFQUFPLENBQUMsQ0FBQyxNQUFNO1FBRTFELFlBQVksQ0FBQyxPQUFPOzs7O1FBQUMsQ0FBQyxXQUE0QixFQUFFLEVBQUU7WUFDckQsSUFBSSxDQUFDLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxFQUFFOztzQkFDckQsV0FBVyxHQUFHLFFBQVEsQ0FBQyxpQkFBaUIsQ0FBQyxXQUFXLENBQUMsS0FBSyxFQUFFLFdBQVcsQ0FBQyxXQUFXLENBQUM7Z0JBQzFGLFdBQVcsQ0FBQyxXQUFXLENBQUMsT0FBTzs7OztnQkFBQyxDQUFDLE1BQXlCLEVBQUUsRUFBRTtvQkFDN0QsV0FBVyxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLE1BQU0sQ0FBQyxPQUFPLEVBQUUsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDO2dCQUN0RSxDQUFDLEVBQUMsQ0FBQzthQUNIO1FBQ0YsQ0FBQyxFQUFDLENBQUM7O2NBRUcsZUFBZSxHQUFHLGdCQUFnQixJQUFJLGdCQUFnQixFQUFFO1FBQzlELElBQUksZUFBZSxFQUFFO1lBQ3BCLE1BQU0sQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDO2lCQUMxQixHQUFHOzs7O1lBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxRQUFRLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxFQUFDO2lCQUN6QixNQUFNOzs7O1lBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLFVBQVUsRUFBQztpQkFDakMsSUFBSTs7Ozs7WUFBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUM7aUJBQ3JCLE9BQU87Ozs7WUFBQyxDQUFDLENBQUMsRUFBRTtnQkFDWixlQUFlLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxFQUFFLE9BQU8sQ0FBQyxXQUFXLENBQUMsQ0FBQztZQUNuRCxDQUFDLEVBQUMsQ0FBQztTQUNKO1FBRUQsUUFBUSxDQUFDLEtBQUssRUFBRSxDQUFDO0lBQ2xCLENBQUMsQ0FBQSxDQUFDO0lBRUYsT0FBTyxDQUFDLFNBQVM7Ozs7SUFBRyxVQUFTLENBQU07UUFDbEMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLENBQUM7SUFDekIsQ0FBQyxDQUFBLENBQUM7QUFDSCxDQUFDOzs7SUFHQSxVQUFXLFVBQVU7SUFDckIsV0FBWSxXQUFXIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGludGVyZmFjZSBPYmplY3RTdG9yZU1ldGEge1xuXHRzdG9yZTogc3RyaW5nO1xuXHRzdG9yZUNvbmZpZzogeyBrZXlQYXRoOiBzdHJpbmc7IGF1dG9JbmNyZW1lbnQ6IGJvb2xlYW47IFtrZXk6IHN0cmluZ106IGFueSB9O1xuXHRzdG9yZVNjaGVtYTogT2JqZWN0U3RvcmVTY2hlbWFbXTtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBPYmplY3RTdG9yZVNjaGVtYSB7XG5cdG5hbWU6IHN0cmluZztcblx0a2V5cGF0aDogc3RyaW5nIHwgc3RyaW5nW107XG5cdG9wdGlvbnM6IHsgdW5pcXVlOiBib29sZWFuOyBba2V5OiBzdHJpbmddOiBhbnkgfTtcbn1cbmV4cG9ydCB0eXBlIEtleSA9IHN0cmluZyB8IG51bWJlciB8IERhdGUgfCBBcnJheUJ1ZmZlclZpZXcgfCBBcnJheUJ1ZmZlciB8IElEQkFycmF5S2V5IHwgSURCS2V5UmFuZ2U7XG5leHBvcnQgaW50ZXJmYWNlIEluZGV4RGV0YWlscyB7XG5cdGluZGV4TmFtZTogc3RyaW5nO1xuXHRvcmRlcjogc3RyaW5nO1xufVxuZXhwb3J0IGludGVyZmFjZSBSZXF1ZXN0RXZlbnRUYXJnZXQ8VD4gZXh0ZW5kcyBFdmVudFRhcmdldCB7XG5cdHJlc3VsdDogVCB8IFRbXTtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBSZXF1ZXN0RXZlbnQ8VD4gZXh0ZW5kcyBFdmVudCB7XG5cdHRhcmdldDogUmVxdWVzdEV2ZW50VGFyZ2V0PFQ+O1xufVxuXG5jb25zdCBpbmRleGVkREI6IElEQkZhY3RvcnkgPVxuXHR3aW5kb3cuaW5kZXhlZERCIHx8ICg8YW55PndpbmRvdykubW96SW5kZXhlZERCIHx8ICg8YW55PndpbmRvdykud2Via2l0SW5kZXhlZERCIHx8ICg8YW55PndpbmRvdykubXNJbmRleGVkREI7XG5cbmV4cG9ydCBmdW5jdGlvbiBvcGVuRGF0YWJhc2UoZGJOYW1lOiBzdHJpbmcsIHZlcnNpb246IG51bWJlciwgdXBncmFkZUNhbGxiYWNrPzogRnVuY3Rpb24pIHtcblx0cmV0dXJuIG5ldyBQcm9taXNlPElEQkRhdGFiYXNlPigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG5cdFx0Y29uc3QgcmVxdWVzdCA9IGluZGV4ZWREQi5vcGVuKGRiTmFtZSwgdmVyc2lvbik7XG5cdFx0bGV0IGRiOiBJREJEYXRhYmFzZTtcblx0XHRyZXF1ZXN0Lm9uc3VjY2VzcyA9IChldmVudDogRXZlbnQpID0+IHtcblx0XHRcdGRiID0gcmVxdWVzdC5yZXN1bHQ7XG5cdFx0XHRyZXNvbHZlKGRiKTtcblx0XHR9O1xuXHRcdHJlcXVlc3Qub25lcnJvciA9IChldmVudDogRXZlbnQpID0+IHtcblx0XHRcdHJlamVjdChgSW5kZXhlZERCIGVycm9yOiAke3JlcXVlc3QuZXJyb3J9YCk7XG5cdFx0fTtcblx0XHRpZiAodHlwZW9mIHVwZ3JhZGVDYWxsYmFjayA9PT0gJ2Z1bmN0aW9uJykge1xuXHRcdFx0cmVxdWVzdC5vbnVwZ3JhZGVuZWVkZWQgPSAoZXZlbnQ6IEV2ZW50KSA9PiB7XG5cdFx0XHRcdGNvbnNvbGUubG9nKCdjaGVja291dCcpO1xuXHRcdFx0XHR1cGdyYWRlQ2FsbGJhY2soZXZlbnQsIGRiKTtcblx0XHRcdH07XG5cdFx0fVxuXHR9KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIENyZWF0ZU9iamVjdFN0b3JlKFxuXHRkYk5hbWU6IHN0cmluZyxcblx0dmVyc2lvbjogbnVtYmVyLFxuXHRzdG9yZVNjaGVtYXM6IE9iamVjdFN0b3JlTWV0YVtdLFxuXHRtaWdyYXRpb25GYWN0b3J5PzogKCkgPT4geyBba2V5OiBudW1iZXJdOiAoZGI6IElEQkRhdGFiYXNlLCB0cmFuc2FjdGlvbjogSURCVHJhbnNhY3Rpb24pID0+IHZvaWQgfVxuKSB7XG5cdGNvbnN0IHJlcXVlc3Q6IElEQk9wZW5EQlJlcXVlc3QgPSBpbmRleGVkREIub3BlbihkYk5hbWUsIHZlcnNpb24pO1xuXG5cdHJlcXVlc3Qub251cGdyYWRlbmVlZGVkID0gZnVuY3Rpb24oZXZlbnQ6IElEQlZlcnNpb25DaGFuZ2VFdmVudCkge1xuXHRcdGNvbnN0IGRhdGFiYXNlOiBJREJEYXRhYmFzZSA9IChldmVudC50YXJnZXQgYXMgYW55KS5yZXN1bHQ7XG5cblx0XHRzdG9yZVNjaGVtYXMuZm9yRWFjaCgoc3RvcmVTY2hlbWE6IE9iamVjdFN0b3JlTWV0YSkgPT4ge1xuXHRcdFx0aWYgKCFkYXRhYmFzZS5vYmplY3RTdG9yZU5hbWVzLmNvbnRhaW5zKHN0b3JlU2NoZW1hLnN0b3JlKSkge1xuXHRcdFx0XHRjb25zdCBvYmplY3RTdG9yZSA9IGRhdGFiYXNlLmNyZWF0ZU9iamVjdFN0b3JlKHN0b3JlU2NoZW1hLnN0b3JlLCBzdG9yZVNjaGVtYS5zdG9yZUNvbmZpZyk7XG5cdFx0XHRcdHN0b3JlU2NoZW1hLnN0b3JlU2NoZW1hLmZvckVhY2goKHNjaGVtYTogT2JqZWN0U3RvcmVTY2hlbWEpID0+IHtcblx0XHRcdFx0XHRvYmplY3RTdG9yZS5jcmVhdGVJbmRleChzY2hlbWEubmFtZSwgc2NoZW1hLmtleXBhdGgsIHNjaGVtYS5vcHRpb25zKTtcblx0XHRcdFx0fSk7XG5cdFx0XHR9XG5cdFx0fSk7XG5cblx0XHRjb25zdCBzdG9yZU1pZ3JhdGlvbnMgPSBtaWdyYXRpb25GYWN0b3J5ICYmIG1pZ3JhdGlvbkZhY3RvcnkoKTtcblx0XHRpZiAoc3RvcmVNaWdyYXRpb25zKSB7XG5cdFx0XHRPYmplY3Qua2V5cyhzdG9yZU1pZ3JhdGlvbnMpXG5cdFx0XHRcdC5tYXAoayA9PiBwYXJzZUludChrLCAxMCkpXG5cdFx0XHRcdC5maWx0ZXIodiA9PiB2ID4gZXZlbnQub2xkVmVyc2lvbilcblx0XHRcdFx0LnNvcnQoKGEsIGIpID0+IGEgLSBiKVxuXHRcdFx0XHQuZm9yRWFjaCh2ID0+IHtcblx0XHRcdFx0XHRzdG9yZU1pZ3JhdGlvbnNbdl0oZGF0YWJhc2UsIHJlcXVlc3QudHJhbnNhY3Rpb24pO1xuXHRcdFx0XHR9KTtcblx0XHR9XG5cblx0XHRkYXRhYmFzZS5jbG9zZSgpO1xuXHR9O1xuXG5cdHJlcXVlc3Qub25zdWNjZXNzID0gZnVuY3Rpb24oZTogYW55KSB7XG5cdFx0ZS50YXJnZXQucmVzdWx0LmNsb3NlKCk7XG5cdH07XG59XG5cbmV4cG9ydCBlbnVtIERCTW9kZSB7XG5cdHJlYWRvbmx5ID0gJ3JlYWRvbmx5Jyxcblx0cmVhZHdyaXRlID0gJ3JlYWR3cml0ZSdcbn1cbiJdfQ==