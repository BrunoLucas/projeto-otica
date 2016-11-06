
import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/map'
import { Observable } from 'rxjs/Observable';
import { Funcionario } from '../../models/model-funcionario/funcionario.class';
import { Configuration } from '../../app.constants';
import 'rxjs/add/operator/catch';


@Injectable()
export class FuncionarioService {

    private actionUrl: string;
    private headers: Headers;

    // constructor(private _http: Http , private _configuration: Configuration) {
        constructor(private _http: Http) {
        console.log('Construtor de FuncionarioService');
        //this.actionUrl = _configuration.ServerWithApiFuncionarioUrl;
        this.actionUrl = "http://localhost:8080/OticaBarata/funcionario/";
        this.headers = new Headers();
        this.headers.append('Content-Type', 'application/json');
        this.headers.append('Accept', 'application/json');
    }

    public listaFuncionarios = (): Observable<Funcionario[]> => {
        return this._http.get(this.actionUrl + "listaFuncionarios")
            .map((response: Response) => 
                <Funcionario[]>response.json())
            .catch(this.handleError);
    }

    public listaFuncionariosPorNomeCPF = (funcionario : Funcionario): Observable<Funcionario[]> => {
        let query = '';
        if(funcionario.nome != undefined && funcionario.nome != null){
            query = 'nome='+funcionario.nome + '&';
        } 
        if(funcionario.cpf != undefined && funcionario.cpf != null){
            query += 'cpf=' +funcionario.cpf;
        }
        return this._http.get(this.actionUrl + "listaFuncionariosPorNomeCPF?"+query, 
        new Headers({'Content-Type' : 'application/x-www-form-urlencoded', 'Accept' : 'application/json'}))
            .map((response: Response) => 
                <Funcionario[]>response.json())
            .catch(this.handleError);
    }

   public cadastrarFuncionario = (funcionario): Observable<Funcionario> => {
        let funcionarioNovo = JSON.stringify(funcionario);

        return this._http.post(this.actionUrl + "salvar/", funcionarioNovo, { headers: this.headers })
            .map((response: Response) => <Funcionario>response.json())
            .catch(this.handleError);
    }

      public getSingle = (id: number): Observable<Funcionario> => {
        return this._http.get(this.actionUrl + "obterFuncionario/?id=" + id,
        new Headers({'Content-Type' : 'application/json', 'Accept' : 'application/json'}))
            .map((response: Response) => <Funcionario>response.json())
            .catch(this.handleError);
    }

     public delete = (id: number): Observable<Response> => {
        return this._http.delete(this.actionUrl + "delete?id=" + id,
        )
            .catch(this.handleError);
    }

    public Add = (itemName: string): Observable<Funcionario> => {
        let toAdd = JSON.stringify({ ItemName: itemName });

        return this._http.post(this.actionUrl, toAdd, { headers: this.headers })
            .map((response: Response) => <Funcionario>response.json())
            .catch(this.handleError);
    }

    public Update = (id: number, itemToUpdate: Funcionario): Observable<Funcionario> => {
        return this._http.put(this.actionUrl + id, JSON.stringify(itemToUpdate), { headers: this.headers })
            .map((response: Response) => <Funcionario>response.json())
            .catch(this.handleError);
    }

    public Delete = (id: number): Observable<Response> => {
        return this._http.delete(this.actionUrl + id)
            .catch(this.handleError);
    }

    private handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }
}