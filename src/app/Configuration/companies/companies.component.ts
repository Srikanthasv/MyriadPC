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
import { DivisionsService } from '../../_services/divisions.service';
//import { Company } from '../../Model/company.model';


@Component({
  moduleId: module.id,
  selector: 'app-companies',
  templateUrl: './companies.component.html',
  styleUrls: ['../../../assets/css/configuration/configuration.css'],
  providers: [CompaniesService, CountryService, DivisionsService]
})
export class CompaniesComponent implements OnInit {
  pgTitle: string = "Companies";
  company: any = "";

  public codesList: any = "";
  countryList: any = "";
  countryData: any[];
  stateList: any = "";
  stateData: any[];
  divList: any = "";
  divData: any[];

  public codeForm: FormGroup;
  codeeditForm: FormGroup;
  PhoneForm: FormGroup;
  editPhoneForm: FormGroup;
  EmailForm: FormGroup;
  editEmailForm: FormGroup;
  DivisionForm: FormGroup;
  editDivisionForm: FormGroup;

  sortby: any;
  sortorder: any;
  data: any[];
  errorMsg: string = "";
  pager: any = {};
  pagedItems: any[];
  selectpage: number = 1;

  selPhone: number = 1;
  PhpagedItems: any[];
  Phpager: any = {};
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
  AddressId: any;
  acToken: any;
  codeerrorMsg: string = '';
  descerrorMsg: string = '';
  addr1errorMsg: string = '';
  editcodeerrorMsg: string = '';
  editdescerrorMsg: string = '';
  eaddr1errorMsg: string = "";
  errormsg: string;
  bReturn: boolean = false;
  editerrormsg: string = "";
  minDate: Date;
  addFlag: boolean = false;
  companyName: string = "";

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
  stateselected: string;
  website: string = "";
  //email: string = "";
  //phno: string = "";
  //extension: string = "";
  ecompanyName: string = "";
  edba: string = "";
  etaxId: string = "";
  eaddr1: string = "";
  eaddr2: string = "";
  eaddr3: string = "";
  ecity: string = "";
  estate: string = "";
  epostalcode: string = "";
  ecountry: string = "";
  estateselected: string;
  ewebsite: string = "";
  dtToday: Date = new Date();

  AddPhFlag: boolean = false;
  PhdisplayFlag: boolean = true;
  pheditFlag: boolean = false;
  phno: string = "";
  extension: string = "";
  phdescription: string = "";
  phTypeselected: string = "";
  cntCode: string = "";

  ephno: string = "";
  edextension: string = "";
  ephdescription: string = "";
  ephTypeselected: string = "";
  ecntCode: string = "";
  ecntyselected: string = "";

  selMail: number = 1;
  mailpagedItems: any[];
  mailpager: any = {};
  MaildisplayFlag = true;
  AddMailFlag = false;
  MaileditFlag: boolean = false;
  email: string = "";
  emailTypeselected: string = "";
  emaildescription: string = "";
  editemail: string = "";
  editmailTypeselected: string = "";
  editmaildescription: string = "";
  editetype: string = "";


  selDiv: number = 1;
  DivpagedItems: any[];
  Divpager: any = {};
  DivdisplayFlag = true;
  AddDivFlag = false;
  DiveditFlag: boolean = false;
  divCode: string = "";
  divDesc: string = "";
  divStartDate: any;
  divEndDate: any;
  EditdivCode: string = "";
  EditdivDesc: string = "";
  EditdivStartDate: any;
  EditdivEndDate: any;

