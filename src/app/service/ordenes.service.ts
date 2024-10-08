import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Ordenes } from '../models/ordenes.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrdenesService {
  ruta=`${environment.rutaBackend}/Ordenes`;
  constructor(private _httpClient: HttpClient) { }
  
  obtenerOrdenes() : Observable<Ordenes[]> {
    return this._httpClient.get<Ordenes[]>(this.ruta);
  }
  
  guardaOrdenes(orden:Ordenes): Observable<any> {
    return this._httpClient.post<void>(this.ruta, orden);
  }

  actualizaOrden(orden: Ordenes): Observable<any> {
    return this._httpClient.put<void>(this.ruta + '/' + orden.ordenID, orden);
  }
  

  eliminarOrden(id: number): Observable<{ message: string }> {
    return this._httpClient.delete<{ message: string }>(this.ruta + '/' + id);
  }
  
}
