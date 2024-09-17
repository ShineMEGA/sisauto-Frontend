import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { FormularioRoutingModule } from './formulario-routing.module';
import { FormularioComponent } from './formulario.component';
import { TituloComponent } from './titulo/titulo.component';
import { BotonComponent } from "./boton/boton.component";
import { FormsModule } from '@angular/forms';

/* LAS IMPORTACIONES MANEJAN MODULOS */
/* EN LA DECLARATIONS: MANEJAN componentes*/
@NgModule({
    imports: [
    CommonModule,
    FormularioRoutingModule,
    ButtonModule,
    BotonComponent,
    FormsModule
],
    declarations: [FormularioComponent,TituloComponent]
})
export class FormularioModule { }
