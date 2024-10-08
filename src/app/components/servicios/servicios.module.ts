import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { ServiciosRoutingModule } from './servicios-routing.module';
import { ServiciosComponent } from './servicios.component';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { DropdownModule } from 'primeng/dropdown';
import { ToolbarModule } from 'primeng/toolbar';
import { ToastModule } from 'primeng/toast';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { InputNumberModule } from 'primeng/inputnumber';


/* LAS IMPORTACIONES MANEJAN MODULOS */
/* EN LA DECLARATIONS: MANEJAN componentes*/
@NgModule({
    imports: [
    CommonModule,
    ServiciosRoutingModule,
    ButtonModule,
    FormsModule,
    InputTextModule,
    InputTextareaModule,
    DropdownModule,
    ToastModule,
    ToolbarModule,
    TableModule,
    DialogModule,
    InputNumberModule
],
    declarations: [ServiciosComponent]
})
export class ServiciosModule { }
