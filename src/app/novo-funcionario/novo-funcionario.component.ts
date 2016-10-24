import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Funcionario } from '../models/model-funcionario/funcionario.class';
import { FuncionarioService } from '../services/funcionario/funcionario.service';

@Component({
  selector: 'app-novo-funcionario',
  templateUrl: './novo-funcionario.component.html',
  styleUrls: ['./novo-funcionario.component.css'],
  providers: [FuncionarioService]
})
export class NovoFuncionarioComponent implements OnInit {

  public formFuncionario: FormGroup; // our model driven form
  public submitted: boolean; // keep track on whether form is submitted
  public events: any[] = []; // use later to display form changes
  funcionario: Funcionario;
  cadastrado : boolean;
  constructor(private _fb: FormBuilder, private funcionarioService: FuncionarioService) {

    this.funcionarioService = funcionarioService;
    console.log('Construtor de NovofuncionarioComponent');
    this.funcionario = new Funcionario();
    this.formFuncionario = _fb.group({
      'nome': new FormControl(this.funcionario.nome, Validators.minLength(3)),
      'cpf': new FormControl(this.funcionario.cpf, Validators.minLength(10)),
      'identidade': new FormControl(this.funcionario.identidade, Validators.minLength(10)),
      'comissao': new FormControl(),
      'sexo': new FormControl()
    });

  }

  ngOnInit() {
  }

  cadastrarFuncionario(model: Funcionario, isValid: boolean) {
    this.submitted = true;
    console.log(model, isValid);
  let teste = JSON.stringify(model);
    console.log('cadastrarfuncionario()');
    this.funcionarioService.cadastrarFuncionario(model).subscribe((data: Funcionario) => {
      console.log('cadastrarfuncionario() ' + data);

   this.cadastrado = true;
   //wait 3 Seconds and hide
   setTimeout(function() {
       this.cadastrado = false;
       console.log('cadastro de funcionario: ' + this.cadastrado);
       this.formFuncionario.reset();
   }.bind(this), 3000);

    },
      error => console.log(error),
      () => console.log('Get all Items complete'));

  }

}
