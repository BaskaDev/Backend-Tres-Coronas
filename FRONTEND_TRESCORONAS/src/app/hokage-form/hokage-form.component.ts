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
  selector: 'app-hokage-form',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule],
  templateUrl: './hokage-form.component.html',
  styleUrl: './hokage-form.component.css'
})
export default class HokageFormComponent implements OnInit{

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
    this.getSite();

    this.form = this.fb.group({
      nameEmployee: ['', [Validators.required]],
      positionEmployee: ['', [Validators.required]],
      siteEmployee:[this.idSite,[Validators.required]]

    });
  }

 

  getSite():void{
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      const idNumber = parseInt(id);
      this.siteService.getSiteById(idNumber).subscribe((site)=>{
          this.mysite = site;
   
    });
  }else{
      
  }
  }
  save(): void {
    const formEmployee = this.form!.value;
    console.log('Guardando');
    console.log(formEmployee.nameEmployee);
    console.log(formEmployee.positionEmployee);

      const employeeForm: Employee = {
        idEmployee:0,
        nameEmployee: formEmployee.nameEmployee,
        positionEmployee: formEmployee.positionEmployee,
        hiringDateEmployee: new Date().toISOString(),
        site: {
          idSite: this.mysite.idSite,
          bar: {
            idBar: this.mysite.bar.idBar,
            nameBar: this.mysite.bar.nameBar,
            addressBar: this.mysite.bar.addressBar,
            locallyBar: this.mysite.bar.locallyBar
          }
        }
      };
    
      console.log(employeeForm);
      this.employeeService.create(employeeForm).subscribe(() => {
        this.router.navigate(['/']);
      });
   
  }
    


  

  
    
}
