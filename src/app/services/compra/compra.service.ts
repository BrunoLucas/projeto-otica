
import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/map'
import { Observable } from 'rxjs/Observable';
import { Compra } from '../../models/model-compra/compra.class';
import { Configuration } from '../../app.constants';
import 'rxjs/add/operator/catch';


@Injectable()
export class CompraService {

    private actionUrl: string;
    private headers: Headers;

    // constructor(private _http: Http , private _configuration: Configuration) {
        constructor(private _http: Http) {
        console.log('Construtor de CompraService');
        //this.actionUrl = _configuration.ServerWithApiCompraUrl;
        this.actionUrl = "http://localhost:8080/OticaBarata/compra/";
        this.headers = new Headers();
        this.headers.append('Content-Type', 'application/json');
        this.headers.append('Accept', 'application/json');
    }

    public listaCompras = (): Observable<Compra[]> => {
        return this._http.get(this.actionUrl + "listaCompras")
            .map((response: Response) => 
                <Compra[]>response.json())
            .catch(this.handleError);
    }

    public listaComprasPorCodigoCliente = (codigoCliente : number): Observable<Compra[]> => {
        let query = '';
        if(codigoCliente != undefined && codigoCliente != null){
            query += 'codigoCliente=' +codigoCliente;
        }
        return this._http.get(this.actionUrl + "listaComprasPorCodigoCliente?"+query, 
        new Headers({'Content-Type' : 'application/x-www-form-urlencoded', 'Accept' : 'application/json'}))
            .map((response: Response) => 
                <Compra[]>response.json())
            .catch(this.handleError);
    }

   public cadastrarCompra = (Compra): Observable<Compra> => {
        let CompraNovo = JSON.stringify(Compra);

        return this._http.post(this.actionUrl + "salvar/", CompraNovo, { headers: this.headers })
            .map((response: Response) => <Compra>response.json())
            .catch(this.handleError);
    }

    public GetSingle = (id: number): Observable<Compra> => {
        return this._http.get(this.actionUrl + id)
            .map((response: Response) => <Compra>response.json())
            .catch(this.handleError);
    }

    public Add = (itemName: string): Observable<Compra> => {
        let toAdd = JSON.stringify({ ItemName: itemName });

        return this._http.post(this.actionUrl, toAdd, { headers: this.headers })
            .map((response: Response) => <Compra>response.json())
            .catch(this.handleError);
    }

    public Update = (id: number, itemToUpdate: Compra): Observable<Compra> => {
        return this._http.put(this.actionUrl + id, JSON.stringify(itemToUpdate), { headers: this.headers })
            .map((response: Response) => <Compra>response.json())
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