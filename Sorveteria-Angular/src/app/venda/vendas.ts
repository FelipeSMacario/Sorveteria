import { Sabores } from "../sabores/sabores.model";
import { Sorvete } from "../sorvete/sorvete.model";

export class Vendas {
    id : number;
    sorvete : Sorvete;
    sabores : Sabores;
    qtdItemVenda : number;
    qtdValorVenda : number;
}