// import { CustomTableDataSource } from './customTableDataSource';
// import { Observable, merge } from 'rxjs';
// import { FormGroup, FormBuilder } from '@angular/forms';
// import { GlobalMessage } from './global-message';
// import { MENU_URLS } from '../components/navbar/routes';
// import { ServiceBase } from './serviceAbstract';
// import { Router, NavigationExtras } from '@angular/router';

// import { GlobalService } from '../global-service/global.service';
// import { tap, first } from 'rxjs/operators';
// //import { CustomDialogComponent } from '../components/custom-dialog/components/custom-dialog.component';
// import { Settings } from './settings';
// import { Injectable, OnDestroy } from '@angular/core';
// import { MatTable } from '@angular/material/table';
// import { MatSort } from '@angular/material/sort';
// import { MatPaginator } from '@angular/material/paginator';
// import { MatSnackBar } from '@angular/material/snack-bar';


// @Injectable()
// export abstract class CustomAbstractListComponent implements OnDestroy {

//     filters;
//     dataSource: CustomTableDataSource;
//     resultsLength: Observable<number>;
//     filterForm: FormGroup;

//     matTableRef: MatTable<any>;
//     sortRef: MatSort;
//     paginatorRef: MatPaginator;
//     showFilter = true;
//     smallRowSize = false;

//     viewText = GlobalMessage.VIEW_LABELS;
//     accountStatus = GlobalMessage.ACCOUNT_STATUS;
//     paginatorRange = GlobalMessage.PAGINATOR_RANGE;

//     deleteDefaultMessage = 'EL REGISTRO';
//     frmBuilder: FormBuilder;
//     entityService: ServiceBase;
//     routerInstance: Router;
//     dialogInstance: MatDialog;
//     snackbarInstance: MatSnackBar;
//     globalSrvInstance: GlobalService;
//     defaultUrlList;
//     defaultPageIndex = 0;
//     defaultPageSize = 10;
//     defaultColumSort = '';
//     defaultSortDirection = '';
//     listObservables = [];

//     menuOptions = {
//         menuUrl: '',
//         listar: '',
//         editar: '',
//         nuevo: '',
//         eliminar: '',
//         menuDict: ''
//     };

//     constructor(menuUrl: any) {
//         this.buildMenuPathOptions(menuUrl);
//     }

//     initFilter(filterBody: any) {
//         this.filterForm = this.frmBuilder.group(filterBody);
//     }

//     ngOnDestroy(): void {
//         this.listObservables.forEach(elm => {
//             elm.unsubscribe();
//         });
//     }

//     ngOnInit() {
//         this.dataSource = new CustomTableDataSource(this.entityService);
//         this.dataSource.loadData(
//             this.defaultUrlList ? this.defaultUrlList : this.globalSrvInstance.changeDashToBackSlash(this.menuOptions.menuUrl),
//             this.defaultPageIndex,
//             this.defaultPageSize,
//             this.defaultColumSort,
//             this.defaultSortDirection
//         );
//         this.resultsLength = this.dataSource.getPageCount();
//     }

//     doAfterViewInit(): void {
//         if (this.sortRef && this.paginatorRef) {
//             this.listObservables.push(this.sortRef.sortChange.subscribe(() => this.paginatorRef.pageIndex = 0));
//             this.listObservables.push(merge(this.sortRef.sortChange, this.paginatorRef.page)
//                 .pipe(
//                     tap(
//                         () => this.loadEntityDataSource()
//                     )
//                 ).subscribe());
//         }

//     }

//     loadEntityDataSource() {
//         this.dataSource.loadData(
//             this.defaultUrlList ? this.defaultUrlList : this.globalSrvInstance.changeDashToBackSlash(this.menuOptions.menuUrl),
//             this.paginatorRef.pageIndex,
//             this.paginatorRef.pageSize,
//             this.sortRef.active,
//             this.sortRef.direction,
//             this.filters);
//     }

//     /**
//      * Permite establecer los filtros para su posterior proceso en el servicio
//      *
//      * @param {any} element - Objeto contenedor de los parametros de filtros
//      *
//      * @example
//      *
//      *     prepareFilter({})
//      */
//     prepareFilter(filterBody: any) {
//         this.filters = filterBody;
//         this.loadEntityDataSource();
//     }

//     /**
//      * Permite modificar un elemento seleccionado
//      *
//      * @param {any} element - Objeto a modificar
//      *
//      * @example
//      *
//      *     edit(Persona)
//      */
//     edit(element: any) {
//         const extraParams: NavigationExtras = {
//             state: element,
//         };

//         this.entityService.editForm = true;
//         this.routerInstance.navigate(['../' + this.menuOptions.menuUrl + '/' + this.menuOptions.menuDict['EDITAR']['URL']], extraParams);
//     }

//     /**
//      * Permite establecer el elemento a dar de baja para su posterior proceso en el servicio
//      *
//      * @param {any} element - Objeto a dar de baja
//      * @param {string} url  - url de la peticion http
//      * @example
//      *
//      *     prepareDelete(Persona)
//      */
//     prepareDelete(element: any, url = null) {
//         url = url ? url : this.globalSrvInstance.changeDashToBackSlash(this.menuOptions.menuUrl);
//         this.dialogInstance.open(CustomDialogComponent, {
//             width: Settings.DIALOG_MEDIUM,
//             data: {
//                 typeDialog: 'confirm',
//                 title: this.viewText.ATTENTION,
//                 message: `${this.viewText.CONFIRM_REMOVE} <b>${this.deleteDefaultMessage}</b>?
//                ¿DESEA ELIMINAR DE MANERA PERMANENTE?`,
//             },

//         }).afterClosed().subscribe(accept => {//DESPUES DE CERRAR LA VENTANA DE CONFIMACIÓN.

//             if (accept) {
//                 const data = {
//                     id: element.id,
//                     permissionURL: url
//                 };

//                 this.entityService.delete(data).pipe(first()).subscribe(resp => {
//                     this.paginatorRef.pageIndex = 0;
//                     this.loadEntityDataSource();
//                 });
//             }
//         });
//     }

//     buildMenuPathOptions(menuUrl: string) {
//         this.menuOptions = {
//             menuUrl: menuUrl['URL_BASE'],
//             listar: menuUrl['LISTAR']['PERMISO'],
//             editar: menuUrl['EDITAR']['PERMISO'],
//             nuevo: menuUrl['NUEVO']['PERMISO'],
//             eliminar: menuUrl['ELIMINAR']['PERMISO'],
//             menuDict: menuUrl
//         };
//     }

//     abstract doFilter();
//     abstract delete(element: any);
// }
