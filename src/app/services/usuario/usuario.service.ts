import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from 'src/app/shared/models/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  usuarioApiUrl = 'http://localhost:3000/usuarios';


  constructor(private http: HttpClient) { }

  getUsuario(): Observable<Usuario[]>{
    return this.http.get<Usuario[]>(this.usuarioApiUrl);
  }

  agregarUsuario(element: Usuario): Observable<Usuario>{
    return this.http.post<Usuario>(this.usuarioApiUrl, element);
  }

  editarUsuario(element: Usuario, id : number): Observable<Usuario> {
    return this.http.put<Usuario>(this.usuarioApiUrl+"/"+id, element);
  }

  eliminarUsuario(id: number): Observable<Usuario> {
    return this.http.delete<any>(this.usuarioApiUrl+"/"+id);
  }
}
