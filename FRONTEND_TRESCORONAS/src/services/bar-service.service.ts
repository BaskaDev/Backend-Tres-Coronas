import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Bar } from '../app/model/bar.interface';

@Injectable({
  providedIn: 'root'
})
export class BarService {
  getBar(arg0: number) {
    throw new Error('Method not implemented.');
  }

  constructor() { }
  private  http = inject(HttpClient);


  private apiUrl = 'http://localhost:8081/Tres-Coronas-Bar/Bar';

  

  list (){
    return this.http.get<Bar[]>('http://localhost:8081/Tres-Coronas-Bar/Bar');
  }

  get(id: number): Observable<Bar> {
    return this.http.get<{ bar: Bar }>(`${this.apiUrl}/${id}`).pipe(
      map(response => response.bar)
    );
  }

  create (bar : Bar){
    return this.http.post<Bar>('http://localhost:8081/Tres-Coronas-Bar/Bar',bar);
  }


  update (id:number , bar : Bar){
    return this.http.put<Bar>(`${this.apiUrl}/${id}`,bar).pipe(
      map(response => response.bar)
    );
    


  }

  deleteBar(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`, { observe: 'response' });
  }
  

  
  

  
}
