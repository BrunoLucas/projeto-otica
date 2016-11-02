export class Cliente {
    
    codigo?: number;
    nome: string; 
    cpf: number;
    dataNascimento : any;
    telefone : number;
    sexo : string;
    observacao : string;
    endereco?: {
        codigo?: number;
        logradouro?: string; 
        numero?: number;
        complemento?: string;
        cep?: string;
        cidade?: string;
        uf?: string;

    };

    constructor (){

    }

}