  constructor(private fb: FormBuilder,
    private router: Router,
    private http: Http,
    private pagerService: PagerService,
    private CompaniesService: CompaniesService,
    private CountryService: CountryService,
    private DivisionsService: DivisionsService) {
    this.sortby = "Code";
    this.sortorder = "asc";
    this.getData();
    this.getCountries();
    this.getStates();
    this.getDivisions();
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

  setPhonePage(page: number) {
    this.selPhone = Number(page);

    if (page < 1 || page > this.Phpager.totalPages) {
      return;
    }
    this.Phpager = this.pagerService.getPager(this.codesList.Data.length, this.selPhone, this.rowspage);
    this.PhpagedItems = this.codesList.Data.slice(this.Phpager.startIndex, this.Phpager.endIndex + 1);
    this.selPhone = Number(this.Phpager.currentPage);
  }

  setMailPage(page: number) {
    this.selMail = Number(page);

    if (page < 1 || page > this.Phpager.totalPages) {
      return;
    }
    this.mailpager = this.pagerService.getPager(this.codesList.Data.length, this.selMail, this.rowspage);
    this.mailpagedItems = this.codesList.Data.slice(this.mailpager.startIndex, this.mailpager.endIndex + 1);
    this.selMail = Number(this.mailpager.currentPage);
  }

  setDivPage(page: number) {
    this.selDiv = Number(page);

    if (page < 1 || page > this.Phpager.totalPages) {
      return;
    }
    this.Divpager = this.pagerService.getPager(this.divList.Data.length, this.selDiv, this.rowspage);
    this.DivpagedItems = this.divList.Data.slice(this.Divpager.startIndex, this.Divpager.endIndex + 1);
    this.selDiv = Number(this.Divpager.currentPage);
  }


  ngOnInit() {
    this.codeForm = this.fb.group({
      'code': [null, Validators.compose([Validators.required])],
      'companyName': [null, Validators.compose([Validators.required])],
      'dba': [null],
      'taxId': [null],
      'addr1': [null, Validators.compose([Validators.required])],
      'addr2': [null],
      'addr3': [null],
      'city': [null, Validators.compose([Validators.required])],
      'state': [null],
      'postalcode': [null, Validators.compose([Validators.required])],
      'website': [null],
      'effectiveDate': [null]
    });
    this.codeeditForm = this.fb.group({
      'editcode': [null, Validators.compose([Validators.required])],
      'ecompanyName': [null, Validators.compose([Validators.required])],
      'edba': [null],
      'etaxId': [null],
      'eaddr1': [null, Validators.compose([Validators.required])],
      'eaddr2': [null],
      'eaddr3': [null],
      'ecity': [null, Validators.compose([Validators.required])],
      'estate': [null],
      'epostalcode': [null, Validators.compose([Validators.required])],
      'ewebsite': [null],
      'discontinuedDate': [null]
    });
    this.PhoneForm = this.fb.group({
      'phno': [null, Validators.compose([Validators.required])],
      'phTypeselected': [null, Validators.compose([Validators.required])],
      'extension': [null],
      'phdescription': [null],
      'cntyselected': [null],
      'cntCode': [null]
    });
    this.editPhoneForm = this.fb.group({
      'ephno': [null, Validators.compose([Validators.required])],
      'ephTypeselected': [null, Validators.compose([Validators.required])],
      'edextension': [null],
      'ephdescription': [null],
      'ecntyselected': [null],
      'ecntCode': [null]
    });
    this.EmailForm = this.fb.group({
      'email': [null, Validators.compose([Validators.required])],
      'etype': [null, Validators.compose([Validators.required])],
      'emaildescription': [null],
    });
    this.editEmailForm = this.fb.group({
      'editemail': [null, Validators.compose([Validators.required])],
      'editetype': [null, Validators.compose([Validators.required])],
      'editmaildescription': [null],
    });
    this.DivisionForm = this.fb.group({
      'divCode': [null, Validators.compose([Validators.required])],
      'divDesc': [null, Validators.compose([Validators.required])],
      'divStartDate': [null, Validators.compose([Validators.required])],
      'divEndDate': [null, Validators.compose([Validators.required])]
    });
    this.editDivisionForm = this.fb.group({
      'EditdivCode': [null, Validators.compose([Validators.required])],
      'EditdivDesc': [null, Validators.compose([Validators.required])],
      'EditdivStartDate': [null, Validators.compose([Validators.required])],
      'EditdivEndDate': [null, Validators.compose([Validators.required])]
    });
  }

  getData() {

    this.CompaniesService.getCompanies()
      .subscribe(res => {
        this.codesList = res;
        this.data = this.codesList.Data;
        this.sortData();
      },
      err => {
        this.errorMsg = "Company(s) not found.";
        console.log("error:" + err);
      }
      );
  }
  getCountries() {
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
  getStates() {
    this.CountryService.getStates()
      .subscribe(res => {
        this.stateList = res;
        this.stateData = this.stateList.Data.sort((a: any, b: any) => {
          if (a["Name"] < b["Name"]) return -1;
          if (a["Name"] > b["Name"]) return 1;
        });
      },
      err => {
        this.errorMsg = "State(s) not found.";
        console.log("error:" + err);
      }
      );

  }
  getDivisions() {

    this.DivisionsService.getDivisions()
      .subscribe(res => {
        this.divList = res;
        this.divData = this.divList.Data.sort((a: any, b: any) => {
          if (a["Name"] < b["Name"]) return -1;
          if (a["Name"] > b["Name"]) return 1;
        });
        this.setDivPage(1);
      },
      err => {
        this.errorMsg = "Company(s) not found.";
        console.log("error:" + err);
      }
      );
  }
  sortData() {
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
  callDivision() {
    this.DivdisplayFlag = false;
    this.AddDivFlag = true;
  }
  callEmails() {
    this.MaildisplayFlag = false;
    this.AddMailFlag = true;
  }
  callPHs() {
    this.PhdisplayFlag = false;
    this.AddPhFlag = true;
  }
  callcodes() {
    this.addFlag = true;
    this.displayFlag = false;
    this.errormsg = "";
    this.codeerrorMsg = "";
    this.descerrorMsg = "";
    this.addr1errorMsg = "";
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
    this.companyName = "";
    this.dba = "";
    this.taxId = "";
    this.addr1 = "";
    this.addr2 = "";
    this.addr3 = "";
    this.city = "";
    this.state = "";
    this.postalcode = "";
    this.website = "";
    this.effectiveDate = "";
    this.errormsg = "";
    this.codeerrorMsg = "";
    this.descerrorMsg = ""
    this.addr1errorMsg = "";   
  }
  saveCompany(value) {
    this.errormsg = "";
    this.codeerrorMsg = "";
    this.descerrorMsg = "";
    this.addr1errorMsg = "";
    this.state = "";
    this.country = "";
    if (this.codeForm.valid) {
      if ((this.code || '').trim().length === 0) {
        this.codeerrorMsg = "Please enter valid input for Code.";
        return false;
      }
      if ((this.companyName || '').trim().length === 0) {
        this.descerrorMsg = "Please enter valid input for Company Name."
        return false;
      }
      if ((this.addr1 || '').trim().length === 0) {
        this.addr1errorMsg = "Please enter valid input for Address 1."
        return false;
      }
      var splitted = this.stateselected.split("_", 2);
      this.state = splitted[0].toString();
      this.country = splitted[1].toString();

      if ((this.dba || '').trim().length === 0) { this.dba = null; }
      if ((this.taxId || '').trim().length === 0) { this.taxId = null; }
      if ((this.addr2 || '').trim().length === 0) { this.addr2 = null;}
      if ((this.addr3 || '').trim().length === 0) { this.addr3 = null; }
      if ((this.website || '').trim().length === 0) { this.website = null; }
      if (this.effectiveDate === undefined) { this.effectiveDate = new Date(); }
     //console.log("Effective Date:: " + this.effectiveDate);

      var body = JSON.stringify({
        "Code": this.code,
        "Description": "Test 123",
        "Dba": this.dba,
        "TaxId": this.taxId,
        "StartDate": this.effectiveDate,
        "EndDate": null,
        "SystemProgramId": null,
        "Address": {
          "AddressCountryId": this.country,
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
      //console.log("Body Before :: " + body);
      this.CompaniesService.submitCompany(body)
        .subscribe(res => {
          this.company = res;
          this.addFlag = false;
          this.codesList = "";
          this.displayFlag = true;
          //this.editFlag = true;
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
  setCompanydetails(id, addrId, code, company, dba, taxid, addr1, addr2, addr3, city, state, country, zip, website, startDate, endDate) {
    var splitted = "";
    this.editFlag = true;
    this.displayFlag = false;
    this.id = id;
    this.AddressId = addrId;
    this.editcode = code;
    if (company || null) { this.ecompanyName = company };
    if (dba || null) { this.edba = dba };
    if (taxid || null) { this.etaxId = taxid };
    if (addr1 || null) { this.eaddr1 = addr1 };
    if (addr2 || null) { this.eaddr2 = addr2 };
    if (addr3 || null) { this.eaddr3 = addr3 };
    if (city || null) { this.ecity = city };
    this.estateselected = state + "_" + country;
    if (zip || null) { this.epostalcode = zip };
    if (website || null) { this.ewebsite = website; }
    if (startDate || '') {
      splitted = startDate.split("T", 2);
      this.effectiveDate = splitted[0];
    }
    if (endDate || '') {
      splitted = '';
      splitted = endDate.split("T", 2);
      this.discontinuedDate = splitted[0];
    }

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
      if ((this.ecompanyName || '').trim().length === 0) {
        this.editdescerrorMsg = "Please enter valid input for Company Name."
        return false;
      }
      if ((this.eaddr1 || '').trim().length === 0) {
        this.eaddr1errorMsg = "Please enter valid input for Address 1."
        return false;
      }
      var splitted = this.estateselected.split("_", 2);
      this.estate = splitted[0].toString();
      this.ecountry = splitted[1].toString();

      this.editFlag = false;
      this.displayFlag = true;
      //console.log("Discont Date:: " + this.discontinuedDate);
      //vaues awi get in variables like this.id,this.editcode,this.editdescription,this.effectiveDate,this.discontinuedDate
      //need to integrate the update code service here
      if ((this.ewebsite || '').trim().length === 0) { this.ewebsite = null };
      if ((this.edba || '').trim().length === 0) { this.edba = null };
      if ((this.etaxId || '').trim().length === 0) { this.etaxId = null };
      if ((this.discontinuedDate || '').trim().length === 0) { this.discontinuedDate = null };
      if ((this.eaddr2 || '').trim().length === 0) { this.eaddr2 = null };
      if ((this.eaddr1 || '').trim().length === 0) { this.eaddr1 = null };
      if ((this.eaddr3 || '').trim().length === 0) { this.eaddr3 = null };
      if ((this.ecity || '').trim().length === 0) { this.ecity = null };
      if ((this.epostalcode || '').trim().length === 0) { this.epostalcode = null };

      var body = JSON.stringify({
        "Id": this.id,
        "Code": this.editcode,
        "AddressId": this.AddressId,
        "Description": "Test 123",
        "Dba": this.edba,
        "TaxId": this.etaxId,
        "StartDate": this.effectiveDate,
        "EndDate": this.discontinuedDate,
        "SystemProgramId": null,
        "Address": {
          "Id": this.AddressId,
          "AddressCountryId": this.ecountry,
          "Description": "Test 123",
          "CompanyName": this.ecompanyName,
          "Address1": this.eaddr1,
          "Address2": this.eaddr2,
          "Address3": this.eaddr3,
          "CityName": this.ecity,
          "CarrierRoute": null,
          "StateCode": this.estate,
          "PostalCode": this.epostalcode,
          "Title": null,
          "FirstName": null,
          "LastName": null,
          "Suffix": null,
          "JobTitle": null,
          "WebUrl": this.ewebsite
        }
      });

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
