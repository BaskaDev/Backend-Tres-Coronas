

import { Component, OnInit, inject } from '@angular/core';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { BarService } from '../../services/bar-service.service';
import { Bar } from '../model/bar.interface';

@Component({
  selector: 'app-bares-list',
  standalone: true,
  imports: [RouterModule,RouterLink],
  templateUrl: './bares-list.component.html',
  styleUrl: './bares-list.component.css'
})
export default class BaresListComponent implements OnInit {
  private router = inject(Router);
  bares: Bar [] = [];


  private barService = inject(BarService);
  ngOnInit(): void {
    this.loadAll();
  }

  loadAll(){
    this.barService.list().subscribe(  bares =>{
      this.bares= bares;
      console.log(bares)
      this.router.navigateByUrl('/');;
    });
  }

  deleteBar(bar: Bar) {
    this.barService.deleteBar(bar.idBar).subscribe(() => {
      console.log('Bar was eliminated');
      this.loadAll();
      
    });
  }
  



}
