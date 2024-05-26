import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { BarService } from '../../services/bar-service.service';
import { GangService } from '../../services/gang-service.service';
import { SiteService } from '../../services/site-services.service';
import { Bar } from '../model/bar.interface';
import { Gang } from '../model/gang.interface';
import { Site } from '../model/site.interface';

@Component({
  selector: 'app-pandilla-form',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule],
  templateUrl: './pandilla-form.component.html',
  styleUrl: './pandilla-form.component.css'
})
export default class PandillaFormComponent implements OnInit {


  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private fb = inject(FormBuilder);
  private siteService=inject(SiteService);
  private gangService = inject(GangService);
  private barService = inject(BarService);


  form: FormGroup|undefined;
  haveGang : boolean=false;
  idSite:number=0;
  gangs : Gang[] = [];
  gang?:Gang;
  mysite?:Site;
  locally:string="";
  sites :Site[] = [];
  bar?:Bar;

  ngOnInit(): void {
    this.loadSites();
    this.verifySite();
    this.searchBar();
    this.loadGangs();

    console.log(this.locally);
    this.form = this.fb.group({
      nameGang: ['', [Validators.required]],
      membersGang: ['', [Validators.required]],
      locallyGang:[this.locally,[Validators.required]],
      siteGang:[this.mysite?.idSite,[Validators.required]]

    });
  }


  loadGangs():void {
      this.gangService.list().subscribe((gang)=>{
          this.gangs = gang;
          console.log(this.gangs);


      })
  }


  selectSite(site: Site | undefined): void {
  
    this.mysite= site!;
    this.idSite=site!.idSite;
    console.log(this.idSite)
    console.log(this.mysite);
    this.getSite();
  

    
  }



  getSite():void{
    this.siteService.getSiteById(this.idSite!).subscribe((site)=>{
          this.mysite = site;
    });
  }
  save(): void {
    const formGang = this.form!.value;
    console.log('Guardando');
    if(this.mysite && this.bar?.idBar){
      const gangForm: Gang={
        idGang:0,
        nameGang: formGang.nameGang,
        numberMembersGang:parseInt(formGang.membersGang),
        site:{
          idSite: this.mysite.idSite,
          bar:{
            idBar: this.bar.idBar,
            nameBar: this.bar.nameBar,
            addressBar: this.bar.addressBar,
            locallyBar: this.bar.locallyBar
          }
        }
      };
      console.log(gangForm);
         this.gangService.create(gangForm).subscribe(()=>{
          this.router.navigate(['/']); 
         });  
    }else {
      console.error('Site or bar information is missing');
  
    }
  };

  loadSites(): void {
    this.siteService.list().subscribe(sites => {
      this.sites = sites;
      console.log(this.sites);
      
      // Llamar a verifySite después de que sites haya sido cargado
      this.verifySite();
    });
  }
  
  verifySite(): void {
    // Crear un nuevo arreglo sin los sitios que cumplen la condición
    this.sites = this.sites.filter(site => {
      const gangIndex = this.gangs.findIndex(gang => gang.site.idSite === site.idSite);
      return gangIndex === -1;
    });
  }
  

  
  searchBar(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      const idNumber = parseInt(id);
      this.barService.get(idNumber).subscribe(bar => {
        if (bar) {
          this.bar = bar;
          this.locally=bar.locallyBar;
          console.log('Localidad',this.locally)
          console.log('Bar encontrado:', bar);
        // Cargar los sitios después de obtener el bar
        } else {
          console.error('Bar no encontrado con el ID proporcionado');
        }
      });
    }
  }


}

 

  