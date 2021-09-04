import { Fabricante } from "../fabricante/fabricante.model";

export class Sorvete {
    id : number;
    nome : string ;
    sabor : string;
    valor : number;
    valorFabrica : number;
    dtCompra : Date;
    dtValidade : Date;
    fabricante : Fabricante;
}