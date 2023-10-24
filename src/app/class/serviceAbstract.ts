// import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { Observable } from 'rxjs';
// import { Settings } from './settings';
// import { GlobalService } from '../global-service/global.service';

// export abstract class ServiceBase {

//     path = Settings.URL_BASE;
//     httpClient!: HttpClient;
//     editForm = false;
//     globalServices!: GlobalService;
//     filterField = [
//         'filters',
//         'permissionURL',
//         'page',
//         'count',
//         'sortBy',
//         'sortOrder'
//     ];

//     constructor() {
//     }

//     create(data: any): Observable<any> {
//         const entityValues = this.getEntityValues(data);
//         return this.httpClient.post(this.path + '/' + data.permissionURL, entityValues, this.createHeaderOptions());
//     }

//     update(data: any): Observable<any> {
//         const entityValues = this.getEntityValues(data);
//         return this.httpClient.put(this.path + '/' + data.permissionURL, entityValues, this.createHeaderOptions());
//     }

//     delete(data: any): Observable<any> {
//         let url = this.path + '/' + data.permissionURL;
//         if (data.hasOwnProperty('id')) {
//             url += '?id="' + data.id + '"';
//         }
//         return this.httpClient.delete(url, this.createHeaderOptions());
//     }

//     get(data: any): Observable<any> {
//         const urls = this.path + '/' + data.permissionURL + '?filters=' + encodeURIComponent('{"id":"' + data.id + '"}');
//         return this.httpClient.get(urls, this.createHeaderOptions());
//     }

//     getById(data: any): Observable<any> {
//         const urls = this.path + '/' + data.permissionURL + '?id=' + data.id;
//         return this.httpClient.get(urls, this.createHeaderOptions());
//     }

//     getPdf(data: any): Observable<any> {
//         let urlBase = this.path + '/' + data.permissionURL + '?';
//         if (data.hasOwnProperty('id')) {
//             urlBase += 'id="' + data.id + '"&';
//         }
//         const queryFilter = this.createFilterValues(data, this.createPagination(data));
//         const urls = urlBase + queryFilter;
        
//         return this.httpClient.get(urls, { responseType: 'arraybuffer' });
//     }

//     list(data: any): Observable<any> {

//         const urlBase = this.path + '/' + data.permissionURL + '?';
//         const queryFilter = this.createFilterValues(data, this.createPagination(data));
//         const urls = urlBase + queryFilter;

//         return this.httpClient.get(urls, this.createHeaderOptions());
//     }

//     listWithQueryParams(data: any): Observable<any> {
//         const urlBase = this.path + '/' + data.permissionURL + '?';
//         const queryFilter = this.createQueryFilterValues(data);
//         const urls = urlBase + queryFilter;
        
//         //console.log(urls);
//         return this.httpClient.get(urls, this.createHeaderOptions());
//     }

//     protected createHeaderOptions(headers: any = null): { headers: HttpHeaders } {
//         let headersHTTP = new HttpHeaders();
//         if ( headers != null) {
//             for (const attr in Object.keys(headers)) {
//                 if (headers[attr] != null && String(headers[attr]) != '') {
//                     headersHTTP = headersHTTP.set(attr, headers[attr]);
//                 }
//             }
//         } else {
//             headersHTTP = headersHTTP.set('Content-Type', 'application/json');
//         }

//         const options = { headers: headersHTTP };
//         return options;
//     }

//     protected getEntityValues(data: any) {
//         const entity = {};
//         for (const attr in data) {
//             if (!this.filterField.includes(attr) && data[attr] != null && String(data[attr]) != '') {

//                 if (Array.isArray(data[attr])) {
//                     entity[attr] = data[attr];
//                 } else {
//                     entity[attr] = String(data[attr]);
//                 }
//             }
//         }
        
//         return entity;
//     }

//     private createPagination(data:any) {

//         let queryField = '';
//         const filtersField = [
//             'page'
//             , 'count'
//             , 'sortBy'
//             , 'sortOrder'
//         ];

//         filtersField.forEach(element => {
//             if (data.hasOwnProperty(element)) {
//                 if (String(data[element]).trim() != '' && String(data[element]).trim().length > 0) {
//                     queryField += element + '=' + data[element] + '&';
//                 }
//             }
//         });

//         return queryField;
//     }

//     private createFilterValues(data:any, queryField:any) {
//         let filterValues = '';
//         const filterName = 'filters';
//         if (String(data[filterName]).trim() != '' && String(data[filterName]).trim().length > 0) {

//             for (const key in data[filterName]) {

//                 if (String(data[filterName][key]) != '' && String(data[filterName][key]).trim().length > 0) {

//                     filterValues += '\"' + String(key) + '\"' + ':' + '\"' + String(data[filterName][key]) + '\"' + ',';
//                 }
//             }

//             if (String(filterValues).trim().length > 0 && filterValues != '') {
//                 filterValues = filterValues.substring(0, filterValues.lastIndexOf(','));
//                 filterValues = '{' + filterValues + '}';
//                 filterValues = encodeURIComponent(filterValues);
//                 filterValues = filterName + '=' + filterValues;
//                 queryField += filterValues;
//             }
//         }
//         return queryField;
//     }

//     private createQueryFilterValues(data:any) {
//         let filterValues = '';
//         const filterName = 'filters';

//         if (String(data[filterName]).trim() != '' && String(data[filterName]).trim().length > 0) {

//             for (const key in data[filterName]) {

//                 if (String(data[filterName][key]) != '' && String(data[filterName][key]).trim().length > 0) {

//                     filterValues += String(key) + '=' + String(data[filterName][key]) + '&';
//                 }
//             }

//             if (String(filterValues).trim().length > 0 && filterValues != '') {
//                 filterValues = filterValues.substring(0, filterValues.lastIndexOf('&'));
//                 filterValues = encodeURI(filterValues);
//             }
//         }

//         return filterValues;
//     }

//     getFileById(data: any): Observable<any> {
//         let urlBase = this.path + '/' + data.permissionURL + '?';
//         if (data.hasOwnProperty('id')) {
//             urlBase += 'id=' + data.id + '&';
//         }
//         const queryFilter = this.createFilterValues(data, this.createPagination(data));
//         const urls = urlBase + queryFilter;

//         return this.httpClient.get<Blob>(urls, {observe: 'response', responseType: 'blob' as 'json' });
//     }

//     sendDataPart(data: any, methods = 'post') {
//         const partData = new FormData();
//         const httpHeaders = this.createHeaderOptions({
//             'Content-Type': 'multipart/form-data'
//         });
//         for (let attr in data) {
//             if (!this.filterField.includes(attr) && data[attr] != null && String(data[attr]) != '') {
//                if (attr == 'archivo') {
//                    const file = data[attr] as File;
//                    partData.append(attr, file, file.name);
//                } else {
//                 partData.append(attr, data[attr]);
//                }
//             }
//         }

//         return this.httpClient[methods](this.path + '/' + data.permissionURL, partData, httpHeaders);

//     }

//     salida(data: any): Observable<any> {
//         const entityValues = this.getEntityValues(data);
//         return this.httpClient.put<any>(this.path + '/' + data.permissionURL, entityValues, this.createHeaderOptions());
//     }

// }
