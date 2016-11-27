import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Cliente } from '../models/model-cliente/cliente.class';
import {Compra} from '../models/model-compra/compra.class';
import {Produto} from '../models/model-produto/produto.class';
import {ItemCompra} from '../models/model-item-compra/item-compra.class';
import { ClienteService } from '../services/cliente/cliente.service';
import {CompraService} from '../services/compra/compra.service';
import {ItemCompraService} from '../services/item-compra/item-compra.service';
import { ProdutoService } from '../services/produto/produto.service';


import { CompleterService, CompleterData } from 'ng2-completer';

@Component({
  selector: 'app-nova-venda',
  templateUrl: './nova-venda.component.html',
  styleUrls: ['./nova-venda.component.css'],
  providers : [CompraService, ClienteService, ItemCompraService, ProdutoService]
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
  finalizarCompra : boolean;
  listaDeProdutos: any = [];

  public dataService: CompleterData;

  private searchData = [
    { color: 'red', value: '#f00' },
    { color: 'green', value: '#0f0' },
    { color: 'blue', value: '#00f' },
    { color: 'cyan', value: '#0ff' },
    { color: 'magenta', value: '#f0f' },
    { color: 'yellow', value: '#ff0' },
    { color: 'black', value: '#000' }
  ];

  private varBusca = [];

  constructor(private _fb: FormBuilder,
   private clienteService: ClienteService,
   private compraService: CompraService,
   private itemCompraService: ItemCompraService,
   private produtoService: ProdutoService,
   private completerService: CompleterService) { 

    console.log('Construtor de NovoClienteComponent');
    this.cliente = new Cliente();
    this.formCompra = _fb.group({
      'codigoProduto': new FormControl(),
      'quantidadeItens': new FormControl()
    });
    this.itemCompra.compra = new Compra();
    this.itemCompra.produto = new Produto();
    this.produtoService = produtoService;



   }

  ngOnInit() {
    this.compra = new Compra();
    this.compra.valorTotal = 0.0;
    this.compra.quantidadeItens = 0;
    this.compra.status = 0;
    this.compra.formaPagamento = null;
    this.compra.cliente = new Cliente();
    console.log('cadastrarCompra()');
    this.compraService.cadastrarCompra(this.compra).subscribe((data: Compra) => {
      console.log('cadastrarCompra() ' + data);
      this.numeroCompra = data.codigo;
      this.compra.codigo = this.numeroCompra;
      this.itemCompra.compra.codigo = data.codigo;
    },
      error => console.log(error),
      () => console.log('Get all Items complete'));
      
          this.listarProdutos();


  }

  adicionarItem(){
    console.log('adicionarItem() => ' + this.itemCompra);
    console.log('searchData: ' + this.searchData);

    //this.itemCompra.produto.codigo = parseInt(this.searchData);
    this.submitted = true; 
    //this.itemCompra.compra.valorTotal = this.compra.valorTotal;
    this.itemCompraService.cadastrarItemCompra(this.itemCompra).subscribe((data: ItemCompra) => {
      console.log('adicionarItem() ' + data);
      this.listaDeItensCompra.push(data);//TODO continuar
   this.itemAdicionado = true;  
   this.compra.valorTotal += data.subTotal; 
   this.compra.quantidadeItens++;

   if(this.compra.formaPagamento != undefined && this.compra.formaPagamento != null){
     this.compra.formaPagamento = Number(this.compra.formaPagamento);
   }
   this.compraService.cadastrarCompra(this.compra).subscribe((data : Compra) => {


   });
   setTimeout(function() {
       this.itemAdicionado = false;
   }.bind(this), 1000);

    },
      error => console.log(error),
      () => console.log('Get all Items complete'));

  
  }

  iniciarFinalizarCompra(){
      this.finalizarCompra = true;
      this.compra.formaPagamento = parseInt(this.compra.formaPagamento.toString());
      this.compraService.cadastrarCompra(this.compra).subscribe((data : Compra) => {


   });
  }

   private listarProdutos(): void {

    console.log('listarProdutos()');
    this.produtoService
      .listaProdutos()
      .subscribe((data: Produto[]) => {
        console.log('listarProdutos() ' + data);

         this.listaDeProdutos =  data ;
        console.log('listarProdutos() => ' + this.listaDeProdutos);
        for (let i = 0; i < this.listaDeProdutos.length; i++) {
          console.log('produto: ' + this.listaDeProdutos[i].nome);  
          let var1 = {codigo : '', nome : ''};
          var1.codigo =  this.listaDeProdutos[i].codigo;
          var1.nome =  this.listaDeProdutos[i].nome;

          console.log('var1: '+var1);
          this.varBusca.push(var1);
        }
        console.log('varBusca: ' + this.varBusca);
        this.dataService = this.completerService.local(this.varBusca, 'nome', 'codigo');

      },
      error => console.log(error),
      () => console.log('Get all Items complete'));
  }

  

}
