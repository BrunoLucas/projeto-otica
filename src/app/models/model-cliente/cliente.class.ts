export class Cliente {
    
    codigo?: number;
    nome: string; // required with minimum 5 chracters
    cpf: number;
    dataNascimento : any;
    observacao : string;
    endereco?: {
        codigo?: number;
        logradouro?: string; // required
        numero?: number;
        complemento?: string;
        cep?: string;
        cidade?: string;
        uf?: string;

    };

    constructor (){

    }

}
