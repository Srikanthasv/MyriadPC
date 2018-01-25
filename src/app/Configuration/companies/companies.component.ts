import { Component, OnInit, ViewEncapsulation, Input, AfterContentInit, AfterViewInit, Renderer, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Pipe, PipeTransform } from '@angular/core';
import { Router } from '@angular/router';
import { Headers, Http, RequestOptions, Response } from '@angular/http';
import { MatPaginator, MatSort, MatTableDataSource, MatPaginatorModule } from '@angular/material';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { PagerService } from '../../_services/PagerService';
import { CompaniesService } from '../../_services/companies.service';
import { CountryService } from '../../_services/country.service';
//import { Company } from '../../Model/company.model';


@Component({
  moduleId: module.id,
  selector: 'app-companies',
  templateUrl: './companies.component.html',
  styleUrls: ['../../../assets/css/configuration/configuration.css'],
  providers: [CompaniesService, CountryService]
})
export class CompaniesComponent implements OnInit {
  pgTitle: string = "Companies";
  public codesList: any = "";
  countryList: any = "";
  countryData: any[];
  public codeForm: FormGroup;
  codeeditForm: FormGroup;
  sortby: any;
  sortorder: any;
  data: any[];
  errorMsg: string = "";
  pager: any = {};
  pagedItems: any[];
  selectpage: number = 1;
  rowspage: number = 5;
  displayFlag: boolean = true;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  code: any;
  description: any;
  editFlag: boolean = false;
  effectiveDate: any;
  discontinuedDate: any;
  editdescription: any;
  prevDescription: any;
  prevDiscDate: any;
  editcode: any;
  id: any;
  acToken: any;
  codeerrorMsg: string = '';
  descerrorMsg: string = '';
  editcodeerrorMsg: string = '';
  editdescerrorMsg: string = '';
  errormsg: string;
  bReturn: boolean = false;
  editerrormsg: string = "";
  minDate: Date;
  addFlag: boolean = false;
  companyName: string = "";
  division: string = "";
  divDesc: string = "";
  dba: string = "";
  taxId: string = "";
  contact: string = "";
  addr1: string = "";
  addr2: string = "";
  addr3: string = "";
  city: string = "";
  state: string = "";
  postalcode: string = "";
  country: string = "";
  cntyselected: string;
  website: string = "";
  email: string = "";
  phno: string = "";
  extension: string = "";
  dtToday: Date = new Date();

  constructor(private fb: FormBuilder,
    private router: Router,
    private http: Http,
    private pagerService: PagerService,
    private CompaniesService: CompaniesService,
    private CountryService: CountryService)
  {
    this.sortby = "Code";
    this.sortorder = "asc";
    this.getData();
    this.getCompanies();
  }
  setPage(page: number) {
    this.selectpage = Number(page);

    if (page < 1 || page > this.pager.totalPages) {
      return;
    }
    this.pager = this.pagerService.getPager(this.codesList.Data.length, this.selectpage, this.rowspage);
    this.pagedItems = this.codesList.Data.slice(this.pager.startIndex, this.pager.endIndex + 1);
    this.selectpage = Number(this.pager.currentPage);
  }


  ngOnInit() {
    this.codeForm = this.fb.group({
      'code': [null, Validators.compose([Validators.required])],
      'companyName': [null, Validators.compose([Validators.required])],
      'division': [null, Validators.compose([Validators.required])],
      'divDesc': [null, Validators.compose([Validators.required])],
      'dba': [null],
      'taxId': [null],
      'contact': [null],
      'addr1': [null],
      'addr2': [null],
      'addr3': [null],
      'city': [null],
      'state': [null],
      'postalcode': [null],
      'country': [null],
      'website': [null],
      'email': [null],
      'phno': [null],
      'extension': [null],
      'effectiveDate' : [null]
    });
    this.codeeditForm = this.fb.group({
      'editdescription': [null, Validators.compose([Validators.required])],
      
    });
  }

