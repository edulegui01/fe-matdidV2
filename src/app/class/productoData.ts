import { Producto } from "./producto";


export interface ProductoData {
    content: Producto[],
    pageable:{
        sort:{
            empty:boolean;
            sorted:boolean;
            unsorted:boolean;
        },
        offset:number;
        pageNumber:number;
        pageSize:number;
        paged:boolean,
        unpaged:boolean
    },
    totalElements:number,
    totalPages:number,
    last:boolean,
    size:number,
    number:number,
    sort:{
        empty:boolean;
        sorted:boolean;
        unsorted:boolean;
    },
    numberOfElements:number,
    first:boolean,
    empty:boolean

}