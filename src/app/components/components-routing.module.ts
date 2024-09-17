import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';




@NgModule({
  imports: [ RouterModule.forChild([
     {path: 'formulario', loadChildren: () => import('./formulario/formulario.module').then(m=>m.FormularioModule) }
  ])
    
  ]
})
export class ComponentsRoutingModule { }
