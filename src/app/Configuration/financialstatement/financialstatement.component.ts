import { Component, OnInit, ViewEncapsulation, Input, AfterContentInit, AfterViewInit, Renderer, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Pipe, PipeTransform } from '@angular/core';
import { Router } from '@angular/router';
import { Headers, Http, RequestOptions, Response } from '@angular/http';

import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { PagerService } from '../../_services/PagerService';
import { patternValidator } from '../../_services/pattern-validator';
import { FinstmtService } from '../../_services/finstmt.service';

@Component({
  selector: 'app-financialstatement',
  templateUrl: './financialstatement.component.html',
  styleUrls: ['../../../assets/css/configuration/configuration.css'],
  providers: [FinstmtService]
})
export class FinancialstatementComponent implements OnInit {
  pgTitle: string = "Financial Statement";
  public codesList: any = "";
  rowspage: number = 5;
  displayFlag: boolean = true;
  pager: any = {};
  pagedItems: any[];
  selectpage: number = 1;

  
  

  errorMsg: string = "";
  sortby: any;
  sortorder: any;
  public GLForm: FormGroup;

  editFlag: boolean = true;


  displayGLFlag: boolean = true;
  addGLflag: boolean = false;
  fromGL: any = "";
  fromGLSelected: any = "";
  toGL: any = "";
  toGLSelected: any = "";

  constructor(private fb: FormBuilder,
    private router: Router,
    private http: Http,
    private pagerService: PagerService,
    private FinstmtService: FinstmtService) { }

  ngOnInit() {
    this.GLForm = this.fb.group({
      'fromGL': [null, , Validators.compose([Validators.required])],
      'toGL': [null, , Validators.compose([Validators.required])],
      'fromGLSelected': [null, , Validators.compose([Validators.required])],
      'toGLSelected': [null, , Validators.compose([Validators.required])]
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

    //this.FinstmtService.getFinStmts()
    //  .subscribe(res => {
    //    this.codesList = res;
    //    this.data = this.codesList.Data;
    //    this.sortData();
    //  },
    //  err => {
    //    this.errorMsg = "Financial Statement(s) not found.";
    //    console.log("error:" + err);
    //  }
    //  );
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
  callGLdist()
  {
    this.displayGLFlag = false;
    this.addGLflag = true;
  }
}
