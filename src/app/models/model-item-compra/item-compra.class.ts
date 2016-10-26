import {Compra} from '../model-compra/compra.class';
import {Produto} from '../model-produto/produto.class';
export class ItemCompra {
    
    codigo?: number;
    produto: Produto; 
    compra: Compra;
    quantidade : number;
    valorUnitario : number;
    subTotal: number;

    constructor (){

    }

}
