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

  public formFuncionario: FormGroup; // our model driven form
  public submitted: boolean; // keep track on whether form is submitted
  public events: any[] = []; // use later to display form changes
  listaDeFuncionarios: any = [];
  Funcionario: Funcionario;
  constructor(private _fb: FormBuilder, private FuncionarioService: FuncionarioService) {
    this.listaDeFuncionarios = [];
    this.FuncionarioService = FuncionarioService;
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
     this.FuncionarioService
      .listaFuncionariosPorNomeCPF(model)
      .subscribe((data: Funcionario[]) => {
        console.log('consultaFuncionario() ' + data);

         this.listaDeFuncionarios =  data ;
        console.log('consultaFuncionario() => ' + this.listaDeFuncionarios);
        for (let i = 0; i < this.listaDeFuncionarios.length; i++) {
          console.log('Funcionario: ' + this.listaDeFuncionarios[i].nome);
        }

      },
      error => console.log(error),
      () => console.log('Get all Items complete'));

  }

  private listarFuncionarios(): void {

    console.log('listarFuncionarios()');
    this.FuncionarioService
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
