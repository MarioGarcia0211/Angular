import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Reserva } from 'src/app/shared/models/reserva';

@Injectable({
  providedIn: 'root'
})
export class ReservaService {

  reservaApiUrl = 'http://localhost:3000/reservas';


  constructor(private http: HttpClient) { }

  getReserva(): Observable<Reserva[]>{
    return this.http.get<Reserva[]>(this.reservaApiUrl);
  }

  agregarReserva(element: Reserva): Observable<Reserva>{
    return this.http.post<Reserva>(this.reservaApiUrl, element);
  }

  editarReserva(element: Reserva, id : number): Observable<Reserva> {
    return this.http.put<Reserva>(this.reservaApiUrl+"/"+id, element);
  }

  eliminarReserva(id: number): Observable<Reserva> {
    return this.http.delete<any>(this.reservaApiUrl+"/"+id);
  }
}
