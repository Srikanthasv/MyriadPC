import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { FormsModule,ReactiveFormsModule  } from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { routing } from './app.routes';  
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { LoginService } from './_services/login.service';
import { enableProdMode } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CdkTableModule } from '@angular/cdk/table';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { AdvertisingComponent } from './Configuration/Codes/advertising/advertising.component';
import { ARFinanceComponent } from './Configuration/Codes/arfinance/arfinance.component';
import { ChargebackComponent } from './Configuration/Codes/chargeback/chargeback.component';
import {MatPaginatorIntl} from '@angular/material';
import { CustomPaginator } from './_services/CustomPaginator';

enableProdMode();
import {
  MatAutocompleteModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatExpansionModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatSortModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,
  MatStepperModule,
} from '@angular/material';
import { FollowupComponent } from './Configuration/Codes/followup/followup.component';
import { InventorytranComponent } from './Configuration/Codes/inventory/inventorytran/inventorytran.component';
import { InventoryadjComponent } from './Configuration/Codes/inventory/inventoryadj/inventoryadj.component';
import { InventorystatusComponent } from './Configuration/Codes/inventory/inventorystatus/inventorystatus.component';
import { OpportunityComponent } from './Configuration/Codes/opportunity/opportunity.component';
import { OpportunityresultComponent } from './Configuration/Codes/opportunityresult/opportunityresult.component';
import { PayableholdComponent } from './Configuration/Codes/payablehold/payablehold.component';
import {PagerService} from './_services/PagerService';
import { ModelcostComponent } from './Configuration/Codes/modelcost/modelcost.component';
import { ModeldiscontdComponent } from './Configuration/Codes/modeldiscontd/modeldiscontd.component';
import { ModelpromoComponent } from './Configuration/Codes/modelpromo/modelpromo.component';
import { ReturnreasonComponent } from './Configuration/Codes/returnreason/returnreason.component';
import { ModelpriceComponent } from './Configuration/Codes/modelprice/modelprice.component';
import { SoreferralComponent } from './Configuration/Codes/soreferral/soreferral.component';
import { SodiscountComponent } from './Configuration/Codes/sodiscount/sodiscount.component';
import { PurchaseorderComponent } from './Configuration/Codes/purchaseorder/purchaseorder.component';
import { PurchaseorderdiscountComponent } from './Configuration/Codes/purchaseorderdiscount/purchaseorderdiscount.component';
import { SalesservicepersontypeComponent } from './Configuration/Codes/salesservicepersontype/salesservicepersontype.component';
import { ServiceorderComponent } from './Configuration/Codes/serviceorder/serviceorder.component';
import { ServiceorderreasonComponent } from './Configuration/Codes/serviceorderreason/serviceorderreason.component';
import { HeaderComponent } from './header/header.component';
import { SidemenuComponent } from './sidemenu/sidemenu.component';
import { FooterComponent } from './footer/footer.component';
import { AuthenticationServiceService } from './_services/authentication-service.service';
import { AppSettings } from './_services/AppSettings';
import { AdditionalservicesComponent } from './Configuration/Codes/additionalservices/additionalservices.component';
import { TreeModule } from 'angular-tree-component';
import { ARtransactionComponent } from './Configuration/Codes/artransaction/artransaction.component';


@NgModule({
exports: [
    CdkTableModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatStepperModule,
    MatDatepickerModule,
    MatDialogModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
  MatTooltipModule,
  TreeModule,
  ],
   declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    AdvertisingComponent,
     ARFinanceComponent,
     ARtransactionComponent,
     ChargebackComponent,
     FollowupComponent,
     InventorytranComponent,
     InventoryadjComponent,
     InventorystatusComponent,
     OpportunityComponent,
     OpportunityresultComponent,
     PayableholdComponent,
     ModelcostComponent,
     ModeldiscontdComponent,
     ModelpromoComponent,
     ReturnreasonComponent,
     ModelpriceComponent,
     SoreferralComponent,
     SodiscountComponent,
     PurchaseorderComponent,
     PurchaseorderdiscountComponent,
     SalesservicepersontypeComponent,
     AdditionalservicesComponent,
     ServiceorderComponent,
     ServiceorderreasonComponent,
     HeaderComponent,
     SidemenuComponent,
     FooterComponent
  ],
  imports: [
  ReactiveFormsModule,HttpModule ,routing,
    BrowserModule,BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    JsonpModule,
MatInputModule,MatIconModule,MatTableModule,MatButtonModule,MatMenuModule,MatSelectModule,
    MatTabsModule, MatNativeDateModule, MatSidenavModule, MatPaginatorModule, MatSortModule, MatListModule, MatDatepickerModule, MatSlideToggleModule],
  providers: [LoginService,PagerService,AuthenticationServiceService,AppSettings,{ provide: MatPaginatorIntl, useClass: CustomPaginator}],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
platformBrowserDynamic().bootstrapModule(AppModule);