  getData() {

    this.CompaniesService.getCompanies()
      .subscribe(res => {
        this.codesList = res;
        this.data = this.codesList.Data;
        this.sortCompanies();
      },
      err => {
        this.errorMsg = "Company(s) not found.";
        console.log("error:" + err);
      }
      );
  }
  getCompanies()
  {
    this.CountryService.getCountries()
      .subscribe(res => {
        this.countryList = res;
        this.countryData = this.countryList.Data;
      },
      err => {
        this.errorMsg = "Country(s) not found.";
        console.log("error:" + err);
      }
      );
  }
  sortCompanies() {
    let orderType = this.sortorder
    let currentField = this.sortby;

    this.codesList.Data.sort((a: any, b: any) => {
      if (orderType === 'asc') {
        if (a[currentField] < b[currentField]) return -1;
        if (a[currentField] > b[currentField]) return 1;
        return 0;
      } else {
        if (a[currentField] < b[currentField]) return 1;
        if (a[currentField] > b[currentField]) return -1;
        return 0;
      }

    });
    this.setPage(1);
    return this.codesList.Data;
  }
  callcodes() {
    this.addFlag = true;
    this.displayFlag = false;
    this.errormsg = "";
    this.codeerrorMsg = "";
    this.descerrorMsg = "";
    this.code = "";
    this.description = "";
    this.pgTitle = "Add Company";
  }
  addcodeback() {
    this.addFlag = false;
    this.displayFlag = true;
    this.code = "";
    this.description = "";
    this.getData();
    this.pgTitle = "Companies";
  }
  clearContent() {
    this.code = "";
    this.description = "";
    this.errormsg = "";
    this.codeerrorMsg = "";
    this.descerrorMsg = ""
  }
  saveCompany(value) {
    this.errormsg = "";
    this.codeerrorMsg = "";
    this.descerrorMsg = "";
    if (this.codeForm.valid) {
      if ((this.code || '').trim().length === 0) {
        this.codeerrorMsg = "Please enter valid input for Code.";
        return false;
      }
      if ((this.companyName || '').trim().length === 0) {
        this.descerrorMsg = "Please enter valid input for Company Name."
        return false;
      }
      if ((this.division || '').trim().length === 0) {
        this.codeerrorMsg = "Please enter valid input for Division Code.";
        return false;
      }
      if ((this.divDesc || '').trim().length === 0) {
        this.descerrorMsg = "Please enter valid input for Division Description."
        return false;
      }
      if ((this.website || '').trim().length === 0) { this.website = null };
      var body = JSON.stringify({
        "Code": this.code,
        "Description": "Test 123",
        "Dba": this.dba,
        "TaxId": this.taxId,
        "StartDate": this.effectiveDate,
        "EndDate": null,
        "SystemProgramId": null,
        "Address": {
          "AddressCountryId": this.cntyselected.toString(),
          "Description": "Test 123",
          "CompanyName": this.companyName,
          "Address1": this.addr1,
          "Address2": this.addr2,
          "Address3": this.addr3,
          "CityName": this.city,
          "CarrierRoute": null,
          "StateCode": this.state,
          "PostalCode": this.postalcode,
          "Title": null,
          "FirstName": null,
          "LastName": null,
          "Suffix": null,
          "JobTitle": null,
          "WebUrl": this.website
        }
      });
      console.log("Body Before :: " + body);
      this.CompaniesService.submitCompany(body)
        .subscribe(res => {
          this.addFlag = false;
          this.codesList = "";
          this.displayFlag = true;
          this.getData();
          this.pgTitle = "Companies";
          this.setPage(1);
        },
        err => {
          err = err
          console.log("Error" + err);
          this.errormsg = "Failed to save the company details.";
        }
        );
    }
  }
  setCompanydetails(id, code, desc, startDate, endDate) {
    this.editFlag = true;
    this.displayFlag = false;
    this.editcode = code;
    this.editdescription = desc;
    this.prevDescription = desc;
    var splitted = startDate.split("T", 2);
    this.effectiveDate = splitted[0];
    if (endDate || '') {
      splitted = '';      
      splitted = endDate.split("T", 2);
      this.discontinuedDate = splitted[0];
    }
    this.id = id;
    this.prevDiscDate = endDate;
    this.editerrormsg = "";
    this.editcodeerrorMsg = "";
    this.editdescerrorMsg = "";
    this.pgTitle = "Edit Company";
  }
  updateCompany(code, value) {
    this.editerrormsg = "";
    if (this.codeeditForm.valid) {
      if ((this.editcode || '').trim().length === 0) {
        this.editcodeerrorMsg = "Please enter valid input for Code."
        return false;
      }
      if ((this.editdescription || '').trim().length === 0) {
        this.editdescerrorMsg = "Please enter valid input for Description."
        return false;
      }

      this.editFlag = false;
      this.displayFlag = true;
      //console.log("Discont Date:: " + this.discontinuedDate);
      //vaues awi get in variables like this.id,this.editcode,this.editdescription,this.effectiveDate,this.discontinuedDate
      //need to integrate the update code service here
      var body = JSON.stringify({ "Id": this.id, "Code": this.editcode, "Description": this.editdescription, "StartDate": this.effectiveDate, "EndDate": this.discontinuedDate });

      this.CompaniesService.updateCompany(this.id, body)
        .subscribe(res => {
          this.editFlag = false;
          this.codesList = "";
          this.displayFlag = true;
          this.getData();
          this.id = "";
          this.pgTitle = "Companies";
          this.setPage(1);
        },
        err => {
          err = err
          console.log(err);
          this.editerrormsg = "Failed to update the code details.";
        }
        );
    }
  }

  editcodeback() {
    this.editFlag = false;
    this.displayFlag = true;
    this.editcode = "";
    this.editdescription = "";
    this.getData();
    this.pgTitle = "Companies";
    this.id = "";
  }
  clearsort() {
    this.sortby = "Code";
    this.sortorder = "asc";
  }

  cleareditcodes() {
    this.editdescription = this.prevDescription;
    this.discontinuedDate = this.prevDiscDate;
    this.editerrormsg = "";
    this.editcodeerrorMsg = "";
    this.editdescerrorMsg = "";
  }
}
