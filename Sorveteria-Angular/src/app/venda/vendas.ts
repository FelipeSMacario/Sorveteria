import { Sabores } from "../sabores/sabores.model";
import { Sorvete } from "../sorvete/sorvete.model";

export interface Page {
    content: Array<Vendas>;
    totalPages: number;
    totalElements: number;
    last: boolean;
    size: number;
    number: number;
    sort?: any;
    numberOfElements: number;
    first: boolean;
}

export interface Vendas {
    id : number;
    sorvete : Sorvete;
    sabores : Sabores;
    qtdItemVenda : number;
    qtdValorVenda : number;
}