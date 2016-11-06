import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Produto } from '../models/model-produto/produto.class';
import { ProdutoService } from '../services/produto/produto.service';

import { RouterModule, Routes, ActivatedRoute, Router, Params } from '@angular/router';
@Component({
  selector: 'app-altera-produto',
  templateUrl: './altera-produto.component.html',
  styleUrls: ['./altera-produto.component.css'],
  providers: [ProdutoService]
})
export class AlteraProdutoComponent implements OnInit {

  public formProduto: FormGroup;
  public submitted: boolean;
  public events: any[] = [];
  produto: Produto;
  cadastrado: boolean;

  constructor(private _fb: FormBuilder, private produtoService: ProdutoService, private route: ActivatedRoute,
    private router: Router) { 

          this.produtoService = produtoService;
    console.log('Construtor de AlterafuncionarioComponent');
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


    this.route.params.forEach((params: Params) => {
      let id = +params['id']; // (+) converts string 'id' to a number
     
      this.produtoService
        .getSingle(id)
        .subscribe((data: Produto) => {
          console.log('alterarProduto() ' + data);
          this.produto = data;
          console.log('form: ' + this.formProduto);
         // this.formfuncionario['nome'] = this.funcionario.nome;
        this.formProduto = this._fb.group({
          'nome': new FormControl(this.produto.nome, Validators.minLength(3)),
          'marca': new FormControl(this.produto.marca),
          'precoVenda': new FormControl(this.produto.precoVenda),
          'precoCompra': new FormControl(this.produto.precoCompra),
          'quantidadeEstoque': new FormControl(this.produto.quantidadeEstoque)
        });
          console.log('alterarProduto() => ' + this.produto);
        },
        error => console.log(error),
        () => {
          console.log('Get all Items complete')
          });
    });


  }


  alterarProduto(model: Produto, isValid: boolean) {
    this.submitted = true;
    console.log(model, isValid);
    let teste = JSON.stringify(model);
    console.log('alterarProduto()');
    this.produtoService.cadastrarProduto(model).subscribe((data: Produto) => {
      console.log('alterarProduto() ' + data);

      this.cadastrado = true;
      setTimeout(function () {
        this.cadastrado = false;
        console.log('alteracao de produto: ' + this.cadastrado);
        this.formProduto.reset();
      }.bind(this), 3000);

    },
      error => console.log(error),
      () => console.log('Get all Items complete'));

  }

}
