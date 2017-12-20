import { Component, OnInit, ViewEncapsulation, Input, AfterContentInit, AfterViewInit, Renderer, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Pipe, PipeTransform } from '@angular/core';
import { Router } from '@angular/router';
//import { ActivatedRoute, Params } from '@angular/router';
import { Headers, Http, RequestOptions, Response } from '@angular/http';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';


@Component({
  moduleId: module.id,
  selector: 'app-advertising',
  templateUrl: './advertising.component.html',
  styleUrls: ['./advertising.component.css', '../../../bootstrap.css']
})
export class AdvertisingComponent implements OnInit {

displayedColumns = ['Id', 'Code', 'Description','StartDate', 'EndDate','TimeStamp'];
dataSource: MatTableDataSource<CodeData>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

public codesList:any="";
//this.codesList={ 'Data': [ { 'Id': 1, 'Code': 'B', 'Description': 'BILLBOARD', 'StartDate': '2014-07-20T00:00:00', 'EndDate': null, 'TimeStamp': 'AAAAAAAYEBM=' }, { 'Id': 2, 'Code': 'CM', 'Description': 'CUSTOMER MAILER', 'StartDate': '2014-07-20T00:00:00', 'EndDate': null, 'TimeStamp': 'AAAAAAAYEBI=' }, { 'Id': 3, 'Code': 'CPN', 'Description': 'Coupon', 'StartDate': '2014-10-14T00:00:00', 'EndDate': null, 'TimeStamp': 'AAAAAAAYEBE=' }, { 'Id': 4, 'Code': 'EML', 'Description': 'Email', 'StartDate': '2014-10-14T00:00:00', 'EndDate': null, 'TimeStamp': 'AAAAAAAYEBA=' }, { 'Id': 5, 'Code': 'FB', 'Description': 'FaceBook', 'StartDate': '2014-09-17T00:00:00', 'EndDate': null, 'TimeStamp': 'AAAAAAAYEA8=' }, { 'Id': 6, 'Code': 'INT', 'Description': 'Interior Design spec magazine', 'StartDate': '2014-10-14T00:00:00', 'EndDate': null, 'TimeStamp': 'AAAAAAAYEA4=' }, { 'Id': 7, 'Code': 'N', 'Description': 'NEWSPAPER', 'StartDate': '2014-07-20T00:00:00', 'EndDate': null, 'TimeStamp': 'AAAAAAAYEA0=' }, { 'Id': 8, 'Code': 'NP', 'Description': 'NON PROFIT - MUST HAVE NP ID #', 'StartDate': '2014-07-20T00:00:00', 'EndDate': null, 'TimeStamp': 'AAAAAAAYEAw=' }, { 'Id': 9, 'Code': 'PIN', 'Description': 'Pinterest', 'StartDate': '2014-09-17T00:00:00', 'EndDate': null, 'TimeStamp': 'AAAAAAAYEAs=' }, { 'Id': 10, 'Code': 'R', 'Description': 'RADIO', 'StartDate': '2014-07-20T00:00:00', 'EndDate': null, 'TimeStamp': 'AAAAAAAYEAo=' }, { 'Id': 11, 'Code': 'RP', 'Description': 'REPEAT CUSTOMER', 'StartDate': '2014-07-20T00:00:00', 'EndDate': null, 'TimeStamp': 'AAAAAAAYEAk=' }, { 'Id': 12, 'Code': 'W', 'Description': 'WORD OF MOUTH', 'StartDate': '2014-07-20T00:00:00', 'EndDate': null, 'TimeStamp': 'AAAAAAAYEAg=' }, { 'Id': 13, 'Code': 'TWEET', 'Description': 'Twitter', 'StartDate': '2016-12-13T00:00:00', 'EndDate': null, 'TimeStamp': 'AAAAAAAYEAc=' } ], 'Total': 13, 'AggregateResults': null, 'Errors': null } ;

