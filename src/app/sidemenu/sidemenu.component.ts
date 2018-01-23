import { Component, OnInit } from '@angular/core';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { Router, NavigationEnd } from '@angular/router';

@Component({
selector: 'app-sidemenu',
templateUrl: './sidemenu.component.html',
styleUrls: ['./sidemenu.component.css']
})
export class SidemenuComponent implements OnInit {
pages: any = [];
ismenuactive: boolean = false;
active: boolean = false;
showMenu: boolean = false;
selected: any;
route: string;
page: string = "";
color: string = "#515253";

  constructor(location: Location, router: Router) {
    router.events.subscribe((val) => {
      if (location.path() != '') {
        this.route = location.path();
      } else {
        this.route = 'Home'
      }
    });
    //if (this.route != '' || this.route != null)
    //{
    //  var splitted = this.route.split("/");      
    //  console.log("Path1:: " + this.route + " :: " + splitted);
    //}
    
  
  this.pages = [
    {
      "title":"home",
      "icon": "home",
      "routeUrl": ['/home'],
      "category": "Dashboard",
      "subs": []
    },
    {
      "title": "",
      "icon": "shopping_cart",
      "routeUrl": [],
      "category": "Sales",
      "subs": []
    },
    {
      "title": "",
      "icon": "label",
      "routeUrl": [],
      "category": "Inventory",
      "subs": []
    },
    {
      "title": "",
      "icon": "layers",
      "routeUrl": [],
      "category": "Merchandising",
      "subs": []
    },
    {
      "title": "",
      "icon": "inbox",
      "routeUrl": [],
      "category": "A/R",
      "subs": []
    },
    {
      "title": "",
      "icon": "exposure",
      "routeUrl": [],
      "category": "Accounting",
      "subs": []
    },
    {
      "title": "",
      "icon": "exposure",
      "routeUrl": [],
      "category": "Reports",
      "subs": []
    },
    {
      "title": "",
      "icon": "settings",
      "routeUrl": [],
      "category": "Configuration",
      "subs": [
        {
          "title": "",
          "icon": "",
          "routeUrl": [],
          "subcategory": "Codes",
          "subs": [
            {
              "title": "advertising",
              "icon": "",
              "routeUrl": ['/app/configuration/codes/advertising'],
              "subcategory": "Advertising",
              "subs": []
            },
            {
              "title": "arfinance",
              "icon": "",
              "routeUrl": ['/app/configuration/codes/arfinance'],
              "subcategory": "A/R Finance",
              "subs": []
            },
            {
              "title": "Chargeback",
              "icon": "",
              "routeUrl": ['/app/configuration/codes/chargeback'],
              "subcategory": "Chargeback",
              "subs": []
            },
            {
              "title": "followup",
              "icon": "",
              "routeUrl": ['/app/configuration/codes/followup'],
              "subcategory": "Follow Up",
              "subs": []
            },
            {
              "title": "",
              "icon": "",
              "routeUrl": [],
              "subcategory": "Inventory",
              "subs": [
                {
                  "title": "inventoryadj",
                  "icon": "",
                  "routeUrl": ['/app/configuration/codes/inventory/inventoryadj'],
                  "subcategory": "Adjustment",
                  "subs": []
                },
                {
                  "title": "inventorystatus",
                  "icon": "",
                  "routeUrl": ['/app/configuration/codes/inventory/inventorystatus'],
                  "subcategory": "Status",
                  "subs": []
                },
                {
                  "title": "inventorytran",
                  "icon": "",
                  "routeUrl": ['/app/configuration/codes/inventory/inventorytran'],
                  "subcategory": "Transfer",
                  "subs": []
                }
              ]
            },
            {
              "title": "opportunity",
              "icon": "",
              "routeUrl": ['/app/configuration/codes/opportunity'],
              "subcategory": "Opportunity",
              "subs": []
            },
            {
              "title": "opportunityresult",
              "icon": "",
              "routeUrl": ['/app/configuration/codes/opportunityresult'],
              "subcategory": "Opportunity Result",
              "subs": []
            },
            {
              "title": "payablehold",
              "icon": "",
              "routeUrl": ['/app/configuration/codes/payablehold'],
              "subcategory": "Payable Hold",
              "subs": []
            },
            {
              "title": "",
              "icon": "",
              "routeUrl": [],
              "subcategory": "Model",
              "subs": [
                {
                  "title": "modelcost",
                  "icon": "",
                  "routeUrl": ['/app/configuration/codes/modelcost'],
                  "subcategory": "Cost",
                  "subs": []
                },
                {
                  "title": "modeldiscontd",
                  "icon": "",
                  "routeUrl": ['/app/configuration/codes/modeldiscontd'],
                  "subcategory": "Discontinued",
                  "subs": []
                },
                {
                  "title": "modelprice",
                  "icon": "",
                  "routeUrl": ['/app/configuration/codes/modelprice'],
                  "subcategory": "Price",
                  "subs": []
                },
                {
                  "title": "modelpromo",
                  "icon": "",
                  "routeUrl": ['/app/configuration/codes/modelpromo'],
                  "subcategory": "Promotion",
                  "subs": []
                }
              ]
            },
            {
              "title": "purchaseorder",
              "icon": "",
              "routeUrl": ['/app/configuration/codes/purchaseorder'],
              "subcategory": "Purchase Order",
              "subs": []
            },
            {
              "title": "purchaseorderdiscount",
              "icon": "",
              "routeUrl": ['/app/configuration/codes/purchaseorderdiscount'],
              "subcategory": "Purchase Order Discount",
              "subs": []
            },
            {
              "title": "sodiscount",
              "icon": "",
              "routeUrl": ['/app/configuration/codes/sodiscount'],
              "subcategory": "Sales Order Discount",
              "subs": []
            },
            {
              "title": "soreferral",
              "icon": "",
              "routeUrl": ['/app/configuration/codes/soreferral'],
              "subcategory": "Sales Order Referral",
              "subs": []
            },
            {
              "title": "returnreason",
              "icon": "",
              "routeUrl": ['/app/configuration/codes/returnreason'],
              "subcategory": "Return Reason",
              "subs": []
            },
            {
              "title": "salesservicepersontype",
              "icon": "",
              "routeUrl": ['/app/configuration/codes/salesservicepersontype'],
              "subcategory": "Sales/Service Person",
              "subs": []
            },
            {
              "title": "serviceorder",
              "icon": "",
              "routeUrl": ['/app/configuration/codes/serviceorder'],
              "subcategory": "Service Order",
              "subs": []
            },
            {
              "title": "serviceorderreason",
              "icon": "",
              "routeUrl": ['/app/configuration/codes/serviceorderreason'],
              "subcategory": "Service Order Reason",
              "subs": []
            }
          ]
        }
      ]
    },
    {
      "title": "",
      "icon": "build",
      "routeUrl": [],
      "category": "System",
      "subs": []
    }

  ];

  }
  
  ngOnInit() {
    console.log("init:: active::" + this.ismenuactive);
  }


  
  toggleView(ary, data, index) {
    //console.log("Path:: " + this.route);
    if (this.route != '')
    {
      console.log("Path :: " + this.route);
      var splitted = this.route.split("/");
      this.page = splitted[splitted.length - 1];
      //console.log("page :: " + this.page);
      //console.log("page1 :: " + data.title);
      if (this.page === data.title)
      {this.color = "#2196f3";}
      else
      { this.color = "#515253";}
    }
    for (var i = 0; i < ary.length; i++) {

      if (i != index) {
        ary[i].expanded = false;
       
      }
      else {
        data.expanded = !data.expanded;
               
        //console.log("index:: active::" + this.ismenuactive);
      }
    }

  }

}
