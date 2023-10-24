// import { CollectionViewer } from '@angular/cdk/collections';
// import { DataSource } from '@angular/cdk/table';
// import { BehaviorSubject, Observable } from 'rxjs';
// import { ServiceBase } from './serviceAbstract';

// export class CustomTableDataSource implements DataSource<any> {

//     private entityLoader = new BehaviorSubject<any[]>([]);
//     private entityPaginatorCount = new BehaviorSubject<number>(0);
//     public entityPaginatorCountValue = this.entityPaginatorCount.asObservable();

//     constructor(private service: ServiceBase) { }

//     connect(collectionViewer: CollectionViewer): Observable<any[] | readonly any[]> {
//         return this.entityLoader.asObservable();
//     }

//     disconnect(collectionViewer: CollectionViewer): void {
//         this.entityLoader.complete();
//         this.entityPaginatorCount.complete();
//     }

//     getPageCount(): Observable<number> {
//         return this.entityPaginatorCount.asObservable();
//     }

//     loadData(permiso: string = '',
//              pageIndex: number = 0,
//              pageSize: number = 10,
//              sortByName: string = '',
//              sortDir: string = '',
//              customFilters: string = '',
//     ) {

//         const params = this.formatParams(permiso,
//             pageIndex,
//             pageSize,
//             sortByName,
//             sortDir,
//             customFilters);

//         this.service.list(params).subscribe(result => {
//             this.entityLoader.next(result.rows);
//             this.entityPaginatorCount.next(result.count);
//         });
//     }

//     loadDataWithQueryParams(permiso: string = '',
//                             pageIndex: number = 0,
//                             pageSize: number = 10,
//                             sortByName: string = '',
//                             sortDir: string = '',
//                             customFilters: string = '',
//     ) {
//         const params = this.formatParams(permiso,
//             pageIndex,
//             pageSize,
//             sortByName,
//             sortDir,
//             customFilters);

//         this.service.listWithQueryParams(params).subscribe(result => {
//             this.entityLoader.next(result.rows);
//             this.entityPaginatorCount.next(result.count);
//         });
//     }
//     private formatParams(permiso:string,
//                          pageIndex:number,
//                          pageSize:number,
//                          sortByName:string,
//                          sortDir:string,
//                          customFilters:string) {

//         const params:any = {};

//         params['page'] = (pageIndex + 1);
//         params['count'] = pageSize;
//         params['sortBy'] = sortByName;
//         params['sortOrder'] = sortDir;
//         params['filters'] = customFilters;
//         params['permissionURL'] = permiso;

//         return params;

//     }
// }
