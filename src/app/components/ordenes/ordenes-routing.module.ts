import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { OrdenesComponent } from './ordenes.component';





@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: OrdenesComponent }
    ])],
    exports: [RouterModule]
})
export class OrdenesRoutingModule { 
   
}
