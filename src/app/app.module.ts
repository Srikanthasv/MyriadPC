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
  ],
   declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    AdvertisingComponent,
    ARFinanceComponent
  ],
  imports: [
  ReactiveFormsModule,HttpModule ,routing,
    BrowserModule,BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    JsonpModule,
MatInputModule,MatIconModule,MatTableModule,MatButtonModule,MatMenuModule,MatSelectModule,
    MatTabsModule, MatNativeDateModule, MatSidenavModule, MatPaginatorModule, MatSortModule, MatListModule, MatDatepickerModule],
  providers: [LoginService],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
platformBrowserDynamic().bootstrapModule(AppModule);
