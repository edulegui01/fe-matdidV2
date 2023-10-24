import { Funcionario } from "./funcionario";

export interface FuncionarioData {
    content: Funcionario[],
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