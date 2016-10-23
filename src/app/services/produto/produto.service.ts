
import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/map'
import { Observable } from 'rxjs/Observable';
import { Produto } from '../../models/model-produto/produto.class';
import { Configuration } from '../../app.constants';
import 'rxjs/add/operator/catch';


@Injectable()
export class ProdutoService {

    private actionUrl: string;
    private headers: Headers;

    // constructor(private _http: Http , private _configuration: Configuration) {
        constructor(private _http: Http) {
        console.log('Construtor de ProdutoService');
        //this.actionUrl = _configuration.ServerWithApiProdutoUrl;
        this.actionUrl = "http://localhost:8080/OticaBarata/produto/";
        this.headers = new Headers();
        this.headers.append('Content-Type', 'application/json');
        this.headers.append('Accept', 'application/json');
    }

    public listaProdutos = (): Observable<Produto[]> => {
        return this._http.get(this.actionUrl + "listaProdutos")
            .map((response: Response) => 
                <Produto[]>response.json())
            .catch(this.handleError);
    }


    public listaProdutosPorNomeCodigo = (produto : Produto): Observable<Produto[]> => {
        let query = '';
        if(produto.nome != undefined && produto.nome != null){
            query = 'nome='+produto.nome + '&';
        } 
        if(produto.codigo != undefined && produto.codigo != null){
            query += 'codigo=' +produto.codigo;
        }
        return this._http.get(this.actionUrl + "listaProdutosPorNomeCodigo?"+query, 
        new Headers({'Content-Type' : 'application/x-www-form-urlencoded', 'Accept' : 'application/json'}))
            .map((response: Response) => 
                <Produto[]>response.json())
            .catch(this.handleError);
    }

   public cadastrarProduto = (Produto): Observable<Produto> => {
        let ProdutoNovo = JSON.stringify(Produto);

        return this._http.post(this.actionUrl + "salvar/", ProdutoNovo, { headers: this.headers })
            .map((response: Response) => <Produto>response.json())
            .catch(this.handleError);
    }

    public GetSingle = (id: number): Observable<Produto> => {
        return this._http.get(this.actionUrl + id)
            .map((response: Response) => <Produto>response.json())
            .catch(this.handleError);
    }

    public Add = (itemName: string): Observable<Produto> => {
        let toAdd = JSON.stringify({ ItemName: itemName });

        return this._http.post(this.actionUrl, toAdd, { headers: this.headers })
            .map((response: Response) => <Produto>response.json())
            .catch(this.handleError);
    }

    public Update = (id: number, itemToUpdate: Produto): Observable<Produto> => {
        return this._http.put(this.actionUrl + id, JSON.stringify(itemToUpdate), { headers: this.headers })
            .map((response: Response) => <Produto>response.json())
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