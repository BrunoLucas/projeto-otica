import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Produto } from '../models/model-produto/produto.class';
import { ProdutoService } from '../services/produto/produto.service';

@Component({
  selector: 'app-novo-produto',
  templateUrl: './novo-produto.component.html',
  styleUrls: ['./novo-produto.component.css'],
    providers: [ProdutoService]

})
export class NovoProdutoComponent implements OnInit {
  public formProduto: FormGroup;
  public submitted: boolean; 
  public events: any[] = []; 
  produto: Produto;
  cadastrado: boolean;
  constructor(private _fb: FormBuilder, private produtoService: ProdutoService) {

    this.produtoService = produtoService;
    console.log('Construtor de NovoProdutoComponent');
    this.produto = new Produto();
    this.formProduto = _fb.group({
      'nome': new FormControl(this.produto.nome, Validators.minLength(3)),
      'marca': new FormControl(),
      'precoVenda': new FormControl(),
      'precoCompra': new FormControl(),
      'quantidadeEstoque': new FormControl()
    });

  }

  ngOnInit() {
  }

  cadastrarProduto(model: Produto, isValid: boolean) {
    this.submitted = true; // set form submit to true
    // check if model is valid
    // if valid, call API to save customer
    console.log(model, isValid);
  let teste = JSON.stringify(model);
    console.log('cadastrarProduto()');
    this.produtoService.cadastrarProduto(model).subscribe((data: Produto) => {
      console.log('cadastrarProduto() ' + data);
   this.cadastrado = true;
   //wait 3 Seconds and hide
   setTimeout(function() {
       this.cadastrado = false;
       console.log('cadastro de Produto: ' + this.cadastrado);
       this.formProduto.reset();
   }.bind(this), 3000);

    },
      error => console.log(error),
      () => console.log('Get all Items complete'));

  }

}
