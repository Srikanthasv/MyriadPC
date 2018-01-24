import { Component, OnInit, ViewEncapsulation, Input, AfterContentInit, AfterViewInit, Renderer, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Pipe, PipeTransform } from '@angular/core';
import { Router } from '@angular/router';
import { Headers, Http, RequestOptions, Response } from '@angular/http';
import { MatPaginator, MatSort, MatTableDataSource, MatPaginatorModule } from '@angular/material';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { PagerService } from '../../_services/PagerService';
import { CompaniesService } from '../../_services/companies.service';

@Component({
  moduleId: module.id,
  selector: 'app-companies',
  templateUrl: './companies.component.html',
  styleUrls: ['../../../assets/css/configuration/configuration.css'],
  providers: [CompaniesService]
})
export class CompaniesComponent implements OnInit {
  pgTitle: string = "Companies";
  public codesList: any = "";
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
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private fb: FormBuilder,
    private router: Router,
    private http: Http,
    private pagerService: PagerService,
    private CompaniesService: CompaniesService)
  {
    this.sortby = "Code";
    this.sortorder = "asc";
    //this.getData();
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

    this.AdditionalservicesService.getASData()
      .subscribe(res => {
        this.codesList = res;
        this.data = this.codesList.Data;
        this.dataSource = new MatTableDataSource(this.data);
        this.dataSource.paginator = this.paginator;
        this.sortAScodes();
      },
      err => {
        this.errorMsg = "Additional Services codes not found.";
        console.log("error:" + err);
      }
      );
  }
}
