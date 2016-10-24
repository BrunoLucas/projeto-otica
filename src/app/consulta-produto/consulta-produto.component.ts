import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Produto } from '../models/model-produto/produto.class';
import { ProdutoService } from '../services/produto/produto.service';

@Component({
  selector: 'app-consulta-produto',
  templateUrl: './consulta-produto.component.html',
  styleUrls: ['./consulta-produto.component.css'],
  providers: [ProdutoService]
})
export class ConsultaProdutoComponent implements OnInit {

  public formProduto: FormGroup; // our model driven form 
  listaDeProdutos: any = [];
  produto: Produto;
  constructor(private _fb: FormBuilder, private produtoService: ProdutoService) { 

  this.listaDeProdutos = [];
      this.produtoService = produtoService;
      console.log('Construtor de ConsultaClienteComponent');
      this.produto = new Produto();
      this.formProduto = _fb.group({
        'nome': new FormControl(this.produto.nome, Validators.minLength(3)),
        'codigo': new FormControl()
      });
  }

  ngOnInit() {
      this.listarProdutos();
  }


  consultaProduto(model: Produto, isValid: boolean) {
    // check if model is valid
    // if valid, call API to save customer
    console.log(model, isValid);

        console.log('consultaProduto()');
     this.produtoService
      .listaProdutosPorNomeCodigo(model)
      .subscribe((data: Produto[]) => {
        console.log('consultaProduto() ' + data);

         this.listaDeProdutos =  data ;
        console.log('consultaProduto() => ' + this.listaDeProdutos);

      },
      error => console.log(error),
      () => console.log('Get all Items complete'));

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
        }

      },
      error => console.log(error),
      () => console.log('Get all Items complete'));
  }
}
