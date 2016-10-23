import { Component, OnInit } from '@angular/core';

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
