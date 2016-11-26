import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Funcionario } from '../models/model-funcionario/funcionario.class';
import { FuncionarioService } from '../services/funcionario/funcionario.service';
@Component({
  selector: 'app-consulta-Funcionario',
  templateUrl: './consulta-funcionario.component.html',
  styleUrls: ['./consulta-funcionario.component.css'],
  providers: [FuncionarioService]
})
export class ConsultaFuncionarioComponent implements OnInit {

  public formFuncionario: FormGroup;
  public submitted: boolean; 
  public events: any[] = []; 
  listaDeFuncionarios: any = [];
  Funcionario: Funcionario;
  constructor(private _fb: FormBuilder, private funcionarioService: FuncionarioService) {
    this.listaDeFuncionarios = [];
    this.funcionarioService = funcionarioService;
    console.log('Construtor de ConsultaFuncionarioComponent');
    this.Funcionario = new Funcionario();
    this.formFuncionario = _fb.group({
      'nome': new FormControl(this.Funcionario.nome, Validators.minLength(3)),
      'cpf': new FormControl(this.Funcionario.cpf, Validators.minLength(10))
    });
  }

  ngOnInit() {

    this.listarFuncionarios();

    console.log('lista: ' + this.listaDeFuncionarios);
    for (let i of this.listaDeFuncionarios) {
      console.log('Funcionario: ' + i.nome);
    }

  }

  consultaFuncionario(model: Funcionario, isValid: boolean) {
    this.submitted = true;
    console.log(model, isValid);

        console.log('consultaFuncionario()');
     this.funcionarioService
      .listaFuncionariosPorNomeCPF(model)
      .subscribe((data: Funcionario[]) => {
        console.log('consultaFuncionario() ' + data);
        this.listaDeFuncionarios =  Object.keys(data).map(key => data[key]); //convert in array
        console.log('consultaFuncionario() => ' + this.listaDeFuncionarios);
        for (let i = 0; i < this.listaDeFuncionarios.length; i++) {
          console.log('Funcionario: ' + this.listaDeFuncionarios[i].nome);
        }

      },
      error => console.log(error),
      () => console.log('Get all Items complete'));

  }

  deletarFuncionario(codigo: number) {
    let result = confirm('deletar: ' + codigo);

    // alert('true ' + result);
    // alert('false ' + result);

    if (result === true) {


      this.submitted = true;
      console.log('deletarFuncionario()');
      this.funcionarioService.delete(codigo)
      .subscribe(() => {
        console.log('deletarFuncionario() ' + codigo);
        this.listarFuncionarios();
        setTimeout(function () {
          this.cadastrado = false;
          console.log('delete de funcionario: ' + this.cadastrado);
          this.formCliente.reset();
        }.bind(this), 3000);

      },
        error => console.log(error),
        () => console.log('Get all Items complete'));


    }
  }

  private listarFuncionarios(): void {

    console.log('listarFuncionarios()');
    this.funcionarioService
      .listaFuncionarios()
      .subscribe((data: Funcionario[]) => {
        console.log('listaFuncionarios() ' + data);

         this.listaDeFuncionarios =  data ;
        console.log('listaDeFuncionarios() => ' + this.listaDeFuncionarios);
        for (let i = 0; i < this.listaDeFuncionarios.length; i++) {
          console.log('Funcionario: ' + this.listaDeFuncionarios[i].nome);
        }

      },
      error => console.log(error),
      () => console.log('Get all Items complete'));
  }


}
