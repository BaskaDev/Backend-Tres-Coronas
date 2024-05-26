import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { Observable, map } from "rxjs";
import { Site } from "../app/model/site.interface";

@Injectable({
    providedIn: 'root'
  })
  export class SiteService {
    getBar(arg0: number) {
      throw new Error('Method not implemented.');
    }

    constructor() { }
    private  http = inject(HttpClient);
  
    private apiUrl = 'http://localhost:8081/Tres-Coronas-Bar/Bar/Site';

   

    create(site: Site): Observable<Site> {
      return this.http.post<Site>(this.apiUrl, site);
    }

    crearSitio(datos: any): Observable<any> {
      return this.http.post<any>(this.apiUrl, datos);
    }


    list(): Observable<Site[]> {
      return this.http.get<Site[]>(this.apiUrl);
    }

    listByBarId(barId: number): Observable<Site[]> {
      return this.http.get<Site[]>(`${this.apiUrl}/ByBar/${barId}`);
    }

  
    getSiteById(idSite: number): Observable<any> {
      return this.http.get(`${this.apiUrl}/${idSite}`);
    }


    delete (id:number ){
      return this.http.delete<void> (`${this.apiUrl}/${id}`).pipe(
        map(response => response)
      );
  
    }


}