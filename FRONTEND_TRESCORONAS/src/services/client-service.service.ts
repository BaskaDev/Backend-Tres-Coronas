import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Client } from '../app/model/client.interface';
 // Asegúrate de tener una interfaz 'Client' definida

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  private apiUrl = 'http://localhost:8081/Tres-Coronas-Bar/Bar/Site/Gang/Client'; // URL de tu API

  constructor(private http: HttpClient) { }

  // Obtener todos los clientes
  getClients(): Observable<Client[]> {
    return this.http.get<Client[]>(this.apiUrl);
  }

  // Obtener un cliente por ID
  getClientById(id: number): Observable<Client> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Client>(url);
  }

  // Crear un nuevo cliente
  createClient(client: Client): Observable<Client> {
    return this.http.post<Client>(this.apiUrl, client, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    });
  }

  // Actualizar un cliente existente
  updateClient(id: number, client: Client): Observable<Client> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put<Client>(url, client, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    });
  }

  // Eliminar un cliente por ID
  deleteClient(id: number): Observable<Client> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<Client>(url, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    });
  }




  getAllByGang(id:number){
    const url = `${this.apiUrl}/ByGang/${id}`;
    return this.http.get<Client[]>(url);
  }
}
