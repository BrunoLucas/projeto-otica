
import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/map'
import { Observable } from 'rxjs/Observable';
import { Cliente } from '../../models/model-cliente/cliente.class';
import { Configuration } from '../../app.constants';
import 'rxjs/add/operator/catch';


@Injectable()
export class ClienteService {

    private actionUrl: string;
    private headers: Headers;

        constructor(private _http: Http) {
        console.log('Construtor de ClienteService');
        this.actionUrl = "http://localhost:8080/OticaBarata/cliente/";
        this.headers = new Headers();
        this.headers.append('Content-Type', 'application/json');
        this.headers.append('Accept', 'application/json');
    }

    public listaClientes = (): Observable<Cliente[]> => {
        return this._http.get(this.actionUrl + "listaClientes")
            .map((response: Response) => 
                <Cliente[]>response.json())
            .catch(this.handleError);
    }

    public listaClientesPorNomeCPF = (cliente : Cliente): Observable<Cliente[]> => {
        let query = '';
        if(cliente.nome != undefined && cliente.nome != null){
            query = 'nome='+cliente.nome + '&';
        } 
        if(cliente.cpf != undefined && cliente.cpf != null){
            query += 'cpf=' +cliente.cpf;
        }
        return this._http.get(this.actionUrl + "listaClientesPorNomeCPF?"+query, 
        new Headers({'Content-Type' : 'application/x-www-form-urlencoded', 'Accept' : 'application/json'}))
            .map((response: Response) => 
                <Cliente[]>response.json())
            .catch(this.handleError);
    }

   public cadastrarCliente = (cliente): Observable<Cliente> => {
        let clienteNovo = JSON.stringify(cliente);

        return this._http.post(this.actionUrl + "salvar/", clienteNovo, { headers: this.headers })
            .map((response: Response) => <Cliente>response.json())
            .catch(this.handleError);
    }

    public getSingle = (id: number): Observable<Cliente> => {
        return this._http.get(this.actionUrl + "obterCliente/?id=" + id,
        new Headers({'Content-Type' : 'application/json', 'Accept' : 'application/json'}))
            .map((response: Response) => <Cliente>response.json())
            .catch(this.handleError);
    }

      public delete = (id: number): Observable<Response> => {
        return this._http.delete(this.actionUrl + "delete?id=" + id,
        )
            .catch(this.handleError);
    }

    public Add = (itemName: string): Observable<Cliente> => {
        let toAdd = JSON.stringify({ ItemName: itemName });

        return this._http.post(this.actionUrl, toAdd, { headers: this.headers })
            .map((response: Response) => <Cliente>response.json())
            .catch(this.handleError);
    }

    public Update = (id: number, itemToUpdate: Cliente): Observable<Cliente> => {
        return this._http.put(this.actionUrl + id, JSON.stringify(itemToUpdate), { headers: this.headers })
            .map((response: Response) => <Cliente>response.json())
            .catch(this.handleError);
    }

  

    private handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }
}