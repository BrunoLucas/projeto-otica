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

  public formCompra: FormGroup; // our model driven form
  public submitted: boolean; // keep track on whether form is submitted
  public events: any[] = []; // use later to display form changes
  cliente: Cliente;
  compra: Compra;
  itemCompra : ItemCompra;
  cadastrado : boolean;
  listaDeItensCompra: any = [];

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

  }

}
