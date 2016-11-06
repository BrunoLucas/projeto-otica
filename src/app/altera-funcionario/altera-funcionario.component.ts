import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Funcionario } from '../models/model-funcionario/funcionario.class';
import { FuncionarioService } from '../services/funcionario/funcionario.service';

import { RouterModule, Routes, ActivatedRoute, Router, Params } from '@angular/router';
@Component({
  selector: 'app-altera-funcionario',
  templateUrl: './altera-funcionario.component.html',
  styleUrls: ['./altera-funcionario.component.css'],
  providers: [FuncionarioService]
})
export class AlteraFuncionarioComponent implements OnInit {

  public formFuncionario: FormGroup;
  public submitted: boolean;
  public events: any[] = [];
  funcionario: Funcionario;
  cadastrado: boolean;
  constructor(private _fb: FormBuilder, private funcionarioService: FuncionarioService, private route: ActivatedRoute,
    private router: Router) {

    this.funcionarioService = funcionarioService;
    console.log('Construtor de AlterafuncionarioComponent');
    this.funcionario = new Funcionario();
    this.formFuncionario = _fb.group({
      'nome': new FormControl(this.funcionario.nome, Validators.minLength(3)),
      'identidade': new FormControl(),
      'cpf': new FormControl(this.funcionario.cpf, Validators.minLength(10)),
      'telefone': new FormControl(),
      'comissao': new FormControl(),
      'sexo': new FormControl()
    });

  }
  ngOnInit() {


    this.route.params.forEach((params: Params) => {
      let id = +params['id']; // (+) converts string 'id' to a number
     
      this.funcionarioService
        .getSingle(id)
        .subscribe((data: Funcionario) => {
          console.log('alterarfuncionario() ' + data);
          this.funcionario = data;
          console.log('form: ' + this.formFuncionario);
         // this.formfuncionario['nome'] = this.funcionario.nome;
          this.formFuncionario = this._fb.group({
      'codigo' : new FormControl(this.funcionario.codigo),
      'nome': new FormControl(this.funcionario.nome, Validators.minLength(3)),
      'cpf': new FormControl(this.funcionario.cpf, Validators.minLength(10)),
      'identidade': new FormControl(this.funcionario.identidade),
      'comissao': new FormControl(this.funcionario.comissao),
      'sexo': new FormControl(this.funcionario.sexo)
    });
          console.log('alterarfuncionario() => ' + this.funcionario);
        },
        error => console.log(error),
        () => {
          console.log('Get all Items complete')
          });
    });


  }


  alterarFuncionario(model: Funcionario, isValid: boolean) {
    this.submitted = true;
    console.log(model, isValid);
    let teste = JSON.stringify(model);
    console.log('alterarFuncionario()');
    this.funcionarioService.cadastrarFuncionario(model).subscribe((data: Funcionario) => {
      console.log('alterarFuncionario() ' + data);

      this.cadastrado = true;
      setTimeout(function () {
        this.cadastrado = false;
        console.log('alteracao de funcionario: ' + this.cadastrado);
        this.formfuncionario.reset();
      }.bind(this), 3000);

    },
      error => console.log(error),
      () => console.log('Get all Items complete'));

  }


}
