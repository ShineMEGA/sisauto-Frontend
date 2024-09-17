import { Component, OnInit } from '@angular/core';
import { Paises } from 'src/app/models/paises.model';
import { PaisesService } from 'src/app/service/paises.service';

@Component({
  selector: 'app-cliente',
  templateUrl: './clientes.component.html'
})
/* se debe implentar el momento en donde se va cargar la inf en este caso es el onInit
*  podria dar error en ClientesComponent pero solo es implementar la clase ' ngOnInit(): void {'
*/
export class ClientesComponent implements OnInit { 
  titulo="Clientes";
  paises: Paises[];

  /**
   *
   */
  constructor(private _paisesService: PaisesService) {
    
  }
  ngOnInit(): void {
    this.fpaises();
  }
  
  /**
   * se debe crear una funcion para poder realziar la llamada
   */
  fpaises(){
    this._paisesService.obtenerPaises().subscribe(dato =>{
      this.paises = dato;
    })
  }
}
