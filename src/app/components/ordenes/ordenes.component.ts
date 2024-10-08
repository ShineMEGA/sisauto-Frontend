import { Component, OnInit, ViewChild, ElementRef,ChangeDetectorRef  } from '@angular/core';
import { PieControllerDatasetOptions } from 'chart.js';
import { Ordenes } from 'src/app/models/ordenes.model';
import { PaisesService } from 'src/app/service/paises.service';
import { OrdenesService } from 'src/app/service/ordenes.service';
import { MessageService } from 'primeng/api';
import { ClientesService } from 'src/app/service/clientes.service';
import { Clientes } from 'src/app/models/cliente.model';
import { Servicios } from 'src/app/models/servicio.model';
import { ServiciosService } from 'src/app/service/servicios.service';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { DetalleOrdenes } from 'src/app/models/DetalleOrdenes.model';
import { compileNgModule } from '@angular/compiler';

interface AutoCompleteCompleteEvent {
  originalEvent: Event;
  query: string;
}
@Component({
  selector: 'app-orden',
  templateUrl: './ordenes.component.html',
  providers:[MessageService]
})
/* se debe implentar el momento en donde se va cargar la inf en este caso es el onInit
*  podria dar error en OrdenesComponent pero solo es implementar la clase ' ngOnInit(): void {'
*/
export class OrdenesComponent implements OnInit { 
  titulo="Ordenes";
  orden = new Ordenes();
  ordenFinal: any;
  cliente = new Clientes();
  servicio = new Servicios();
  detalleOrdenes: DetalleOrdenes[]=[];

  ordenes: Ordenes[]=[];
  clientes: Clientes[]=[];
  servicios: Servicios[]=[];

  cols: any[] = [];
  statuses: any[] = [];
  rowsPerPageOptions = [5, 10, 20];


  ordenesDialog: boolean = false;
  submitted: boolean = false;
  eliminarOrdenDialog: boolean = false;

  //auto complatado
  selectedCliente: any;
  selectedServicio: any;
  clientesFiltrados: any[] | undefined;
  serviciosFiltrados: any[] | undefined;

  // guardado
  ordenJSON: string;
  ordenList : any;

  //subtotales y total
  subtotal:number = 0;
  total: number = 0; // El total acumulado
  cantidad: number = 0; // Valor de cantidad

  isFormValid: boolean = false; // Indicador de validez del formulario

  // Función para verificar si todos los campos están completos
  validarFormulario() {
    //this.isFormValid = !!this.selectedCliente.value.clienteID && !!this.selectedServicio.value.servicioID && this.cantidad > 0;
    this.isFormValid = !!this.selectedCliente && !!this.selectedServicio && this.cantidad > 0;
  }

  @ViewChild('cantidadInput') cantidadInput!: ElementRef;

  constructor(
    private cdr: ChangeDetectorRef,
    private _ordenesService: OrdenesService,
    private _messageService: MessageService,
    private _clientesService: ClientesService,
    private _serviciosService: ServiciosService,
  ) {
}
ngAfterViewInit() {
  // Si haces algún cambio aquí que cause el error, puedes forzar la detección de cambios
  this.cdr.detectChanges(); // Forzar la detección de cambios manualmente
}
  ngOnInit(): void {
    this.fordenes();
  }
// obtiene el listado de ordenes
  fordenes(){
    this._ordenesService.obtenerOrdenes().subscribe(dato =>{
      this.ordenes = dato;
    })
  }
  fclientes(){
    this._clientesService.obtenerClientes().subscribe(dato =>{
      this.clientes = dato;
    })
  }

  fservicios(){
    this._serviciosService.obtenerServicios().subscribe(dato =>{
      this.servicios = dato;
    })
  }

  enviarDatos(){ 
    if(this.detalleOrdenes){
      this.generaJsonOrden();
      this._ordenesService.guardaOrdenes(this.ordenFinal).subscribe(dato => {
        dato.cliente=this.selectedCliente;
        this.orden= dato;
        this.ordenes.push(this.orden);
        this._messageService.add({ severity: 'success', summary: 'Correcto', detail: 'Orden añadido', life: 3000 });
        this.cleanObjectCli();
      })
    this.ordenes = [...this.ordenes];
    this.hideDialog();

    }

  }
  
  findIndexById(id: number): number {
    let index = -1;
    for (let i = 0; i < this.ordenes.length; i++) {
        if (this.ordenes[i].ordenID === id) {
            index = i;
            break;
        }
    }

    return index;
}

  cleanObjectCli() {
    this.orden = new Ordenes();  // Restablecer el objeto orden a su estado inicial
    this.detalleOrdenes = [];
    this.selectedCliente = "";
    this.selectedServicio = "";
    this.total=0
    this.resetFormulario();
  }

