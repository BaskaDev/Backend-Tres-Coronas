import { Routes } from '@angular/router';

export const routes: Routes = [
{
    path:'' ,
    loadComponent :() => import ('./bares-list/bares-list.component') 
},
{
    path:'newBar' ,
    loadComponent :() => import ('./bar-form/bar-form.component') 
} ,
{
    path:'edit/:id' ,
    loadComponent :() => import ('./bar-form/bar-form.component') 
} ,
{
    path:'perfil/:id' ,
    loadComponent :() => import ('./bar-perfil/bar-perfil.component') 
},
{
    path:'newEmployee/:id',
    loadComponent:()=> import('./empleado-form/empleado-form.component')
},
{
    path:'newGang/:id',
    loadComponent:()=> import('./pandilla-form/pandilla-form.component')
},
{
    path:'perfilSite/:id',
    loadComponent:()=> import('./site-perfil/site-perfil.component')
},{
    path:'newHokage/:id',
    loadComponent:()=> import('./hokage-form/hokage-form.component')
},{
    path:'newClient/:id',
    loadComponent:()=> import('./cliente-form/cliente-form.component')
},{
    path:'newProduct',
    loadComponent:()=> import('./product-form/product-form.component')
}
];
