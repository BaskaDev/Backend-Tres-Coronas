import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink, RouterModule } from '@angular/router';
import { BarService } from '../../services/bar-service.service';
import { EmployeeService } from '../../services/employee-service.service';
import { SiteService } from '../../services/site-services.service';
import { Bar } from '../model/bar.interface';
import { Employee } from '../model/employee.interface';
import { Gang } from '../model/gang.interface';
import { Site } from '../model/site.interface';

@Component({
  selector: 'app-bar-perfil',
  standalone: true,
  imports: [RouterModule,RouterLink],
  templateUrl: './bar-perfil.component.html',
  styleUrls: ['./bar-perfil.component.css']
})
export default class BarPerfilComponent implements OnInit {
  
  private fb = inject(FormBuilder);
  private barService = inject(BarService);
  private employeeService = inject(EmployeeService);
  private siteService = inject(SiteService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  bar?: Bar;
  form: FormGroup | undefined;
  site?: Site;
  employee?: Employee;
  gang?: Gang;

  gangs : Gang[] = [];
  employees: Employee[] = [];
  sites: Site[] = [];

  ngOnInit(): void {
    this.searchBar();
    this.searchEmployees();

  }

  searchBar(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      const idNumber = parseInt(id);
      this.barService.get(idNumber).subscribe(bar => {
        if (bar) {
          this.bar = bar;
          console.log('Bar encontrado:', bar);
          this.loadSitesByBarId(bar.idBar); // Cargar los sitios después de obtener el bar
        } else {
          console.error('Bar no encontrado con el ID proporcionado');
        }
      });
    }
  }


 searchEmployees():void{
  this.employeeService.list().subscribe((employeesList )=>{
      this.employees = employeesList;
      console.log(this.employees);
  });
 }

  loadSitesByBarId(barId: number): void {
    this.siteService.listByBarId(barId).subscribe(sites => {
      this.sites = sites;
      console.log(this.sites);
    });
  }


  deleteSite(site: Site): void {
    const siteId = site.idSite;
    this.siteService.delete(siteId!).subscribe(() => {
      console.log('Site was eliminated');
      this.loadSitesByBarId(this.bar!.idBar); // Recargar la lista de sitios después de eliminar uno
    });
  }

  addSite(): void {
    const datos = {
      bar: {
        idBar: this.bar?.idBar,
        nameBar: this.bar?.nameBar,
        addressBar: this.bar?.addressBar,
        locallyBar: this.bar?.locallyBar
      }
    };

    this.siteService.crearSitio(datos).subscribe(
      response => {
        this.loadSitesByBarId(this.bar!.idBar); // Recargar la lista de sitios después de agregar uno nuevo
        console.log('El sitio se ha creado correctamente:', response);
      },
      error => {
        console.error('Error al crear el sitio:', error);
      }
    );
  }
}
