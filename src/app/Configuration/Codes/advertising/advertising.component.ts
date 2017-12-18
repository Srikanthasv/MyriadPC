import { Component, OnInit, ViewEncapsulation, Input, AfterContentInit, AfterViewInit, Renderer, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Pipe, PipeTransform } from '@angular/core';
import { Router } from '@angular/router';
//import { ActivatedRoute, Params } from '@angular/router';
import { Headers, Http, RequestOptions, Response } from '@angular/http';


@Component({
  moduleId: module.id,
  selector: 'app-advertising',
  templateUrl: './advertising.component.html',
  styleUrls: ['./advertising.component.css', '../../../bootstrap.css']
})
export class AdvertisingComponent implements OnInit {

public codesList:any="";
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
//searchbox:boolean=true;

constructor(private fb: FormBuilder,
    private router: Router,
    private http: Http
) {
  this.sortby="Code";
  this.sortorder = "asc";
}

getData(){
	//integrate getcodesist service
  var obj1 = JSON.parse(localStorage.getItem('currentUser'));
  this.acToken = obj1 && obj1.token;
  var codes;
  //console.log("here:  " + this.acToken);
  var token = 'Bearer ';
  token = token.concat(this.acToken);
  console.log("token:  " + token);
  var headers = new Headers();
  headers.append("authorization", token);
  let options = new RequestOptions({ headers: headers });
  //console.log("options:  " +  options);
  this.http.get("http://pointcentricapi-local:5007/api/CustomerAdvertisingSource/", options)
    .map(res => res.json())
    .subscribe(res => this.codesList = res);
}

ngOnInit() {
  this.getData();
 // this.sortcodes();
      
  this.codeForm = this.fb.group({
      'code' : [null, Validators.compose([Validators.required])],
      'description' : [null, Validators.compose([Validators.required])],
      // Validators.pattern('[a-zA-Z ]*')
    });
  this.codeeditForm = this.fb.group({
      'editdescription' : [null, Validators.compose([Validators.required])],
      'discontinuedDate': [null, Validators.compose([Validators.required])],
      // Validators.pattern('[a-zA-Z ]*')
  });
  }
  callcodes(){  	
  	this.addFlag=true;
  	this.displayFlag=false;  	
  }
  savecode(value){
  	if (this.codeForm.valid)
    {
  	
    //need to integrate the save code service here
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
            console.log("res from Save:: " + JSON.stringify(data));
            this.http.get("http://pointcentricapi-local:5007/api/CustomerAdvertisingSource/", options)
              .map(res => res.json())
              .subscribe(res => this.codesList = res);
          },
          err => {
            err = err
            console.log(err);
          }
          );
        this.addFlag = false;
        this.codesList = "";
       // this.getData();

  	this.displayFlag=true;

  }
}
addcodeback(){
	this.addFlag=false;
  	this.displayFlag=true;
  	this.code="";
  	this.description="";
}
  editcodeback(){
    this.editFlag=false;
    this.displayFlag=true;
    this.editcode="";
    this.editdescription="";
}
   editcodes(id,code,desc,startDate,endDate){
  	this.editFlag=true;
  	this.displayFlag=false;
  	this.editcode=code;
    this.editdescription = desc;
    this.prevDescription = desc;
  	var splitted = startDate.split("T", 2); 
  	this.effectiveDate=splitted[0];
    this.id = id;
    this.prevDiscDate = endDate;
  }
saveeditcode(code,value){

  	if (this.codeeditForm.valid)
    {
  	this.editFlag=false;
  	this.displayFlag=true;
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
            this.http.get("http://pointcentricapi-local:5007/api/CustomerAdvertisingSource/", options)
              .map(res => res.json())
              .subscribe(res => this.codesList = res);          },
          err => {
            err = err
            console.log(err);
          }
          );
  	//this.getData();
  }
}
  clearsort(){
	this.sortby="Code";
	this.sortorder="asc";
  }
  clearaddcodes(){
	this.code="";
	this.description="";
  }
  cleareditcodes() {
    this.editdescription = this.prevDescription;
    this.discontinuedDate = this.prevDiscDate;
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
    return this.codesList.Data;
  }

  //text search ogic
    /*  transform(array: any[], query: string): any {
        if (query) {
            return _.filter(array, row=>row.name.indexOf(query) > -1);
        }
        return array;
    }*/
}

