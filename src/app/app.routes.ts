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
import { InventoryadjComponent } from './Configuration/Codes/inventory/inventoryadj/inventoryadj.component';
import { InventorystatusComponent } from './Configuration/Codes/inventory/inventorystatus/inventorystatus.component';
import { InventorytranComponent } from './Configuration/Codes/inventory/inventorytran/inventorytran.component';
import { OpportunityComponent } from './Configuration/Codes/opportunity/opportunity.component';
import { OpportunityresultComponent } from './Configuration/Codes/opportunityresult/opportunityresult.component';
import { PayableholdComponent } from './Configuration/Codes/payablehold/payablehold.component';
import { ModelcostComponent } from './Configuration/Codes/modelcost/modelcost.component';
import { ModeldiscontdComponent } from './Configuration/Codes/modeldiscontd/modeldiscontd.component';
import { ModelpromoComponent } from './Configuration/Codes/modelpromo/modelpromo.component';

// Route Configuration  
export const routes: Routes = [  
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: 'app/configuration/codes/advertising', component: AdvertisingComponent },
  { path: 'app/configuration/codes/arfinance', component: ARFinanceComponent },
  { path: 'app/configuration/codes/chargeback', component: ChargebackComponent },
  { path: 'app/configuration/codes/followup', component: FollowupComponent },
  { path: 'app/configuration/codes/inventory/inventoryadj', component: InventoryadjComponent },
  { path: 'app/configuration/codes/inventory/inventorystatus', component: InventorystatusComponent },
  { path: 'app/configuration/codes/inventory/inventorytran', component: InventorytranComponent },
  { path: 'app/configuration/codes/opportunity', component: OpportunityComponent },
  { path: 'app/configuration/codes/opportunityresult', component: OpportunityresultComponent },
  { path: 'app/configuration/codes/payablehold', component: PayableholdComponent },
  { path: 'app/configuration/codes/modelcost', component: ModelcostComponent },
  { path: 'app/configuration/codes/modeldiscontd', component: ModeldiscontdComponent },
  { path: 'app/configuration/codes/modelpromo', component: ModelpromoComponent },
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes);  
