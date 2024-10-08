import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { OrdenesRoutingModule } from './ordenes-routing.module';
import { OrdenesComponent } from './ordenes.component';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { DropdownModule } from 'primeng/dropdown';
import { ToolbarModule } from 'primeng/toolbar';
import { ToastModule } from 'primeng/toast';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { InputNumberModule } from 'primeng/inputnumber';
import { DividerModule } from 'primeng/divider';

/* LAS IMPORTACIONES MANEJAN MODULOS */
/* EN LA DECLARATIONS: MANEJAN componentes*/
@NgModule({
    imports: [
    CommonModule,
    OrdenesRoutingModule,
    ButtonModule,
    FormsModule,
    InputTextModule,
    InputTextareaModule,
    DropdownModule,
    ToastModule,
    ToolbarModule,
    TableModule,
    DialogModule,
    AutoCompleteModule,
    InputNumberModule,
    DividerModule
],
    declarations: [OrdenesComponent]
})
export class OrdenesModule { }
