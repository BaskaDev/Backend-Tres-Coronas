import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Gang } from '../app/model/gang.interface';

@Injectable({
  providedIn: 'root'
})
export class GangService {
  getGang(arg0: number) {
    throw new Error('Method not implemented.');
  }

  constructor() { }
  private  http = inject(HttpClient);


  private apiUrl = 'http://localhost:8081/Tres-Coronas-Bar/Bar/Site/Gang';


  create(gang: Gang): Observable<Gang> {
    return this.http.post<Gang>('http://localhost:8081/Tres-Coronas-Bar/Bar/Site/Gang', gang);
  }

  list(){
    return this.http.get<Gang[]> (this.apiUrl);
  }

  getBySiteId(idSite: number) {
    return this.http.get<Gang>(`http://localhost:8081/Tres-Coronas-Bar/Bar/Site/Gang/site/${idSite}`);
}


}