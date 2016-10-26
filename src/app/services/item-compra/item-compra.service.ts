
import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/map'
import { Observable } from 'rxjs/Observable';
import { ItemCompra } from '../../models/model-item-compra/item-compra.class';
import { Configuration } from '../../app.constants';
import 'rxjs/add/operator/catch';


@Injectable()
export class ItemCompraService {

    private actionUrl: string;
    private headers: Headers;

    // constructor(private _http: Http , private _configuration: Configuration) {
        constructor(private _http: Http) {
        console.log('Construtor de ItemCompraService');
        //this.actionUrl = _configuration.ServerWithApiItemCompraUrl;
        this.actionUrl = "http://localhost:8080/OticaBarata/itemCompra/";
        this.headers = new Headers();
        this.headers.append('Content-Type', 'application/json');
        this.headers.append('Accept', 'application/json');
    }

    public listaItemCompras = (): Observable<ItemCompra[]> => {
        return this._http.get(this.actionUrl + "listaItemCompras")
            .map((response: Response) => 
                <ItemCompra[]>response.json())
            .catch(this.handleError);
    }

    public listaItemComprasPorCodigoCliente = (codigoCliente : number): Observable<ItemCompra[]> => {
        let query = '';
        if(codigoCliente != undefined && codigoCliente != null){
            query += 'codigoCliente=' +codigoCliente;
        }
        return this._http.get(this.actionUrl + "listaItemComprasPorCodigoCliente?"+query, 
        new Headers({'Content-Type' : 'application/x-www-form-urlencoded', 'Accept' : 'application/json'}))
            .map((response: Response) => 
                <ItemCompra[]>response.json())
            .catch(this.handleError);
    }

   public cadastrarItemCompra = (ItemCompra): Observable<ItemCompra> => {
        let itemCompraNovo = JSON.stringify(ItemCompra);

        return this._http.post(this.actionUrl + "salvar/", itemCompraNovo, { headers: this.headers })
            .map((response: Response) => <ItemCompra>response.json())
            .catch(this.handleError);
    }

    public GetSingle = (id: number): Observable<ItemCompra> => {
        return this._http.get(this.actionUrl + id)
            .map((response: Response) => <ItemCompra>response.json())
            .catch(this.handleError);
    }

    public Add = (itemName: string): Observable<ItemCompra> => {
        let toAdd = JSON.stringify({ ItemName: itemName });

        return this._http.post(this.actionUrl, toAdd, { headers: this.headers })
            .map((response: Response) => <ItemCompra>response.json())
            .catch(this.handleError);
    }

    public Update = (id: number, itemToUpdate: ItemCompra): Observable<ItemCompra> => {
        return this._http.put(this.actionUrl + id, JSON.stringify(itemToUpdate), { headers: this.headers })
            .map((response: Response) => <ItemCompra>response.json())
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