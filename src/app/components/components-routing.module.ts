import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';




@NgModule({
  imports: [ RouterModule.forChild([
     {path: 'formulario', loadChildren: () => import('./formulario/formulario.module').then(m=>m.FormularioModule) },
     {path: 'clientes', loadChildren: () => import('./clientes/clientes.module').then(m=>m.ClientesModule) },
  ])
    
  ]
})
export class ComponentsRoutingModule { }
