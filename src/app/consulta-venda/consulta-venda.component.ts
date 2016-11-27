import { Component, OnInit } from '@angular/core';
import { CompleterService, CompleterData } from 'ng2-completer';

@Component({
  selector: 'app-consulta-venda',
  templateUrl: './consulta-venda.component.html',
  styleUrls: ['./consulta-venda.component.css']
})
export class ConsultaVendaComponent implements OnInit {

  constructor() { 
    console.log('contrutor de ConsultaVendaComponent');
  }

  ngOnInit() {
    console.log('ngOnInit de ConsultaVendaComponent');
  }

}
