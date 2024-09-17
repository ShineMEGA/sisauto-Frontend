import { Component } from '@angular/core';
import { Contacto } from 'src/app/modelo/contacto.model';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
})
export class FormularioComponent {
  nombre: string = '';
  correo: string = '';
  telefono: string = '';
  //contactos: {nombre: string, correo: string, telefono: string}[] = []; // Cambié a un array de objetos
  contactos: Contacto[]=[]; // Utiliza la interfaz Contacto

  adicionar() {
    let nuevoContacto = {
      nombre: this.nombre,
      correo: this.correo,
      telefono: this.telefono
    };
    this.contactos.push(nuevoContacto); // Añadimos un objeto en lugar de un array
    this.nombre = '';
    this.correo = '';
    this.telefono = '';
  }
}
