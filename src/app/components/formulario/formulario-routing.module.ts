import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormularioComponent } from './formulario.component';


@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: FormularioComponent }
    ])],
    exports: [RouterModule]
})
export class FormularioRoutingModule { 
   
}
