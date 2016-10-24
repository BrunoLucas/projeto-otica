import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Cliente } from '../models/model-cliente/cliente.class';
import {Compra} from '../models/model-compra/compra.class';
import {ItemCompra} from '../models/model-item-compra/item-compra.class';
import { ClienteService } from '../services/cliente/cliente.service';
import {CompraService} from '../services/compra/compra.service';
import {ItemCompraService} from '../services/item-compra/item-compra.service';

@Component({
  selector: 'app-nova-venda',
  templateUrl: './nova-venda.component.html',
  styleUrls: ['./nova-venda.component.css'],
  providers : [CompraService, ClienteService, ItemCompraService]
})
export class NovaVendaComponent implements OnInit {

  public formCompra: FormGroup; 
  public submitted: boolean; 
  public events: any[] = []; 
  cliente: Cliente;
  compra: Compra;
  itemCompra : ItemCompra = new ItemCompra();
  cadastrado : boolean;
  listaDeItensCompra: any = [];
  numeroCompra : number;
  itemAdicionado : boolean;
  constructor(private _fb: FormBuilder,
   private clienteService: ClienteService,
   private compraService: CompraService,
   private itemCompraService: ItemCompraService) { 

    console.log('Construtor de NovoClienteComponent');
    this.cliente = new Cliente();
    this.formCompra = _fb.group({
      'codigoProduto': new FormControl(),
      'quantidadeItens': new FormControl()
    });

   }

  ngOnInit() {
    this.compra = new Compra();
    this.compra.valorTotal = 0.0;
    this.compra.quantidadeItens = 0;
    console.log('cadastrarCompra()');
    this.compraService.cadastrarCompra(this.compra).subscribe((data: Compra) => {
      console.log('cadastrarCompra() ' + data);
      this.numeroCompra = data.codigo;
      this.compra.codigo = this.numeroCompra;
    },
      error => console.log(error),
      () => console.log('Get all Items complete'));
  }

  adicionarItem(){
    console.log('adicionarItem() => ' + this.itemCompra);
    this.submitted = true; 

    this.itemCompraService.cadastrarItemCompra(this.itemCompra).subscribe((data: ItemCompra) => {
      console.log('adicionarItem() ' + data);
      this.listaDeItensCompra.push(data);//TODO continuar
   this.itemAdicionado = true;   
   setTimeout(function() {
       this.itemAdicionado = false;
   }.bind(this), 1000);

    },
      error => console.log(error),
      () => console.log('Get all Items complete'));

  
  }

}
