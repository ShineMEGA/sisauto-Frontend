import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Clientes } from '../models/cliente.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {
  ruta=`${environment.rutaBackend}/Clientes`;
  constructor(private _httpClient: HttpClient) { }
  
  obtenerClientes() : Observable<Clientes[]> {
    return this._httpClient.get<Clientes[]>(this.ruta);
  }
  
  guardaClientes(cliente:Clientes): Observable<any> {
    return this._httpClient.post<void>(this.ruta, cliente);
  }

  actualizaCliente(cliente: Clientes): Observable<any> {
    return this._httpClient.put<void>(this.ruta + '/' + cliente.clienteID, cliente);
  }
  

  eliminarCliente(id: number): Observable<{ message: string }> {
    return this._httpClient.delete<{ message: string }>(this.ruta + '/' + id);
  }
  
}
