import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Cliente } from '../models/model-cliente/cliente.class';
import { ClienteService } from '../services/cliente/cliente.service';

import { RouterModule, Routes, ActivatedRoute, Router, Params } from '@angular/router';
@Component({
  selector: 'app-altera-cliente',
  templateUrl: './altera-cliente.component.html',
  styleUrls: ['./altera-cliente.component.css'],
  providers: [ClienteService]
})
export class AlteraClienteComponent implements OnInit {

  public formCliente: FormGroup;
  public submitted: boolean;
  public events: any[] = [];
  cliente: Cliente;
  cadastrado: boolean;
  constructor(private _fb: FormBuilder, private clienteService: ClienteService, private route: ActivatedRoute,
    private router: Router) {

    this.clienteService = clienteService;
    console.log('Construtor de AlteraClienteComponent');
    this.cliente = new Cliente();
    this.formCliente = _fb.group({
      'nome': new FormControl(this.cliente.nome, Validators.minLength(3)),
      'cpf': new FormControl(this.cliente.cpf, Validators.minLength(10)),
      'telefone': new FormControl(),
      'observacao': new FormControl(),
      'sexo': new FormControl()
    });

  }
  ngOnInit() {


    this.route.params.forEach((params: Params) => {
      let id = +params['id']; // (+) converts string 'id' to a number
     
      this.clienteService
        .getSingle(id)
        .subscribe((data: Cliente) => {
          console.log('alterarCliente() ' + data);
          this.cliente = data;
          console.log('form: ' + this.formCliente);
         // this.formCliente['nome'] = this.cliente.nome;
          this.formCliente = this._fb.group({
      'codigo' : new FormControl(this.cliente.codigo),
      'nome': new FormControl(this.cliente.nome, Validators.minLength(3)),
      'cpf': new FormControl(this.cliente.cpf, Validators.minLength(10)),
      'telefone': new FormControl(this.cliente.telefone),
      'observacao': new FormControl(this.cliente.observacao),
      'sexo': new FormControl(this.cliente.sexo)
    });
          console.log('alterarCliente() => ' + this.cliente);
        },
        error => console.log(error),
        () => console.log('Get all Items complete'));
    });


  }


  alterarCliente(model: Cliente, isValid: boolean) {
    this.submitted = true;
    console.log(model, isValid);
    let teste = JSON.stringify(model);
    console.log('alterarCliente()');
    this.clienteService.cadastrarCliente(model).subscribe((data: Cliente) => {
      console.log('alterarCliente() ' + data);

      this.cadastrado = true;
      setTimeout(function () {
        this.cadastrado = false;
        console.log('alteracao de cliente: ' + this.cadastrado);
        this.formCliente.reset();
      }.bind(this), 3000);

    },
      error => console.log(error),
      () => console.log('Get all Items complete'));

  }

}
