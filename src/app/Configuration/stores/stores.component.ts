import { Component, OnInit, ViewEncapsulation, Input, AfterContentInit, AfterViewInit, Renderer, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Pipe, PipeTransform } from '@angular/core';
import { Router } from '@angular/router';
import { Headers, Http, RequestOptions, Response } from '@angular/http';

import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { PagerService } from '../../_services/PagerService';
import { StoresService } from '../../_services/stores.service';
import { CountryService } from '../../_services/country.service';

@Component({
  moduleId: module.id,
  selector: 'app-stores',
  templateUrl: './stores.component.html',
  styleUrls: ['../../../assets/css/configuration/configuration.css'],
  providers: [StoresService, CountryService]
})
export class StoresComponent implements OnInit {
  public codesList: any = "";
  countryList: any = "";
  countryData: any[];
  stateList: any = "";
  stateData: any[];
  companyData: any[];
  divData: any[];
  txData: any[];
  stDefPriceData: any[];
  bdData: any[];

  public codeForm: FormGroup;
  codeeditForm: FormGroup;
  LocForm: FormGroup;
  editLocForm: FormGroup;
  PhForm: FormGroup;
  editPhForm: FormGroup;
  editGLForm: FormGroup;

  sortby: any;
  sortorder: any;
  data: any[];
  errorMsg: string = "";
  addFlag: boolean = false;
  displayFlag: boolean = true;
  maxDate: Date = new Date();
 
  code: any="";
  name: any = "";
  company: any = "";
  division: any = "";
  addr1: any = "";
  addr2: any = "";
  addr3: any = "";
  city: any = "";
  state: any = "";
  postalcode: any = "";
  website: any = "";
  taxcode: any = "";
  stDefPrice: any = "";
  depositReq: any = "";
  baseDeposit: any = "";
  closeDate: any = "";
  editcode: any = "";
  ename: any = "";
  ecompany: any = "";
  edivision: any = "";
  eaddr1: any = "";
  eaddr2: any = "";
  eaddr3: any = "";
  ecity: any = "";
  estate: any = "";
  epostalcode: any = "";
  ewebsite: any = "";
  etaxcode: any = "";
  estDefPrice: any = "";
  edepositReq: any = "";
  ebaseDeposit: any = "";
  ecloseDate: any = "";
  id: any;

  editFlag: boolean = false;
  discontinuedDate: any;

  editdescription: any;
  prevDescription: any;
  prevDiscDate: any;
  codeerrorMsg: string = '';
  descerrorMsg: string = '';
  editcodeerrorMsg: string = '';
  editdescerrorMsg: string = '';
  errormsg: string;
  bReturn: boolean = false;
  editerrormsg: string = "";
  pgTitle: string = "Stores";
  minDate: Date;

  pager: any = {};
  pagedItems: any[];
  selectpage: number = 1;
  rowspage: number = 5;

  LocFlag: boolean = true;
  addLocFlag: boolean = false;
  locCode: any = "";
  locTypeselected: any;
  loctype: any;
  sequence: any = "";
  editLocFlag: boolean = false;
  elocCode: any="";
  elocTypeselected: any;
  eloctype: any = "";
  esequence: any = "";


  PhFlag = true;
  AddPhFlag: boolean = false;
  EditPhFlag = false;
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


  GLFlag = true;
  EditGLFlag = false;
  accpayable: any;
  APdiscounts: any;
  accpselected: any;
  acdiscselected: any;


  addr1errorMsg: string = "";
  
  

  constructor(private fb: FormBuilder,
    private router: Router,
    private http: Http,
    private pagerService: PagerService,
    private StoresService: StoresService,
    private CountryService: CountryService) {
    this.sortby = "Code";
    this.sortorder = "asc";
    this.getData();
    this.getCountries();
    this.getStates();
    this.maxDate.setDate(this.maxDate.getDate() - 1);
  }



