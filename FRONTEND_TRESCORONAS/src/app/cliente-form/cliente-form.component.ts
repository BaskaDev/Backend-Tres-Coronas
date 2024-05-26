import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink, RouterModule } from '@angular/router';
import { BarService } from '../../services/bar-service.service';
import { ClientService } from '../../services/client-service.service';
import { EmployeeService } from '../../services/employee-service.service';
import { GangService } from '../../services/gang-service.service';
import { SiteService } from '../../services/site-services.service';
import { Bar } from '../model/bar.interface';
import { Client } from '../model/client.interface';
import { Employee } from '../model/employee.interface';
import { Gang } from '../model/gang.interface';

@Component({
  selector: 'app-cliente-form',
  standalone: true,
  imports: [RouterModule,RouterLink,ReactiveFormsModule],
  templateUrl: './cliente-form.component.html',
  styleUrl: './cliente-form.component.css'
})
export default class  ClienteFormComponent implements OnInit{
  private gangService = inject(GangService);
  private employeeService = inject(EmployeeService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private fb = inject(FormBuilder);
  private siteService=inject(SiteService);
  private barService = inject(BarService);
  private clientService = inject(ClientService);

  idSite:number=0;
  employee? :Employee;
  siteGang? : Gang ;
  siteEmployees?:Employee[];
  siteBar?:Bar;
  form: FormGroup|undefined;
  status: string="";
  idStatus : number = 0;


  ngOnInit(): void {
    this.loadGang();
    this.loadEmployees();

      this.form = this.fb.group({
        nameClient: ['', [Validators.required]],
        userClient: ['', [Validators.required]],
        passClient:[this.idSite,[Validators.required]],
        killsClient:['',[Validators.required]],
        timesClient:['',[Validators.required]]
  
      });
    }
 
   

   loadGang():void{

    const id = this.route.snapshot.paramMap.get('id');
    if(id){
      const idNumber = parseInt(id);
      this.gangService.getBySiteId(idNumber).subscribe(gang => {
        if(gang){
          this.siteGang = gang;
          this.siteBar= {
            bar:0,
            idBar:gang.site.bar.idBar,
            nameBar:gang.site.bar.nameBar,
            addressBar:gang.site.bar.addressBar,
            locallyBar:gang.site.bar.locallyBar

          };
          console.log(this.siteBar);
          console.log(this.siteGang);
        }
      })
    }


    
  }

  loadEmployees():void{
    const id = this.route.snapshot.paramMap.get('id');

    if(id){
      const idNumber = parseInt(id);
      this.idSite=idNumber;
      this.employeeService.getBySiteId(idNumber).subscribe((employees)=>{
          this.siteEmployees=employees;

      })
    }
  }

  deleteEmploye(employee:Employee):void{

    this.employeeService.delete(employee.idEmployee).subscribe(()=>{
        this.loadEmployees();
    })
  }


  save(): void {
    const formClient = this.form!.value;
    console.log('Guardando');
    console.log(formClient.nameClient);
    console.log(formClient.userClient);
    console.log(formClient.passClient);
    console.log(formClient.killsClient);
    console.log(formClient.timesClient);

    if(formClient.killsClient == "Mata-siete"){
        this.status=formClient.killsClient;
        this.idStatus=1;
    }else if (formClient.timesClient == "Fast Pass"){
        this.status=formClient.timesClient;
        this.idStatus=2;
    }else{
      this.status="Normal"
      this.idStatus=3;
    }

    if (this.siteGang && this.siteBar?.idBar) {
    
      const clientForm: Client = {
        id_client:0,
        name_client: formClient.nameClient,
        user_client: formClient.userClient,
        pass_client: formClient.passClient,
        gang: {
            idGang: this.siteGang.idGang,
            nameGang: this.siteGang.nameGang,
            numberMembersGang: this.siteGang.numberMembersGang,
            site: {
                idSite: this.idSite,
                bar: {
                    idBar: this.siteBar.idBar,
                    nameBar: this.siteBar.nameBar,
                    addressBar: this.siteBar.addressBar,
                    locallyBar: this.siteBar.locallyBar
                }
            }
        },
        status_client: {
            id_status: this.idStatus,
            type_status: this.status
        }
    };
      console.log(clientForm);
      this.clientService.createClient(clientForm).subscribe((response) => {
        console.log('Client created:', response);
        this.router.navigate(['/']);

      });
    }
  }
    
    }
   
  



