import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ProductService } from '../../services/product-service.service';
import { Product } from '../model/product.interface';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule],
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.css'
})
export default class ProductFormComponent implements OnInit {
 

  private fb = inject(FormBuilder);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private productService = inject(ProductService);

  form: FormGroup | undefined;
  product? : Product;


  ngOnInit(): void {

    this.form = this.fb.group({
      nameProduct: ['',[Validators.required]],
      countProduct:['',[Validators.required]]
    })
  }


  save():void{
    const productForm = this.form!.value;
    if(this.form){

      const productJson = {
        id_product: 0,
        name_product:productForm.nameProduct
      }

      this.productService.createProduct(productJson).subscribe(()=>{
          console.log(productJson);
          this.router.navigate(['/']);
      });
    }
  }


}
