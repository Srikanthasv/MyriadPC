import { Component, OnInit, ViewEncapsulation, Input, AfterContentInit, AfterViewInit, Renderer, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Pipe, PipeTransform } from '@angular/core';
import { Router } from '@angular/router';
import { Headers, Http, RequestOptions, Response } from '@angular/http';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { PagerService } from '../../../../_services/PagerService';
import { InventoryStatusService } from '../../../../_services/inventorystatus.service';

@Component({
  selector: 'app-inventorystatus',
  templateUrl: './inventorystatus.component.html',
  styleUrls: ['../../../../../assets/css/configuration/configuration.css'],
  providers: [InventoryStatusService]
})
export class InventorystatusComponent implements OnInit {

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
  IsSellable: boolean = false;
  NeedApproval: boolean = false;
  editIsSellable: boolean = false;
  editNeedApproval: boolean = false;
  checked = false;

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
  pgTitle: string = "Inventory Status";
  minDate: Date;
  pager: any = {};
  pagedItems: any[];
  selectpage: number = 1;
  rowspage: number = 5;

  constructor(private fb: FormBuilder,
    private router: Router,
    private http: Http,
    private InventoryStatusService: InventoryStatusService, private pagerService: PagerService) {
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
      'description': [null, Validators.compose([Validators.required])],
      'IsSellable': [null],
      'NeedApproval': [null]
    });
    this.codeeditForm = this.fb.group({
      'editdescription': [null, Validators.compose([Validators.required])],
      // 'discontinuedDate': [null, Validators.compose([Validators.required])],
      // Validators.pattern('[a-zA-Z ]*')
    });
  }

  getData() {

    this.InventoryStatusService.getISData()
      .subscribe(res => {
        this.codesList = res;
        this.data = this.codesList.Data;
        
        
        this.sortIScodes();
      },
      err => {
        this.errorMsg = "Chargeback codes not found.";
        console.log("error:" + err);
      }
      );
  }

  callISCodes() {
    this.addFlag = true;
    this.displayFlag = false;
    this.errormsg = "";
    this.codeerrorMsg = "";
    this.descerrorMsg = "";
    this.code = "";
    this.description = "";
    this.pgTitle = "Add Inventory Status Code";
  }
  addIScodeback() {
    this.addFlag = false;
    this.displayFlag = true;
    this.code = "";
    this.description = "";
    this.getData();
    this.pgTitle = "Inventory Status";
  }
  clearISaddcodes() {
    this.code = "";
    this.description = "";
    this.errormsg = "";
    this.codeerrorMsg = "";
    this.descerrorMsg = ""
  }
  saveIScode(value) {
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
        "IsSellable": this.IsSellable,
        "NeedApproval": this.NeedApproval,
        "StartDate": new Date(),
        "EndDate": null
      });

      this.InventoryStatusService.submitIS(body)
        .subscribe(res => {
          this.addFlag = false;
          this.codesList = "";
          this.displayFlag = true;
          this.getData();
          this.pgTitle = "Inventory Status";
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
  editIScodes(id, code, desc, startDate, endDate, isSellable, needApproval) {
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
    this.editIsSellable = isSellable;
    this.editNeedApproval = needApproval;
    this.prevDiscDate = endDate;
    this.editerrormsg = "";
    this.editcodeerrorMsg = "";
    this.editdescerrorMsg = "";
    this.pgTitle = "Edit Inventory Status Code";
  }
  updateISeditcode(code, value) {
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
        "IsSellable": this.editIsSellable,
        "NeedApproval": this.editNeedApproval,
        "StartDate": this.effectiveDate,
        "EndDate": this.discontinuedDate
      });
      this.InventoryStatusService.updateIS(this.id, body)
        .subscribe(res => {
          this.editFlag = false;
          this.codesList = "";
          this.displayFlag = true;
          this.getData();
          this.id = "";
          this.pgTitle = "Inventory Status";
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

  editIScodeback() {
    this.editFlag = false;
    this.displayFlag = true;
    this.editcode = "";
    this.editdescription = "";
    this.getData();
    this.pgTitle = "Inventory Status";
    this.id = "";
  }
  clearISsort() {
    this.sortby = "Code";
    this.sortorder = "asc";
  }

  clearISeditcodes() {
    this.editdescription = this.prevDescription;
    this.discontinuedDate = this.prevDiscDate;
    this.editerrormsg = "";
    this.editcodeerrorMsg = "";
    this.editdescerrorMsg = "";
  }

  sortIScodes() {
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

