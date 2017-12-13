import { NgModule }      from '@angular/core';

import { ModuleWithProviders }  from '@angular/core';  
import { Routes, RouterModule } from '@angular/router';  
  
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';

// Route Configuration  
export const routes: Routes = [  
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },
];

//@NgModule({
//  imports: [RouterModule.forRoot(routes)],
//  exports: [RouterModule]
//})
//export class routing { }
  
export const routing: ModuleWithProviders = RouterModule.forRoot(routes);  
