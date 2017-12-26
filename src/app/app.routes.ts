import { NgModule }      from '@angular/core';
import { ModuleWithProviders }  from '@angular/core';  
import { Routes, RouterModule } from '@angular/router';  
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { AdvertisingComponent } from './Configuration/Codes/advertising/advertising.component';
import { ARFinanceComponent } from './Configuration/Codes/arfinance/arfinance.component';
import { ChargebackComponent } from './Configuration/Codes/chargeback/chargeback.component';
import { FollowupComponent } from './Configuration/Codes/followup/followup.component';


// Route Configuration  
export const routes: Routes = [  
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: 'app/configuration/codes/advertising', component: AdvertisingComponent },
  { path: 'app/configuration/codes/arfinance', component: ARFinanceComponent },
  { path: 'app/configuration/codes/chargeback', component: ChargebackComponent },
  { path: 'app/configuration/codes/followup', component: FollowupComponent },
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes);  
