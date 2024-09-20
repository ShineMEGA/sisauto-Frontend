import { Component, OnInit } from '@angular/core';
import { PieControllerDatasetOptions } from 'chart.js';
import { Clientes } from 'src/app/models/cliente.model';
import { Paises } from 'src/app/models/paises.model';
import { PaisesService } from 'src/app/service/paises.service';
import { ClientesService } from 'src/app/service/clientes.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-cliente',
  templateUrl: './clientes.component.html',
  providers:[MessageService]
})
/* se debe implentar el momento en donde se va cargar la inf en este caso es el onInit
*  podria dar error en ClientesComponent pero solo es implementar la clase ' ngOnInit(): void {'
*/
export class ClientesComponent implements OnInit { 
  titulo="Clientes";
  cliente = new Clientes();
  // Declara que 'paises' es un array de objetos 'Paises' y lo inicializa como un array vacío.
  paises: Paises[]=[];
  clientes: Clientes[]=[];


  cols: any[] = [];
  statuses: any[] = [];
  rowsPerPageOptions = [5, 10, 20];
  selectedProducts: Clientes[] = [];


  clientesDialog: boolean = false;
  submitted: boolean = false;
  eliminarClienteDialog: boolean = false;

  


  constructor(
    private _paisesService: PaisesService,
    private _clientesService: ClientesService,
    private _messageService: MessageService,
  ) {
}
  ngOnInit(): void {
    this.fpaises();
    this.fclientes();
  }
  
  /*Agregar función que obtiene el listado de Paises para mandarla llamar desde el ngOnInit()*/
  fpaises(){
    this._paisesService.obtenerPaises().subscribe(dato =>{
      this.paises = dato;
    })
  }

  fclientes(){
    this._clientesService.obtenerClientes().subscribe(dato =>{
      this.clientes = dato;
    })
  }

  enviarDatos(){ 
    //Editar
    if (this.cliente.clienteID) { 
      this._clientesService.actualizaCliente(this.cliente).subscribe( dato => {
        this.cliente = dato;
        this.clientes[this.findIndexById(this.cliente.clienteID)] = this.cliente;
        this._messageService.add({ severity: 'success', summary: 'Correcto', detail: 'Cliente Actualizado', life: 3000 });
      })
      
    } else { // Nuevo
      console.log(this.cliente);
      this._clientesService.guardaClientes(this.cliente).subscribe(dato => {
        this.cliente= dato;
        this.clientes.push(this.cliente);
        this._messageService.add({ severity: 'success', summary: 'Correcto', detail: 'Cliente añadido', life: 3000 });
      })
    }
    this.clientes = [...this.clientes];
    this.hideDialog();
  }
  
  findIndexById(id: number): number {
    let index = -1;
    for (let i = 0; i < this.clientes.length; i++) {
        if (this.clientes[i].clienteID === id) {
            index = i;
            break;
        }
    }

    return index;
}

  cleanObjectCli() {
    this.cliente = new Clientes();  // Restablecer el objeto cliente a su estado inicial
  }

  abrirDialog() {
    this.cleanObjectCli();
    this.submitted = false;
    this.clientesDialog = true;
  }

  hideDialog() {
    this.cleanObjectCli();
    this.clientesDialog = false;
    this.submitted = false;
  }

  deleteCliente(clienteDel: Clientes) {
    this.cliente = {...clienteDel};
    this.eliminarClienteDialog = true;
  }
  editCliente(clienteUp: Clientes) {
    this.cliente = { ...clienteUp };
    this.clientesDialog = true
  }

  confirmDelete(){
    this.eliminarClienteDialog = false;
    this._clientesService.eliminarCliente(this.cliente.clienteID).subscribe(response => {
      if (response.message === "Deleted") {
        // Elimina el cliente de la lista local
        this.clientes = this.clientes.filter(cliente => cliente.clienteID !== this.cliente.clienteID);      
        this._messageService.add({ severity: 'success', summary: 'Exito!', detail: 'Cliente Borrado', life: 3000 });
      }
    }, error => {
      console.error("Error eliminando cliente:", error);
    });
  }

  



}