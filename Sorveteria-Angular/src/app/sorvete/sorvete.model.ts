import { Fabricante } from "../fabricante/fabricante.model";
import { Sabores } from "../sabores/sabores.model";

export class Sorvete {
    id : number;
    nome : string ;
    sabores : Array<Sabores>;
    quantidadeEstoque : number;
    valor : number;
    valorFabrica : number;
    dtCompra : Date;
    dtValidade : Date;
    fabricante : Fabricante;
}