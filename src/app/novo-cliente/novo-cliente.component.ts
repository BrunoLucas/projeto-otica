import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Cliente } from '../models/model-cliente/cliente.class';
import { ClienteService } from '../services/cliente/cliente.service';

@Component({
  selector: 'app-novo-cliente',
  templateUrl: './novo-cliente.component.html',
  styleUrls: ['./novo-cliente.component.css'],
  providers: [ClienteService]
})
export class NovoClienteComponent implements OnInit {

  public formCliente: FormGroup; // our model driven form
  public submitted: boolean; // keep track on whether form is submitted
  public events: any[] = []; // use later to display form changes
  cliente: Cliente;
  cadastrado : boolean;
  constructor(private _fb: FormBuilder, private clienteService: ClienteService) {

    this.clienteService = clienteService;
    console.log('Construtor de NovoClienteComponent');
    this.cliente = new Cliente();
    this.formCliente = _fb.group({
      'nome': new FormControl(this.cliente.nome, Validators.minLength(3)),
      'cpf': new FormControl(this.cliente.cpf, Validators.minLength(10)),
      'email': new FormControl(),
      'telefone': new FormControl(),
      'observacao': new FormControl(),
      'sexo': new FormControl()
    });

  }

  ngOnInit() {  
  }

  cadastrarCliente(model: Cliente, isValid: boolean) {
    this.submitted = true; 
    console.log(model, isValid);
    let teste = JSON.stringify(model);
    console.log('cadastrarCliente()');
    this.clienteService.cadastrarCliente(model).subscribe((data: Cliente) => {
      console.log('cadastrarCliente() ' + data);

   this.cadastrado = true;
   //wait 3 Seconds and hide
   setTimeout(function() {
       this.cadastrado = false;
       console.log('cadastro de cliente: ' + this.cadastrado);
       this.formCliente.reset();
   }.bind(this), 3000);

    },
      error => console.log(error),
      () => console.log('Get all Items complete'));

  }

}
