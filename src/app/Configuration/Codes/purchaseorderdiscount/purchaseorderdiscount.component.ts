import { Component, OnInit, ViewEncapsulation, Input, AfterContentInit, AfterViewInit, Renderer, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Pipe, PipeTransform } from '@angular/core';
import { Router } from '@angular/router';
import { Headers, Http, RequestOptions, Response } from '@angular/http';

import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { PagerService } from '../../../_services/PagerService';
import { PurchaseorderdiscountService } from '../../../_services/purchaseorderdiscount.service';

@Component({
  selector: 'app-purchaseorderdiscount',
  templateUrl: './purchaseorderdiscount.component.html',
  styleUrls: ['../../../../assets/css/configuration/configuration.css'],
  providers: [PurchaseorderdiscountService]
})
export class PurchaseorderdiscountComponent implements OnInit {
  public codesList: any = "";
  public codeForm: FormGroup;
  codeeditForm: FormGroup;
  sortby: any;
  sortorder: any;
  data: any[];
  errorMsg: string = "";
  addFlag: boolean = false;
  displayFlag: boolean = true;
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
  codeerrorMsg: string = '';
  descerrorMsg: string = '';
  editcodeerrorMsg: string = '';
  editdescerrorMsg: string = '';
  errormsg: string;
  bReturn: boolean = false;
  editerrormsg: string = "";
  pgTitle: string = "Purchase Order Discount";
  minDate: Date;
  pager: any = {};
  pagedItems: any[];
  selectpage: number = 1;
  rowspage: number = 5;

  constructor(private fb: FormBuilder,
    private router: Router,
    private http: Http,
    private PurchaseorderdiscountService: PurchaseorderdiscountService, private pagerService: PagerService) {
    this.sortby = "Code";
    this.sortorder = "asc";
    this.getData();
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
      'description': [null, Validators.compose([Validators.required])]
    });
    this.codeeditForm = this.fb.group({
      'editdescription': [null, Validators.compose([Validators.required])],
      // 'discontinuedDate': [null, Validators.compose([Validators.required])],
      // Validators.pattern('[a-zA-Z ]*')
    });
  }

  getData() {

    this.PurchaseorderdiscountService.getPODSData()
      .subscribe(res => {
        this.codesList = res;
        this.data = this.codesList.Data;
        
        
        this.sortPODScodes();
      },
      err => {
        this.errorMsg = "Purchase Order Discount codes not found.";
        console.log("error:" + err);
      }
      );
  }

  callPODSCodes() {
    this.addFlag = true;
    this.displayFlag = false;
    this.errormsg = "";
    this.codeerrorMsg = "";
    this.descerrorMsg = "";
    this.code = "";
    this.description = "";
    this.pgTitle = "Add Purchase Order Discount Code";
  }
  addPODScodeback() {
    this.addFlag = false;
    this.displayFlag = true;
    this.code = "";
    this.description = "";
    this.getData();
    this.pgTitle = "Purchase Order Discount";
  }
  clearPODSaddcodes() {
    this.code = "";
    this.description = "";
    this.errormsg = "";
    this.codeerrorMsg = "";
    this.descerrorMsg = ""
  }
  savePODScode(value) {
    this.errormsg = "";
    this.codeerrorMsg = "";
    this.descerrorMsg = "";
    if (this.codeForm.valid) {
      if ((this.code || '').trim().length == 0) {
        this.codeerrorMsg = "Please enter valid input for Code.";
        return false;
      }
      if ((this.description || '').trim().length == 0) {
        this.descerrorMsg = "Please enter valid input for Description."
        return false;
      }
      var body = JSON.stringify({
        "Code": this.code,
        "Description": this.description,
        "StartDate": new Date(),
        "EndDate": null
      });

      this.PurchaseorderdiscountService.submitPODS(body)
        .subscribe(res => {
          this.addFlag = false;
          this.codesList = "";
          this.displayFlag = true;
          this.getData();
          this.pgTitle = "Purchase Order Discount";
          this.setPage(1);
        },
        err => {
          err = err
          console.log("Error" + err);
          this.errormsg = "Failed to save the code details.";
        }
        );
    }
  }
  editPODScodes(id, code, desc, startDate, endDate, isSystem) {
    this.editFlag = true;
    this.displayFlag = false;
    this.editcode = code;
    this.editdescription = desc;
    this.prevDescription = desc;
    var splitted = startDate.split("T", 2);
    this.effectiveDate = splitted[0];
    if (endDate || '') {
      splitted = '';
      splitted = endDate.split("T", 2);;
      this.discontinuedDate = splitted[0];
    }
    this.id = id;
    this.prevDiscDate = endDate;
    this.editerrormsg = "";
    this.editcodeerrorMsg = "";
    this.editdescerrorMsg = "";
    this.pgTitle = "Edit Purchase Order Discount Code";
  }
  updatePODSeditcode(code, value) {
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
        "StartDate": this.effectiveDate,
        "EndDate": this.discontinuedDate
      });
      this.PurchaseorderdiscountService.updatePODS(this.id, body)
        .subscribe(res => {
          this.editFlag = false;
          this.codesList = "";
          this.displayFlag = true;
          this.getData();
          this.id = "";
          this.pgTitle = "Purchase Order Discount";
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

  editPODScodeback() {
    this.editFlag = false;
    this.displayFlag = true;
    this.editcode = "";
    this.editdescription = "";
    this.getData();
    this.pgTitle = "Purchase Order Discount";
    this.id = "";
  }
  clearPODSsort() {
    this.sortby = "Code";
    this.sortorder = "asc";
  }

  clearPODSeditcodes() {
    this.editdescription = this.prevDescription;
    this.discontinuedDate = this.prevDiscDate;
    this.editerrormsg = "";
    this.editcodeerrorMsg = "";
    this.editdescerrorMsg = "";
  }

  sortPODScodes() {
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
    this.data = this.codesList.Data;
    
    
    return this.codesList.Data;
  }

}
