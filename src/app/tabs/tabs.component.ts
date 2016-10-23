import { ChangeDetectionStrategy, Component } from '@angular/core';

  import { TabsModule } from 'ng2-bootstrap/ng2-bootstrap';
//import { TabsModule } from 'ng2-bootstrap/components/tabs';

// webpack html imports
let template = require('./tabs.component.html');
 
@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.css']
})
export class TabsComponent {
  public tabs:Array<any> = [
    {title: 'Clientes', content: 'Dynamic content 1'},
    {title: 'Compras', content: 'Dynamic content 2'},
    {title: 'Produtos', content: 'Dynamic content 3'},
    {title: 'Funcionários', content: 'Dynamic content 4', customClass: 'customClass'},
     {title: 'Vendas', content: 'Dynamic content 4', customClass: 'customClass'},
    {title: 'Marcas', content: 'Dynamic content 4', customClass: 'customClass'},
     {title: 'Estoque', content: 'Dynamic content 4', customClass: 'customClass'}
  ];
 
  public alertMe():void {
    setTimeout(function ():void {
      alert('You\'ve selected the alert tab!');
    });
  };
 
  public setActiveTab(index:number):void {
    this.tabs[index].active = true;
  };
 
  public removeTabHandler(/*tab:any*/):void {
    console.log('Remove Tab handler');
  };

  ngOnInit() {
     this.setActiveTab(0);
  }
}
