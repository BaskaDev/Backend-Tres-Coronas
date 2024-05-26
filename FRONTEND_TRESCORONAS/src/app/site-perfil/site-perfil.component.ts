import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, RouterLink, RouterModule } from '@angular/router';
import { ClientService } from '../../services/client-service.service';
import { EmployeeService } from '../../services/employee-service.service';
import { GangService } from '../../services/gang-service.service';
import { ProductService } from '../../services/product-service.service';
import { Bar } from '../model/bar.interface';
import { Client } from '../model/client.interface';
import { Employee } from '../model/employee.interface';
import { Gang } from '../model/gang.interface';
import { Product } from '../model/product.interface';

@Component({
  selector: 'app-site-perfil',
  standalone: true,
  imports: [RouterModule,RouterLink],
  templateUrl: './site-perfil.component.html',
  styleUrl: './site-perfil.component.css'
})
export default class SitePerfilComponent implements OnInit {

  private gangService = inject(GangService);
  private employeeService = inject(EmployeeService);
  private clienteService = inject(ClientService);
  private route = inject(ActivatedRoute);
  private productService = inject (ProductService);

  idSite:number=0;
  employee? :Employee;
  siteGang? : Gang ;
  siteEmployees?:Employee[];
  siteBar?:Bar;
  client ?: Client;
  siteClients?: Client[];
  product? : Product;
  siteProducts?:Product[];

  ngOnInit(): void {
   this.loadGang();
   this.loadEmployees();
   this.loadClients();
   this.loadProducts();
  }

  loadGang():void{

    const id = this.route.snapshot.paramMap.get('id');
    if(id){
      const idNumber = parseInt(id);
      this.gangService.getBySiteId(idNumber).subscribe(gang => {
        if(gang){
          this.siteGang = gang;
          console.log(this.siteGang);
        }
      })
    }


    
  }


  loadProducts():void{
    this.productService.getAllProducts().subscribe((products)=>{
        this.siteProducts=products;
    })
  }

  loadClients():void{
    const id = this.route.snapshot.paramMap.get('id');
    if(id){
      const idNumber = parseInt(id);
    this.clienteService.getAllByGang(idNumber).subscribe((clients)=>{
      this.siteClients=clients;
      console.log(this.siteClients);
    });
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



}
