import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Employee } from '../app/model/employee.interface';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  getEmployee(arg0: number) {
    throw new Error('Method not implemented.');
  }

  constructor() { }
  private  http = inject(HttpClient);


  private apiUrl = 'http://localhost:8081/Tres-Coronas-Bar/Bar/Site/Employee';


  
  create(employee: Employee): Observable<Employee> {
    return this.http.post<Employee>('http://localhost:8081/Tres-Coronas-Bar/Bar/Site/Employee', employee);
  }

  getBySiteId(siteId: number): Observable<Employee[]> {
    return this.http.get<Employee[]>(`${this.apiUrl}/by-site/${siteId}`);
  }

 
  
  list(){
    return this.http.get<Employee[]>(this.apiUrl);
  }

  delete (id:number ){
    return this.http.delete<void> (`${this.apiUrl}/${id}`).pipe(
      map(response => response)
    );

  }
 

}