  public codeForm: FormGroup;
  codeeditForm: FormGroup;
addFlag:boolean=false;
displayFlag:boolean=true;
sortby:any;
sortorder:any;
code:any;
description:any;
editFlag:boolean=false;
effectiveDate:any;
discontinuedDate:any;
editdescription: any;
prevDescription: any;
prevDiscDate: any;
editcode:any;
id: any;
acToken: any;
codeerrorMsg: string ='';
descerrorMsg: string = '';
editcodeerrorMsg: string = '';
editdescerrorMsg: string = '';
errormsg: string;
bReturn: boolean = false;
editerrormsg: string = "";
pgTitle: string = "Advertising";
minDate: Date;
//searchbox:boolean=true;
  
data: any[];
constructor(private fb: FormBuilder,
    private router: Router,
    private http: Http
) {
  this.sortby="Code";
  this.sortorder = "asc";
  //this.minDate = new Date();
  
 // this.getData1();
}

getData(){
	//integrate getcodesist service
  var obj1 = JSON.parse(localStorage.getItem('currentUser'));
  this.acToken = obj1 && obj1.token;
  var codes;
  var token = 'Bearer ';
  token = token.concat(this.acToken);
  console.log("token:  " + token);
  var headers = new Headers();
  headers.append("authorization", token);
  let options = new RequestOptions({ headers: headers });
  //console.log("options:  " +  options);
  this.http.get("http://pointcentricapi-local:5007/api/CustomerAdvertisingSource/", options)
    .map(res => res.json())
    .subscribe(res => {
      this.codesList = res;
      console.log("codeist:  " + this.codesList.Data);
      this.data = this.codesList.Data;
      this.dataSource = new MatTableDataSource(this.data);
      this.dataSource.paginator = this.paginator;
      this.sortcodes();
    });


}

ngOnInit() {
  this.getData();
  
	
  this.codeForm = this.fb.group({
      'code' : [null, Validators.compose([Validators.required])],
      'description': [null, Validators.compose([Validators.required])],
      // Validators.pattern('[a-zA-Z ]*')
    });
  this.codeeditForm = this.fb.group({
      'editdescription' : [null, Validators.compose([Validators.required])],
     // 'discontinuedDate': [null, Validators.compose([Validators.required])],
      // Validators.pattern('[a-zA-Z ]*')
  });
}

callcodes()
{  	
    this.addFlag=true;
    this.displayFlag = false;
    this.errormsg = "";
    this.codeerrorMsg = "";
    this.descerrorMsg = "";
    this.code = "";
    this.description = "";
    this.pgTitle = "Add Advertising";
 }
addcodeback()
{
	this.addFlag=false;
  	this.displayFlag=true;
  	this.code="";
  	this.description="";
        this.getData();
        this.pgTitle = "Advertising";
}
clearaddcodes() {
  this.code = "";
  this.description = "";
  this.errormsg = "";
  this.codeerrorMsg = "";
  this.descerrorMsg = ""
}
savecode(value)
{
      this.errormsg = "";
      this.codeerrorMsg = "";
      this.descerrorMsg = "";
      if (this.codeForm.valid) {
      if ((this.code || '').trim().length === 0) {
        this.codeerrorMsg = "Please enter valid input for Code.";
        return false;
      }
      if ((this.description || '').trim().length === 0) {
        this.descerrorMsg = "Please enter valid input for Description."
        return false;
      }
      var body = JSON.stringify({ "Code": this.code, "Description": this.description, "StartDate": new Date(), "EndDate": null });

      var obj1 = JSON.parse(localStorage.getItem('currentUser'));
      var token = 'Bearer ';
      token = token.concat(obj1 && obj1.token);
      console.log("token in Save:  " + token);
      var headers = new Headers();
      headers.append("Content-Type", "application/json");
      headers.append("authorization", token);
      let options = new RequestOptions({ headers: headers });
      //console.log("options:  " +  options);
      this.http.post("http://pointcentricapi-local:5007/api/CustomerAdvertisingSource", body, options)
        .map(res => res.json())
        .subscribe(
        data => {
          //console.log("res from Save:: " + JSON.stringify(data));
          //console.log("Save Success:: ");
          this.addFlag = false;
          this.codesList = "";
          this.displayFlag = true;
          this.getData();
          this.pgTitle = "Advertising";
        },
        err => {
          err = err
          console.log("Error" + err);
          this.errormsg = "Failed to save the code details.";
        }
        );

    }
  }
editcodes(id, code, desc, startDate, endDate)
{
  	this.editFlag=true;
  	this.displayFlag=false;
  	this.editcode=code;
    this.editdescription = desc;
    this.prevDescription = desc;
  	var splitted = startDate.split("T", 2); 
    this.effectiveDate = splitted[0];    
    //if (endDate || '')
    //{
    //  splitted = '';
    //  console.log("End Date:: " + endDate);
    //  splitted = endDate.split("T", 2);;
    //  console.log("End Date1:: " + splitted);
    //  this.discontinuedDate = new Date(splitted[0]);
    //}
    this.discontinuedDate = endDate;
    this.id = id;
    this.prevDiscDate = endDate;
    this.editerrormsg = "";
    this.editcodeerrorMsg = "";
    this.editdescerrorMsg = "";
    this.pgTitle = "Edit Advertising";
  }
saveeditcode(code, value)
   {
      this.editerrormsg = "";
        if (this.codeeditForm.valid)
        {
          if ((this.editcode || '').trim().length === 0) {
            this.editcodeerrorMsg = "Please enter valid input for Code."
            return false;
          }
          if ((this.editdescription || '').trim().length === 0) {
            this.editdescerrorMsg = "Please enter valid input for Description."
            return false;
          }
          //if ((this.effectiveDate || '').trim().length > 0)
          //{

          //}

  	    this.editFlag=false;
            this.displayFlag = true;
            console.log("Discont Date:: " + this.discontinuedDate);
        //vaues awi get in variables like this.id,this.editcode,this.editdescription,this.effectiveDate,this.discontinuedDate
        //need to integrate the update code service here
        var body = JSON.stringify({ "Id": this.id, "Code": this.editcode, "Description": this.editdescription, "StartDate": this.effectiveDate, "EndDate": this.discontinuedDate });
        console.log("ID:  " + this.id);
        var obj1 = JSON.parse(localStorage.getItem('currentUser'));
        var token = 'Bearer ';
        token = token.concat(obj1 && obj1.token);
        console.log("token in edit:  " + token);
        var strUrl = "http://pointcentricapi-local:5007/api/CustomerAdvertisingSource/";
        strUrl = strUrl.concat(this.id)
        var headers = new Headers();
        headers.append("Content-Type", "application/json");
        headers.append("authorization", token);
        let options = new RequestOptions({ headers: headers });
        //console.log("options:  " +  options);
        this.http.put( strUrl , body, options)
          .map(res => res.json())
          .subscribe(
          data => {
            //console.log("res from Save:: " + JSON.stringify(data));
            this.editFlag = false;
            this.codesList = "";
            this.displayFlag = true;
            this.getData();
            this.id = "";
            this.pgTitle = "Advertising";
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
  this.pgTitle = "Advertising";
  this.id = "";
}
  clearsort(){
	  this.sortby="Code";
    this.sortorder = "asc";
  }
 
  cleareditcodes() {
    this.editdescription = this.prevDescription;
    this.discontinuedDate = this.prevDiscDate;
    this.editerrormsg = "";
    this.editcodeerrorMsg = "";
    this.editdescerrorMsg = "";
  }
  
  sortcodes(){
  	let  orderType=this.sortorder
        let currentField = this.sortby;
        console.log("Order:: " + this.sortorder);
        console.log("sort:: " + this.sortby);
  	 // this.searchbox=false;

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
    this.dataSource = new MatTableDataSource(this.data);
    this.dataSource.paginator = this.paginator;
    return this.codesList.Data;
  }

  //text search ogic
    /*  transform(array: any[], query: string): any {
        if (query) {
            return _.filter(array, row=>row.name.indexOf(query) > -1);
        }
        return array;
    }*/
      ngAfterViewInit() {
  }
}

export interface CodeData {
  Id: any;
  Code: any;
  StartDate: any;
  EndDate: any;
  Description:any;
  TimeStamp:any;
}
