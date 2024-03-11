import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Tarjeta } from '../interface/tarjeta';

@Injectable({
  providedIn: 'root'
})
export class TarjetaService {
  private urlBF = "http://localhost:5209/"
  private urlAPI= "api/tarjeta/"

  constructor(private http: HttpClient) {

  }

  //Metodo para obtener listado de tarjetas
  getListCards(): Observable <any>{
    return this.http.get(this.urlBF + this.urlAPI);
  }

  //Metodo para eliminar tarjeta por ID
  deleteCard(id: any): Observable <any>{
    return this.http.delete( this.urlBF + this.urlAPI + id);
  }

  //Metodo para agregar una nueva tarjeta
  saveTarjeta(tarjeta: any): Observable <any>{
    return this.http.post(this.urlBF + this.urlAPI, tarjeta);
  }

  //Metodo para actualizar una tarjeta por ID
  updateTarjeta(id: number, tarjeta: any): Observable <any>{
    return this.http.put(this.urlBF + this.urlAPI + id, tarjeta);
  }
}
