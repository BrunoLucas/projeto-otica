import { Injectable } from '@angular/core';

@Injectable()
export class Configuration {
    public Server: string = "http://localhost:8080/OticaBarata/";
   
    public ApiClienteUrl: string = "cliente/";
    public ServerWithApiClienteUrl = this.Server + this.ApiClienteUrl;
    
}