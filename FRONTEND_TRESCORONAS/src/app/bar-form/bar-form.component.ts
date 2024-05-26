import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { BarService } from '../../services/bar-service.service';
import { SiteService } from '../../services/site-services.service';
import { Bar } from '../model/bar.interface';
import { Site } from '../model/site.interface';

@Component({
  selector: 'app-bar-form',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule],
  templateUrl: './bar-form.component.html',
  styleUrls: ['./bar-form.component.css']
})
export default class BarFormComponent implements OnInit {
  private fb = inject(FormBuilder);
  private barService = inject(BarService);
  private siteService = inject(SiteService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  form: FormGroup | undefined;
  bar?:Bar;
  site? :Site;

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    console.log('ID from URL:', id); // Debug: Imprimir el ID
    if (id) {
      console.log(id);
      const idNumber = parseInt(id);
   // Debug: Imprimir el ID convertido
      this.barService.get(idNumber).subscribe(
          bar => {
          if (bar) {
            this.bar=bar;
            console.log('Bar data:', bar.nameBar); // Debug: Imprimir los datos del bar
            this.form = this.fb.group({
              nameBar: [bar.nameBar, [Validators.required]],
              addressBar: [bar.addressBar, [Validators.required]],
              locallyBar: [bar.locallyBar, [Validators.required]]
            });
          } else {
            console.error('Bar no encontrado con el ID proporcionado');
          }
        },
        (error) => {
          console.error('Error al obtener los datos del bar:', error);
        }
      );
    } else {
      console.log('ID no encontrado en la URL');
      this.form = this.fb.group({
        nameBar: ['', [Validators.required]],
        addressBar: ['', [Validators.required]],
        locallyBar: ['', [Validators.required]]
      });
    }
  }
  save() {
    
      const barForm = this.form!.value;
      if(this.bar){
        this.barService.update(this.bar.idBar,barForm).subscribe(() => {
          this.router.navigate(['/']);
        });
      }else{
        this.barService.create(barForm).subscribe(() => {
          this.router.navigate(['/']); 
        });
      }


     
    
  }
}