  ngOnInit() {
    this.codeForm = this.fb.group({
      'code': [null, Validators.compose([Validators.required])],
      'name': [null, Validators.compose([Validators.required])],
      'company': [null, Validators.compose([Validators.required])],
      'division': [null, Validators.compose([Validators.required])],
      'addr1': [null],
      'addr2': [null],
      'addr3': [null],
      'city': [null, Validators.compose([Validators.required])],
      'state': [null],
      'postalcode': [null, Validators.compose([Validators.required])],
      'website': [null],
      'taxcode': [null],
      'stDefPrice': [null],
      'depositReq': [null],
      'baseDeposit': [null],
      'closeDate': [null]
    });
    this.codeeditForm = this.fb.group({
      'editcode': [null, Validators.compose([Validators.required])],
      'ename': [null, Validators.compose([Validators.required])],
      'ecompany': [null, Validators.compose([Validators.required])],
      'edivision': [null, Validators.compose([Validators.required])],
      'eaddr1': [null],
      'eaddr2': [null],
      'eaddr3': [null],
      'ecity': [null, Validators.compose([Validators.required])],
      'estate': [null],
      'epostalcode': [null, Validators.compose([Validators.required])],
      'ewebsite': [null],
      'etaxcode': [null],
      'estDefPrice': [null],
      'edepositReq': [null],
      'ebaseDeposit': [null],
      'ecloseDate': [null]
    });
    this.LocForm = this.fb.group({
      'locCode': [null, Validators.compose([Validators.required])],
      'loctype': [null, Validators.compose([Validators.required])],
      'sequence': [null],
    });
    this.editLocForm = this.fb.group({
      'elocCode': [null, Validators.compose([Validators.required])],
      'eloctype': [null, Validators.compose([Validators.required])],
      'esequence': [null],
    });
    this.PhForm = this.fb.group({
      'phno': [null, Validators.compose([Validators.required])],
      'phTypeselected': [null, Validators.compose([Validators.required])],
      'extension': [null],
      'phdescription': [null],
      'cntyselected': [null],
      'cntCode': [null]
    });
    this.editPhForm = this.fb.group({
      'ephno': [null, Validators.compose([Validators.required])],
      'ephTypeselected': [null, Validators.compose([Validators.required])],
      'edextension': [null],
      'ephdescription': [null],
      'ecntyselected': [null],
      'ecntCode': [null]
    });
    this.editGLForm = this.fb.group({
      'accpayable': [null, Validators.compose([Validators.required])],
      'APdiscounts': [null, Validators.compose([Validators.required])]
    });
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

  getData() {
    //console.log("here");
    this.StoresService.getStores()
      .subscribe(res => {
        this.codesList = res;
        this.data = this.codesList.Data;
        this.sortData();
      },
      err => {
        this.errorMsg = "Stores not found.";
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

  callLocations()
  {
    this.editLocFlag =true;
    this.LocFlag = false;
    this.addLocFlag = false;
  }
  callPhones() {
    this.PhFlag = false;
    //this.AddPhFlag = true;
    this.EditPhFlag = true;
  }
  callGL() {
    this.GLFlag = false;
    this.EditGLFlag = true;
  }

  callCodes() {
    this.addFlag = true;
    this.displayFlag = false;
    this.errormsg = "";
    this.codeerrorMsg = "";
    this.descerrorMsg = "";
    this.code = "";
    
    this.pgTitle = "Add Store";
  }
  addcodeback() {
    this.addFlag = false;
    this.displayFlag = true;
    this.code = "";
    
    this.getData();
    this.pgTitle = "Stores";
  }
  clearContent() {
    this.code = "";
    
    this.errormsg = "";
    this.codeerrorMsg = "";
    this.descerrorMsg = ""
  }
  saveStores(value) {
    this.errormsg = "";
    this.codeerrorMsg = "";
    this.descerrorMsg = "";
    if (this.codeForm.valid) {
      if ((this.code || '').trim().length == 0) {
        this.codeerrorMsg = "Please enter valid input for Code.";
        return false;
      }
      
      var body = JSON.stringify({
        "Code": this.code,
        
        "StartDate": new Date(),
        "EndDate": null
      });

      //this.StoresService.submitC(body)
      //  .subscribe(res => {
      //    this.addFlag = false;
      //    this.codesList = "";
      //    this.displayFlag = true;
      //    this.getData();
      //    this.pgTitle = "Stores";
      //  },
      //  err => {
      //    err = err
      //    console.log("Error" + err);
      //    this.errormsg = "Failed to save the code details.";
      //  }
      //  );
    }
  }
  editStores(id, code, Name, startDate, endDate) {
    this.editFlag = true;
    this.displayFlag = false;
    this.editcode = code;
    this.ename = Name;
    var splitted = startDate.split("T", 2);    
    this.id = id;
    this.prevDiscDate = endDate;
    this.editerrormsg = "";
    this.editcodeerrorMsg = "";
    this.editdescerrorMsg = "";
    this.pgTitle = "Edit Store";
  }
  updatStores(code, value) {
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

      var body = JSON.stringify({
        "Id": this.id,
        "Code": this.editcode,
        "Description": this.editdescription,
        
        
      });
      //this.StoresService.updateC(this.id, body)
      //  .subscribe(res => {
      //    this.editFlag = false;
      //    this.codesList = "";
      //    this.displayFlag = true;
      //    this.getData();
      //    this.id = "";
      //    this.pgTitle = "Stores";
      //  },
      //  err => {
      //    err = err
      //    console.log(err);
      //    this.editerrormsg = "Failed to update the code details.";
      //  }
      //  );
    }
  }

  editcodeback() {
    this.editFlag = false;
    this.displayFlag = true;
    this.editcode = "";
    this.editdescription = "";
    this.getData();
    this.pgTitle = "Stores";
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
    this.data = this.codesList.Data;
    this.setPage(1);
    return this.codesList.Data;
  }

}

