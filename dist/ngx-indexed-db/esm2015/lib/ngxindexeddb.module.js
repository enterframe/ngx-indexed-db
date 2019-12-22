/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxIndexedDBService } from './ngx-indexed-db.service';
import { CONFIG_TOKEN } from './ngx-indexed-db.meta';
export class NgxIndexedDBModule {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4aW5kZXhlZGRiLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1pbmRleGVkLWRiLyIsInNvdXJjZXMiOlsibGliL25neGluZGV4ZWRkYi5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxRQUFRLEVBQXVDLE1BQU0sZUFBZSxDQUFDO0FBQzlFLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUMvRCxPQUFPLEVBQVksWUFBWSxFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFNL0QsTUFBTSxPQUFPLGtCQUFrQjs7Ozs7SUFDOUIsTUFBTSxDQUFDLE9BQU8sQ0FBQyxRQUFrQjtRQUNoQyxPQUFPO1lBQ04sUUFBUSxFQUFFLGtCQUFrQjtZQUM1QixTQUFTLEVBQUUsQ0FBQyxtQkFBbUIsRUFBRSxFQUFFLE9BQU8sRUFBRSxZQUFZLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxDQUFDO1NBQy9FLENBQUM7SUFDSCxDQUFDOzs7WUFWRCxRQUFRLFNBQUM7Z0JBQ1QsWUFBWSxFQUFFLEVBQUU7Z0JBQ2hCLE9BQU8sRUFBRSxDQUFDLFlBQVksQ0FBQzthQUN2QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlLCBNb2R1bGVXaXRoUHJvdmlkZXJzLCBJbmplY3Rpb25Ub2tlbiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IE5neEluZGV4ZWREQlNlcnZpY2UgfSBmcm9tICcuL25neC1pbmRleGVkLWRiLnNlcnZpY2UnO1xuaW1wb3J0IHsgREJDb25maWcsIENPTkZJR19UT0tFTiB9IGZyb20gJy4vbmd4LWluZGV4ZWQtZGIubWV0YSc7XG5cbkBOZ01vZHVsZSh7XG5cdGRlY2xhcmF0aW9uczogW10sXG5cdGltcG9ydHM6IFtDb21tb25Nb2R1bGVdXG59KVxuZXhwb3J0IGNsYXNzIE5neEluZGV4ZWREQk1vZHVsZSB7XG5cdHN0YXRpYyBmb3JSb290KGRiQ29uZmlnOiBEQkNvbmZpZyk6IE1vZHVsZVdpdGhQcm92aWRlcnM8Tmd4SW5kZXhlZERCTW9kdWxlPiB7XG5cdFx0cmV0dXJuIHtcblx0XHRcdG5nTW9kdWxlOiBOZ3hJbmRleGVkREJNb2R1bGUsXG5cdFx0XHRwcm92aWRlcnM6IFtOZ3hJbmRleGVkREJTZXJ2aWNlLCB7IHByb3ZpZGU6IENPTkZJR19UT0tFTiwgdXNlVmFsdWU6IGRiQ29uZmlnIH1dXG5cdFx0fTtcblx0fVxufVxuIl19