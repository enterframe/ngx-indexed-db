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
var indexedDB = window.indexedDB || ((/** @type {?} */ (window))).mozIndexedDB || ((/** @type {?} */ (window))).webkitIndexedDB || ((/** @type {?} */ (window))).msIndexedDB;
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
export function CreateObjectStore(dbName, version, storeSchemas, migrationFactory) {
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
export { DBMode };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LWluZGV4ZWQtZGIuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtaW5kZXhlZC1kYi8iLCJzb3VyY2VzIjpbImxpYi9uZ3gtaW5kZXhlZC1kYi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUEscUNBSUM7OztJQUhBLGdDQUFjOztJQUNkLHNDQUE2RTs7SUFDN0Usc0NBQWlDOzs7OztBQUdsQyx1Q0FJQzs7O0lBSEEsaUNBQWE7O0lBQ2Isb0NBQTJCOztJQUMzQixvQ0FBaUQ7Ozs7O0FBR2xELGtDQUdDOzs7SUFGQSxpQ0FBa0I7O0lBQ2xCLDZCQUFjOzs7Ozs7QUFFZix3Q0FFQzs7O0lBREEsb0NBQWdCOzs7Ozs7QUFHakIsa0NBRUM7OztJQURBLDhCQUE4Qjs7O0lBR3pCLFNBQVMsR0FDZCxNQUFNLENBQUMsU0FBUyxJQUFJLENBQUMsbUJBQUssTUFBTSxFQUFBLENBQUMsQ0FBQyxZQUFZLElBQUksQ0FBQyxtQkFBSyxNQUFNLEVBQUEsQ0FBQyxDQUFDLGVBQWUsSUFBSSxDQUFDLG1CQUFLLE1BQU0sRUFBQSxDQUFDLENBQUMsV0FBVzs7Ozs7OztBQUU3RyxNQUFNLFVBQVUsWUFBWSxDQUFDLE1BQWMsRUFBRSxPQUFlLEVBQUUsZUFBMEI7SUFDdkYsT0FBTyxJQUFJLE9BQU87Ozs7O0lBQWMsVUFBQyxPQUFPLEVBQUUsTUFBTTs7WUFDekMsT0FBTyxHQUFHLFNBQVMsQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLE9BQU8sQ0FBQzs7WUFDM0MsRUFBZTtRQUNuQixPQUFPLENBQUMsU0FBUzs7OztRQUFHLFVBQUMsS0FBWTtZQUNoQyxFQUFFLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQztZQUNwQixPQUFPLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDYixDQUFDLENBQUEsQ0FBQztRQUNGLE9BQU8sQ0FBQyxPQUFPOzs7O1FBQUcsVUFBQyxLQUFZO1lBQzlCLE1BQU0sQ0FBQyxzQkFBb0IsT0FBTyxDQUFDLEtBQU8sQ0FBQyxDQUFDO1FBQzdDLENBQUMsQ0FBQSxDQUFDO1FBQ0YsSUFBSSxPQUFPLGVBQWUsS0FBSyxVQUFVLEVBQUU7WUFDMUMsT0FBTyxDQUFDLGVBQWU7Ozs7WUFBRyxVQUFDLEtBQVk7Z0JBQ3RDLE9BQU8sQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLENBQUM7Z0JBQ3hCLGVBQWUsQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLENBQUM7WUFDNUIsQ0FBQyxDQUFBLENBQUM7U0FDRjtJQUNGLENBQUMsRUFBQyxDQUFDO0FBQ0osQ0FBQzs7Ozs7Ozs7QUFFRCxNQUFNLFVBQVUsaUJBQWlCLENBQ2hDLE1BQWMsRUFDZCxPQUFlLEVBQ2YsWUFBK0IsRUFDL0IsZ0JBQWtHOztRQUU1RixPQUFPLEdBQXFCLFNBQVMsQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLE9BQU8sQ0FBQztJQUVqRSxPQUFPLENBQUMsZUFBZTs7OztJQUFHLFVBQVMsS0FBNEI7O1lBQ3hELFFBQVEsR0FBZ0IsQ0FBQyxtQkFBQSxLQUFLLENBQUMsTUFBTSxFQUFPLENBQUMsQ0FBQyxNQUFNO1FBRTFELFlBQVksQ0FBQyxPQUFPOzs7O1FBQUMsVUFBQyxXQUE0QjtZQUNqRCxJQUFJLENBQUMsUUFBUSxDQUFDLGdCQUFnQixDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLEVBQUU7O29CQUNyRCxhQUFXLEdBQUcsUUFBUSxDQUFDLGlCQUFpQixDQUFDLFdBQVcsQ0FBQyxLQUFLLEVBQUUsV0FBVyxDQUFDLFdBQVcsQ0FBQztnQkFDMUYsV0FBVyxDQUFDLFdBQVcsQ0FBQyxPQUFPOzs7O2dCQUFDLFVBQUMsTUFBeUI7b0JBQ3pELGFBQVcsQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxNQUFNLENBQUMsT0FBTyxFQUFFLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQztnQkFDdEUsQ0FBQyxFQUFDLENBQUM7YUFDSDtRQUNGLENBQUMsRUFBQyxDQUFDOztZQUVHLGVBQWUsR0FBRyxnQkFBZ0IsSUFBSSxnQkFBZ0IsRUFBRTtRQUM5RCxJQUFJLGVBQWUsRUFBRTtZQUNwQixNQUFNLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQztpQkFDMUIsR0FBRzs7OztZQUFDLFVBQUEsQ0FBQyxJQUFJLE9BQUEsUUFBUSxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsRUFBZixDQUFlLEVBQUM7aUJBQ3pCLE1BQU07Ozs7WUFBQyxVQUFBLENBQUMsSUFBSSxPQUFBLENBQUMsR0FBRyxLQUFLLENBQUMsVUFBVSxFQUFwQixDQUFvQixFQUFDO2lCQUNqQyxJQUFJOzs7OztZQUFDLFVBQUMsQ0FBQyxFQUFFLENBQUMsSUFBSyxPQUFBLENBQUMsR0FBRyxDQUFDLEVBQUwsQ0FBSyxFQUFDO2lCQUNyQixPQUFPOzs7O1lBQUMsVUFBQSxDQUFDO2dCQUNULGVBQWUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLEVBQUUsT0FBTyxDQUFDLFdBQVcsQ0FBQyxDQUFDO1lBQ25ELENBQUMsRUFBQyxDQUFDO1NBQ0o7UUFFRCxRQUFRLENBQUMsS0FBSyxFQUFFLENBQUM7SUFDbEIsQ0FBQyxDQUFBLENBQUM7SUFFRixPQUFPLENBQUMsU0FBUzs7OztJQUFHLFVBQVMsQ0FBTTtRQUNsQyxDQUFDLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsQ0FBQztJQUN6QixDQUFDLENBQUEsQ0FBQztBQUNILENBQUM7OztJQUdBLFVBQVcsVUFBVTtJQUNyQixXQUFZLFdBQVciLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgaW50ZXJmYWNlIE9iamVjdFN0b3JlTWV0YSB7XG5cdHN0b3JlOiBzdHJpbmc7XG5cdHN0b3JlQ29uZmlnOiB7IGtleVBhdGg6IHN0cmluZzsgYXV0b0luY3JlbWVudDogYm9vbGVhbjsgW2tleTogc3RyaW5nXTogYW55IH07XG5cdHN0b3JlU2NoZW1hOiBPYmplY3RTdG9yZVNjaGVtYVtdO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIE9iamVjdFN0b3JlU2NoZW1hIHtcblx0bmFtZTogc3RyaW5nO1xuXHRrZXlwYXRoOiBzdHJpbmcgfCBzdHJpbmdbXTtcblx0b3B0aW9uczogeyB1bmlxdWU6IGJvb2xlYW47IFtrZXk6IHN0cmluZ106IGFueSB9O1xufVxuZXhwb3J0IHR5cGUgS2V5ID0gc3RyaW5nIHwgbnVtYmVyIHwgRGF0ZSB8IEFycmF5QnVmZmVyVmlldyB8IEFycmF5QnVmZmVyIHwgSURCQXJyYXlLZXkgfCBJREJLZXlSYW5nZTtcbmV4cG9ydCBpbnRlcmZhY2UgSW5kZXhEZXRhaWxzIHtcblx0aW5kZXhOYW1lOiBzdHJpbmc7XG5cdG9yZGVyOiBzdHJpbmc7XG59XG5leHBvcnQgaW50ZXJmYWNlIFJlcXVlc3RFdmVudFRhcmdldDxUPiBleHRlbmRzIEV2ZW50VGFyZ2V0IHtcblx0cmVzdWx0OiBUIHwgVFtdO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFJlcXVlc3RFdmVudDxUPiBleHRlbmRzIEV2ZW50IHtcblx0dGFyZ2V0OiBSZXF1ZXN0RXZlbnRUYXJnZXQ8VD47XG59XG5cbmNvbnN0IGluZGV4ZWREQjogSURCRmFjdG9yeSA9XG5cdHdpbmRvdy5pbmRleGVkREIgfHwgKDxhbnk+d2luZG93KS5tb3pJbmRleGVkREIgfHwgKDxhbnk+d2luZG93KS53ZWJraXRJbmRleGVkREIgfHwgKDxhbnk+d2luZG93KS5tc0luZGV4ZWREQjtcblxuZXhwb3J0IGZ1bmN0aW9uIG9wZW5EYXRhYmFzZShkYk5hbWU6IHN0cmluZywgdmVyc2lvbjogbnVtYmVyLCB1cGdyYWRlQ2FsbGJhY2s/OiBGdW5jdGlvbikge1xuXHRyZXR1cm4gbmV3IFByb21pc2U8SURCRGF0YWJhc2U+KChyZXNvbHZlLCByZWplY3QpID0+IHtcblx0XHRjb25zdCByZXF1ZXN0ID0gaW5kZXhlZERCLm9wZW4oZGJOYW1lLCB2ZXJzaW9uKTtcblx0XHRsZXQgZGI6IElEQkRhdGFiYXNlO1xuXHRcdHJlcXVlc3Qub25zdWNjZXNzID0gKGV2ZW50OiBFdmVudCkgPT4ge1xuXHRcdFx0ZGIgPSByZXF1ZXN0LnJlc3VsdDtcblx0XHRcdHJlc29sdmUoZGIpO1xuXHRcdH07XG5cdFx0cmVxdWVzdC5vbmVycm9yID0gKGV2ZW50OiBFdmVudCkgPT4ge1xuXHRcdFx0cmVqZWN0KGBJbmRleGVkREIgZXJyb3I6ICR7cmVxdWVzdC5lcnJvcn1gKTtcblx0XHR9O1xuXHRcdGlmICh0eXBlb2YgdXBncmFkZUNhbGxiYWNrID09PSAnZnVuY3Rpb24nKSB7XG5cdFx0XHRyZXF1ZXN0Lm9udXBncmFkZW5lZWRlZCA9IChldmVudDogRXZlbnQpID0+IHtcblx0XHRcdFx0Y29uc29sZS5sb2coJ2NoZWNrb3V0Jyk7XG5cdFx0XHRcdHVwZ3JhZGVDYWxsYmFjayhldmVudCwgZGIpO1xuXHRcdFx0fTtcblx0XHR9XG5cdH0pO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gQ3JlYXRlT2JqZWN0U3RvcmUoXG5cdGRiTmFtZTogc3RyaW5nLFxuXHR2ZXJzaW9uOiBudW1iZXIsXG5cdHN0b3JlU2NoZW1hczogT2JqZWN0U3RvcmVNZXRhW10sXG5cdG1pZ3JhdGlvbkZhY3Rvcnk/OiAoKSA9PiB7IFtrZXk6IG51bWJlcl06IChkYjogSURCRGF0YWJhc2UsIHRyYW5zYWN0aW9uOiBJREJUcmFuc2FjdGlvbikgPT4gdm9pZCB9XG4pIHtcblx0Y29uc3QgcmVxdWVzdDogSURCT3BlbkRCUmVxdWVzdCA9IGluZGV4ZWREQi5vcGVuKGRiTmFtZSwgdmVyc2lvbik7XG5cblx0cmVxdWVzdC5vbnVwZ3JhZGVuZWVkZWQgPSBmdW5jdGlvbihldmVudDogSURCVmVyc2lvbkNoYW5nZUV2ZW50KSB7XG5cdFx0Y29uc3QgZGF0YWJhc2U6IElEQkRhdGFiYXNlID0gKGV2ZW50LnRhcmdldCBhcyBhbnkpLnJlc3VsdDtcblxuXHRcdHN0b3JlU2NoZW1hcy5mb3JFYWNoKChzdG9yZVNjaGVtYTogT2JqZWN0U3RvcmVNZXRhKSA9PiB7XG5cdFx0XHRpZiAoIWRhdGFiYXNlLm9iamVjdFN0b3JlTmFtZXMuY29udGFpbnMoc3RvcmVTY2hlbWEuc3RvcmUpKSB7XG5cdFx0XHRcdGNvbnN0IG9iamVjdFN0b3JlID0gZGF0YWJhc2UuY3JlYXRlT2JqZWN0U3RvcmUoc3RvcmVTY2hlbWEuc3RvcmUsIHN0b3JlU2NoZW1hLnN0b3JlQ29uZmlnKTtcblx0XHRcdFx0c3RvcmVTY2hlbWEuc3RvcmVTY2hlbWEuZm9yRWFjaCgoc2NoZW1hOiBPYmplY3RTdG9yZVNjaGVtYSkgPT4ge1xuXHRcdFx0XHRcdG9iamVjdFN0b3JlLmNyZWF0ZUluZGV4KHNjaGVtYS5uYW1lLCBzY2hlbWEua2V5cGF0aCwgc2NoZW1hLm9wdGlvbnMpO1xuXHRcdFx0XHR9KTtcblx0XHRcdH1cblx0XHR9KTtcblxuXHRcdGNvbnN0IHN0b3JlTWlncmF0aW9ucyA9IG1pZ3JhdGlvbkZhY3RvcnkgJiYgbWlncmF0aW9uRmFjdG9yeSgpO1xuXHRcdGlmIChzdG9yZU1pZ3JhdGlvbnMpIHtcblx0XHRcdE9iamVjdC5rZXlzKHN0b3JlTWlncmF0aW9ucylcblx0XHRcdFx0Lm1hcChrID0+IHBhcnNlSW50KGssIDEwKSlcblx0XHRcdFx0LmZpbHRlcih2ID0+IHYgPiBldmVudC5vbGRWZXJzaW9uKVxuXHRcdFx0XHQuc29ydCgoYSwgYikgPT4gYSAtIGIpXG5cdFx0XHRcdC5mb3JFYWNoKHYgPT4ge1xuXHRcdFx0XHRcdHN0b3JlTWlncmF0aW9uc1t2XShkYXRhYmFzZSwgcmVxdWVzdC50cmFuc2FjdGlvbik7XG5cdFx0XHRcdH0pO1xuXHRcdH1cblxuXHRcdGRhdGFiYXNlLmNsb3NlKCk7XG5cdH07XG5cblx0cmVxdWVzdC5vbnN1Y2Nlc3MgPSBmdW5jdGlvbihlOiBhbnkpIHtcblx0XHRlLnRhcmdldC5yZXN1bHQuY2xvc2UoKTtcblx0fTtcbn1cblxuZXhwb3J0IGVudW0gREJNb2RlIHtcblx0cmVhZG9ubHkgPSAncmVhZG9ubHknLFxuXHRyZWFkd3JpdGUgPSAncmVhZHdyaXRlJ1xufVxuIl19