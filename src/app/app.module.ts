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
import { AlteraClienteComponent } from './altera-cliente/altera-cliente.component';
import { AlteraFuncionarioComponent } from './altera-funcionario/altera-funcionario.component';
import { AlteraProdutoComponent } from './altera-produto/altera-produto.component';

import { Ng2CompleterModule } from "ng2-completer";


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
  },
   {
    path: 'cliente/alterar-cliente/:id',
    component: AlteraClienteComponent 
  },
   {
    path: 'cliente/deletar-cliente/:id',
    component: AlteraClienteComponent 
  },
  {
    path: 'funcionario/alterar-funcionario/:id',
    component: AlteraFuncionarioComponent 
  },
   {
    path: 'funcionario/deletar-funcionario/:id',
    component: AlteraFuncionarioComponent
  },
  {
    path: 'produto/alterar-produto/:id',
    component: AlteraProdutoComponent 
  },
  {
    path: 'produto/deletar-produto/:id',
    component: AlteraProdutoComponent
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
    ContatoComponent,
    AlteraClienteComponent,
    AlteraFuncionarioComponent,
    AlteraProdutoComponent
    
  ],  
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AlertModule,
    TabsModule,
    ReactiveFormsModule,
    Ng2CompleterModule,
    RouterModule.forRoot(
  routes, { useHash: false }
)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
