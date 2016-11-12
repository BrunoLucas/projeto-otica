import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Cliente } from '../models/model-cliente/cliente.class';
import { ClienteService } from '../services/cliente/cliente.service';
@Component({
  selector: 'app-consulta-cliente',
  templateUrl: './consulta-cliente.component.html',
  styleUrls: ['./consulta-cliente.component.css'],
  providers: [ClienteService]
})
export class ConsultaClienteComponent implements OnInit {

  public formCliente: FormGroup;
  public submitted: boolean;
  public events: any[] = [];
  listaDeClientes: any = [];
  cliente: Cliente;
  constructor(private _fb: FormBuilder, private clienteService: ClienteService) {
    this.listaDeClientes = [];
    this.clienteService = clienteService;
    console.log('Construtor de ConsultaClienteComponent');
    this.cliente = new Cliente();
    this.formCliente = _fb.group({
      'nome': new FormControl(this.cliente.nome, Validators.minLength(3)),
      'cpf': new FormControl(this.cliente.cpf, Validators.minLength(3))
    });
  }

  ngOnInit() {

    this.listarClientes();

    // console.log('lista: ' + this.listaDeClientes);
    // for (let i of this.listaDeClientes) {
    //   console.log('cliente: ' + i.nome);
    // }

  }

  consultaCliente(model: Cliente, isValid: boolean) {
    this.submitted = true;
    console.log(model, isValid);

    console.log('consultaCliente()');
    this.clienteService
      .listaClientesPorNomeCPF(model)
      .subscribe((data: Cliente[]) => {
        console.log('consultaCliente() ' + data);
        this.listaDeClientes =  Object.keys(data).map(key => data[key]); //convert in array
        console.log('consultaCliente() => ' + this.listaDeClientes);
        // for (let i = 0; i < this.listaDeClientes.length; i++) {
        //   console.log('cliente: ' + this.listaDeClientes[i].nome);
        // }

      },
      error => console.log(error),
      () => console.log('Get all Items complete'));

  }


  private listarClientes(): void {

    console.log('listarClientes()');
    this.clienteService
      .listaClientes()
      .subscribe((data: Cliente[]) => {
        console.log('listaClientes() ' + data);

        this.listaDeClientes = data;
        console.log('listaDeClientes() => ' + this.listaDeClientes);
        // for (let i = 0; i < this.listaDeClientes.length; i++) {
        //   console.log('cliente: ' + this.listaDeClientes[i].nome);
        // }

      },
      error => console.log(error),
      () => console.log('Get all Items complete'));
  }
  



  deletarCliente(codigo: number) {
    let result = confirm('deletar: ' + codigo);

    // alert('true ' + result);
    // alert('false ' + result);

    if (result === true) {


      this.submitted = true;
      console.log('deletarCliente()');
      this.clienteService.delete(codigo)
      .subscribe(() => {
        console.log('deletarCliente() ' + codigo);
        this.listarClientes();
        setTimeout(function () {
          this.cadastrado = false;
          console.log('delete de cliente: ' + this.cadastrado);
          this.formCliente.reset();
        }.bind(this), 3000);

      },
        error => console.log(error),
        () => console.log('Get all Items complete'));


    }
  }





}
