import { Component, OnInit } from '@angular/core';
import { PieControllerDatasetOptions } from 'chart.js';
import { Servicios } from 'src/app/models/servicio.model';
import { ServiciosService } from 'src/app/service/servicios.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-servicio',
  templateUrl: './servicios.component.html',
  providers:[MessageService]
})
/* se debe implentar el momento en donde se va cargar la inf en este caso es el onInit
*  podria dar error en ServiciosComponent pero solo es implementar la clase ' ngOnInit(): void {'
*/
export class ServiciosComponent implements OnInit { 
  titulo="Servicios";
  servicio = new Servicios();
  servicios: Servicios[]=[];


  cols: any[] = [];
  statuses: any[] = [];
  rowsPerPageOptions = [5, 10, 20];
  selectedProducts: Servicios[] = [];


  serviciosDialog: boolean = false;
  submitted: boolean = false;
  eliminarServicioDialog: boolean = false;

  


  constructor(
    private _serviciosService: ServiciosService,
    private _messageService: MessageService,
  ) {
}
  ngOnInit(): void {
    this.fservicios();
  }

  fservicios(){
    this._serviciosService.obtenerServicios().subscribe(dato =>{
      this.servicios = dato;
    })
  }

  enviarDatos(){ 
    //Editar
    if (this.servicio.servicioID) { 
      this._serviciosService.actualizaServicio(this.servicio).subscribe( dato => {
        this.servicio = dato;
        this.servicios[this.findIndexById(this.servicio.servicioID)] = this.servicio;
        this._messageService.add({ severity: 'success', summary: 'Correcto', detail: 'Servicio Actualizado', life: 3000 });
      })
      
    } else { // Nuevo
      console.log(this.servicio);
      this._serviciosService.guardaServicios(this.servicio).subscribe(dato => {
        this.servicio= dato;
        this.servicios.push(this.servicio);
        this._messageService.add({ severity: 'success', summary: 'Correcto', detail: 'Servicio añadido', life: 3000 });
      })
    }
    this.servicios = [...this.servicios];
    this.hideDialog();
  }
  
  findIndexById(id: number): number {
    let index = -1;
    for (let i = 0; i < this.servicios.length; i++) {
        if (this.servicios[i].servicioID === id) {
            index = i;
            break;
        }
    }

    return index;
}

  cleanObjectCli() {
    this.servicio = new Servicios();  // Restablecer el objeto servicio a su estado inicial
  }

  abrirDialog() {
    this.cleanObjectCli();
    this.submitted = false;
    this.serviciosDialog = true;
  }

  hideDialog() {
    this.cleanObjectCli();
    this.serviciosDialog = false;
    this.submitted = false;
  }

  deleteServicio(servicioDel: Servicios) {
    this.servicio = {...servicioDel};
    this.eliminarServicioDialog = true;
  }
  editServicio(servicioUp: Servicios) {
    this.servicio = { ...servicioUp };
    this.serviciosDialog = true
  }

  confirmDelete(){
    this.eliminarServicioDialog = false;
    this._serviciosService.eliminarServicio(this.servicio.servicioID).subscribe(response => {
      if (response.message === "Deleted") {
        // Elimina el servicio de la lista local
        this.servicios = this.servicios.filter(servicio => servicio.servicioID !== this.servicio.servicioID);      
        this._messageService.add({ severity: 'success', summary: 'Exito!', detail: 'Servicio Borrado', life: 3000 });
      }
    }, error => {
      console.error("Error eliminando servicio:", error);
    });
  }

  



}