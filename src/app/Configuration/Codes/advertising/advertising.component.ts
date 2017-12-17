import { Component, OnInit,ViewEncapsulation } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Pipe, PipeTransform } from '@angular/core';


@Component({
  moduleId: module.id,
  selector: 'app-advertising',
 // templateUrl: './edit.component.html',
  //templateUrl: './Add.component.html',
  templateUrl: './advertising.component.html',
  styleUrls: ['./advertising.component.css', '../../../bootstrap.css']
})
export class AdvertisingComponent implements OnInit {

codesList:any;
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
editdescription:any;
editcode:any;
id:any;
//searchbox:boolean=true;
  constructor(private fb: FormBuilder) { 
	this.getData();
  this.sortby="Code";
	this.sortorder="asc";
  }
getData(){
	//integrate getcodesist service
	this.codesList={ 'Data': [ { 'Id': 1, 'Code': 'B', 'Description': 'BILLBOARD', 'StartDate': '2014-07-20T00:00:00', 'EndDate': null, 'TimeStamp': 'AAAAAAAYEBM=' }, { 'Id': 2, 'Code': 'CM', 'Description': 'CUSTOMER MAILER', 'StartDate': '2014-07-20T00:00:00', 'EndDate': null, 'TimeStamp': 'AAAAAAAYEBI=' }, { 'Id': 3, 'Code': 'CPN', 'Description': 'Coupon', 'StartDate': '2014-10-14T00:00:00', 'EndDate': null, 'TimeStamp': 'AAAAAAAYEBE=' }, { 'Id': 4, 'Code': 'EML', 'Description': 'Email', 'StartDate': '2014-10-14T00:00:00', 'EndDate': null, 'TimeStamp': 'AAAAAAAYEBA=' }, { 'Id': 5, 'Code': 'FB', 'Description': 'FaceBook', 'StartDate': '2014-09-17T00:00:00', 'EndDate': null, 'TimeStamp': 'AAAAAAAYEA8=' }, { 'Id': 6, 'Code': 'INT', 'Description': 'Interior Design spec magazine', 'StartDate': '2014-10-14T00:00:00', 'EndDate': null, 'TimeStamp': 'AAAAAAAYEA4=' }, { 'Id': 7, 'Code': 'N', 'Description': 'NEWSPAPER', 'StartDate': '2014-07-20T00:00:00', 'EndDate': null, 'TimeStamp': 'AAAAAAAYEA0=' }, { 'Id': 8, 'Code': 'NP', 'Description': 'NON PROFIT - MUST HAVE NP ID #', 'StartDate': '2014-07-20T00:00:00', 'EndDate': null, 'TimeStamp': 'AAAAAAAYEAw=' }, { 'Id': 9, 'Code': 'PIN', 'Description': 'Pinterest', 'StartDate': '2014-09-17T00:00:00', 'EndDate': null, 'TimeStamp': 'AAAAAAAYEAs=' }, { 'Id': 10, 'Code': 'R', 'Description': 'RADIO', 'StartDate': '2014-07-20T00:00:00', 'EndDate': null, 'TimeStamp': 'AAAAAAAYEAo=' }, { 'Id': 11, 'Code': 'RP', 'Description': 'REPEAT CUSTOMER', 'StartDate': '2014-07-20T00:00:00', 'EndDate': null, 'TimeStamp': 'AAAAAAAYEAk=' }, { 'Id': 12, 'Code': 'W', 'Description': 'WORD OF MOUTH', 'StartDate': '2014-07-20T00:00:00', 'EndDate': null, 'TimeStamp': 'AAAAAAAYEAg=' }, { 'Id': 13, 'Code': 'TWEET', 'Description': 'Twitter', 'StartDate': '2016-12-13T00:00:00', 'EndDate': null, 'TimeStamp': 'AAAAAAAYEAc=' } ], 'Total': 13, 'AggregateResults': null, 'Errors': null } ;

}
  ngOnInit() {

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
  	console.log("Codes entered");
  	this.addFlag=true;
  	this.displayFlag=false;
  	//this.code="";
	//this.description="";
  }
  savecode(value){
  	if (this.codeForm.valid)
    {
  	this.addFlag=false;
  	this.displayFlag=true;

//need to integrate the save code service here
  	this.getData();
  }
}
addcodeback(){
	this.addFlag=false;
  	this.displayFlag=true;
  	this.code="";
  	this.description="";
}
   editcodes(id,code,desc,startDate,endDate){
  	this.editFlag=true;
  	this.displayFlag=false;
  	this.editcode=code;
  	this.editdescription=desc;
  	var splitted = startDate.split("T", 2); 
  	this.effectiveDate=splitted[0];
  	this.id=id;
  }
saveeditcode(code,value){

  	if (this.codeeditForm.valid)
    {
  	this.editFlag=false;
  	this.displayFlag=true;
//vaues awi get in variables like this.id,this.editcode,this.editdescription,this.effectiveDate,this.discontinuedDate
//need to integrate the update code service here
  	this.getData();
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
  filter(){
  	  	//  this.searchbox=true;

  }
  sortcodes(){
  	let  orderType=this.sortorder
  	let currentField=this.sortby;
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