  abrirDialog() {
    this.cleanObjectCli();
    this.fclientes();
    this.fservicios();
    this.submitted = false;
    this.ordenesDialog = true;
  }

  hideDialog() {
    //this.cleanObjectCli();
    this.ordenesDialog = false;
    this.submitted = false;
  }

  deleteOrden(ordenDel: Ordenes) {
    this.orden = {...ordenDel};
    this.eliminarOrdenDialog = true;
  }
  editOrden(ordenUp: Ordenes) {
    this.orden = { ...ordenUp };
    this.ordenesDialog = true
  }

  confirmDelete(){
    this.eliminarOrdenDialog = false;
    this._ordenesService.eliminarOrden(this.orden.ordenID).subscribe(response => {
      if (response.message === "Deleted") {
        // Elimina el orden de la lista local
        this.ordenes = this.ordenes.filter(orden => orden.ordenID !== this.orden.ordenID);      
        this._messageService.add({ severity: 'success', summary: 'Exito!', detail: 'Orden Borrado', life: 3000 });
      }
    }, error => {
      console.error("Error eliminando orden:", error);
    });
  }

  
  // Filtrar clientes basado en la búsqueda
  searchClientes(event: AutoCompleteCompleteEvent) {
    const query = event.query.toLowerCase(); // Texto ingresado por el usuario
    this.clientesFiltrados = this.clientes.filter(cliente =>
      cliente.nombre.toLowerCase().includes(query)
    );
  }

    // Filtrar clientes basado en la búsqueda
    searchServicios(event: AutoCompleteCompleteEvent) {
      const query = event.query.toLowerCase(); // Texto ingresado por el usuario
      this.serviciosFiltrados = this.servicios.filter(servicio =>
        servicio.nombreServicio.toLowerCase().includes(query)
      );
    }
    

    calcularCantidad(cantidad,costo){
      if (cantidad && costo){
        this.cantidad= cantidad;
        this.subtotal= Number(cantidad) * costo;
      }
    }

    anadirDetalle() {
      if (this.isFormValid) {
            // Verifica que servicio y cantidad tengan valores válidos
        if (this.selectedServicio && this.cantidadInput.nativeElement.value) {
            const nuevoDetalle = {
                servicioID: this.selectedServicio.servicioID,  // ID correcto
                cantidad: Number(this.cantidad), // Convierte a número
                subtotal: this.subtotal, //calculado previamente
                nombreServicio: this.selectedServicio.nombreServicio
            };
    
            this.detalleOrdenes.push(nuevoDetalle); // Añade el nuevo detalle al array
            this.total += nuevoDetalle.subtotal;
            this.resetFormulario();
          
        } else {
            // Manejo de errores si es necesario
            console.error('Por favor, selecciona un servicio y proporciona una cantidad.');
        }
      } 
  }
    // Resetear el formulario después de añadir el detalle
    resetFormulario() {
      // Opcional: Limpiar los campos después de agregar
      this.selectedServicio = ""; // Resetea el servicio
      this.cantidadInput.nativeElement.value = ''; // Resetea la cantidad
      this.cantidad = 0;
      this.subtotal = 0; // Resetea el subtotal
      this.isFormValid = false;
      this.cdr.detectChanges(); // Detecta cambios después de eliminar
    }
    
    eliminarDetalle(i : number){
    // Restar el subtotal del detalle eliminado
    this.total -= this.detalleOrdenes[i].subtotal;

    this.detalleOrdenes.splice(i,1);
    this.cdr.detectChanges(); // Detecta cambios después de eliminar
  }
   // Evento que se dispara cuando se selecciona un cliente
   onClienteSelect(event: any) {
    this.selectedCliente = event;
    console.log('Cliente seleccionado:', this.selectedCliente);
  }
  onServicioSelect(event: any) {
    this.selectedServicio = event;
    console.log('Servicio seleccionado:', this.selectedServicio);
  }
  generaJsonOrden(){
    const orden = {
      clienteID: this.selectedCliente.clienteID,
      fecha: new Date(Date.now()).toISOString(), // Formato ISO 8601
      detalleOrdenes: this.detalleOrdenes,
      total: 0
    };
      orden.detalleOrdenes.forEach(detalle => {
        delete detalle.nombreServicio; // Eliminar la propiedad nombreServicio
      });
      // Calcular total sumando los subtotales
      orden.total = orden.detalleOrdenes.reduce((acc, detalle) => acc + detalle.subtotal, 0);

      this.ordenFinal = orden;
      const ordenPush ={
        cliente: this.selectedCliente,
        detalleOrdenes: this.detalleOrdenes,
        ordenID:0,
        fecha : this.ordenFinal.fecha,
        total : this.ordenFinal.total
      }
      this.ordenList =ordenPush;
  }
}