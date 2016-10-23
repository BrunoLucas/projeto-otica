export class Produto {
    
    codigo? : number;
    nome : string; // required with minimum 5 chracters
	marca : string;
    precoVenda : number;
	precoCompra: number;
	quantidadeEstoque: number;

    itensProduto?: {
    };	
	
    constructor (){

    }

}
