import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { BarService } from '../../services/bar-service.service';
import { EmployeeService } from '../../services/employee-service.service';
import { SiteService } from '../../services/site-services.service';
import { Bar } from '../model/bar.interface';
import { Employee } from '../model/employee.interface';
import { Site } from '../model/site.interface';

@Component({
  selector: 'app-empleado-form',
  templateUrl: './empleado-form.component.html',
  styleUrls: ['./empleado-form.component.css'],
  standalone:true,
  imports: [RouterModule, ReactiveFormsModule],
})
export default class EmpleadoFormComponent implements OnInit {

  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private fb = inject(FormBuilder);
  private siteService=inject(SiteService);
  private employeeService = inject(EmployeeService);
  private barService = inject(BarService);

  form: FormGroup|undefined;
  sites: Site[] = [];
  mysite!:Site;
  employe?:Employee;
  idSite:number| undefined=0;
  bar?:Bar;   
  site?: Site | undefined;
  employee?: Employee;

 
  ngOnInit(): void {
    this.loadSites();
    this.searchBar();
    

    this.form = this.fb.group({
      nameEmployee: ['', [Validators.required]],
      positionEmployee: ['', [Validators.required]],
      siteEmployee:[this.idSite,[Validators.required]]

    });
  }

  selectSite(site: Site | undefined): void {
    this.idSite=site!.idSite;
    this.mysite= site!;
    console.log(this.idSite);
    console.log(this.mysite);
    this.getSite();
  }

  getSite():void{
    this.siteService.getSiteById(this.idSite!).subscribe((site)=>{
          this.mysite = site;
    });
  }
  save(): void {
    const formEmployee = this.form!.value;
    console.log('Guardando');
    console.log(formEmployee.nameEmployee);
    console.log(formEmployee.positionEmployee);
    if (this.mysite && this.bar?.idBar) {
      const employeeForm: Employee = {
        idEmployee:0,
        nameEmployee: formEmployee.nameEmployee,
        positionEmployee: formEmployee.positionEmployee,
        hiringDateEmployee: new Date().toISOString(),
        site: {
          idSite: this.mysite.idSite,
          bar: {
            idBar: this.bar.idBar,
            nameBar: this.bar.nameBar,
            addressBar: this.bar.addressBar,
            locallyBar: this.bar.locallyBar
          }
        }
      };
    
      console.log(employeeForm);
      this.employeeService.create(employeeForm).subscribe(() => {
        this.router.navigate(['/']);
      });
    } else {
      console.error('Site or bar information is missing');
    }
  }
    

  loadSites(): void {
    this.siteService.list().subscribe(sites => {
      this.sites = sites;
      console.log(this.sites);
    });
  }

  

  searchBar(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      const idNumber = parseInt(id);
      this.barService.get(idNumber).subscribe(bar => {
        if (bar) {
          this.bar = bar;
          console.log('Bar encontrado:', bar);
        // Cargar los sitios después de obtener el bar
        } else {
          console.error('Bar no encontrado con el ID proporcionado');
        }
      });
    }
  }

  
  
}
