import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Servicios } from '../models/servicio.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ServiciosService {
  ruta=`${environment.rutaBackend}/Servicios`;
  constructor(private _httpClient: HttpClient) { }
  
  obtenerServicios() : Observable<Servicios[]> {
    return this._httpClient.get<Servicios[]>(this.ruta);
  }
  
  guardaServicios(servicio:Servicios): Observable<any> {
    return this._httpClient.post<void>(this.ruta, servicio);
  }

  actualizaServicio(servicio: Servicios): Observable<any> {
    return this._httpClient.put<void>(this.ruta + '/' + servicio.servicioID, servicio);
  }
  

  eliminarServicio(id: number): Observable<{ message: string }> {
    return this._httpClient.delete<{ message: string }>(this.ruta + '/' + id);
  }
  
}
