import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { AlertModule } from 'ng2-bootstrap/ng2-bootstrap';

import {InicialComponent} from './inicial/inicial.component';

import { RouterModule , Routes}   from '@angular/router';
import { SecondComponent } from './second/second.component';
import { TabsComponent } from './tabs/tabs.component';

import { TabsModule } from 'ng2-bootstrap/ng2-bootstrap';
import { ConsultaClienteComponent } from './consulta-cliente/consulta-cliente.component';
import { NovoClienteComponent } from './novo-cliente/novo-cliente.component';
import { ConsultaVendaComponent } from './consulta-venda/consulta-venda.component';
import { NovaVendaComponent } from './nova-venda/nova-venda.component';
import { ConsultaProdutoComponent } from './consulta-produto/consulta-produto.component';
import { NovoProdutoComponent } from './novo-produto/novo-produto.component';
import { ConsultaFuncionarioComponent } from './consulta-funcionario/consulta-funcionario.component';
import { NovoFuncionarioComponent } from './novo-funcionario/novo-funcionario.component';
import {SobreComponent} from './sobre/sobre.component';
import { ContatoComponent } from './contato/contato.component';


const routes: Routes = [

 {
    path: '',
    component: InicialComponent
  },
  {
    path: 'inicial',
    component: InicialComponent
  },
   {
    path: 'cliente',
    component: ConsultaClienteComponent
  },
    {
    path: 'cliente/novo-cliente',
    component: NovoClienteComponent
  },
  {
    path: 'venda',
    component: ConsultaVendaComponent
  },
    {
    path: 'venda/nova-venda',
    component: NovaVendaComponent
  },
   {
    path: 'produto',
    component: ConsultaProdutoComponent
  },
   {
    path: 'produto/novo-produto',
    component: NovoProdutoComponent
  },
  {
    path: 'funcionario',
    component: ConsultaFuncionarioComponent
  },
   {
    path: 'funcionario/novo-funcionario',
    component: NovoFuncionarioComponent 
  },
    {
    path: 'sobre',
    component: SobreComponent 
  },
   {
    path: 'contato',
    component: ContatoComponent 
  }


];

@NgModule({
  declarations: [
    AppComponent,
    InicialComponent,
    SecondComponent,
    TabsComponent,
    ConsultaClienteComponent,
    NovoClienteComponent,
    ConsultaVendaComponent,
    NovaVendaComponent,
    ConsultaProdutoComponent,
    NovoProdutoComponent,
    ConsultaFuncionarioComponent,
    NovoFuncionarioComponent,
    SobreComponent,
    ContatoComponent
    
  ],  
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AlertModule,
    TabsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(
  routes, { useHash: false }
)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
