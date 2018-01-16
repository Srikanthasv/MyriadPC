import { Component, OnInit } from '@angular/core';

@Component({
selector: 'app-sidemenu',
templateUrl: './sidemenu.component.html',
styleUrls: ['./sidemenu.component.css']
})
export class SidemenuComponent implements OnInit {
sidenavArray:any=[];
pages:any=[];
showLevel1 = null;
showLevel2 = null;
showLevel3 = null;
active: boolean = false;
showMenu: boolean = false;

selected: any;
constructor() {
    
  

this.sidenavArray=[
{
	"icon":"home",
	"routeUrl":['/home'],
	"desc":"Dashboard",
	"submenu":[]
},
{
	"icon":"shopping_cart",
	"routeUrl":[],
	"desc":"Sales",
	"submenu":[]
},
{
	"icon":"label",
	"routeUrl":[],
	"desc":"Inventory",
	"submenu":[]
},
{
	"icon":"layers",
	"routeUrl":[],
	"desc":"Merchandising",
	"submenu":[]
},
{
	"icon":"inbox",
	"routeUrl":[],
	"desc":"A/R",
	"submenu":[]
},
{
	"icon":"exposure",
	"routeUrl":[],
	"desc":"Accounting",
	"submenu":[]
},
{
	"icon":"exposure",
	"routeUrl":[],
	"desc":"Reports",
	"submenu":[]
},
{
	"icon":"settings",
	"routeUrl":[],
	"desc":"Configuration",
	"submenu":[
		{
			"icon":"",
			"routeUrl":[],
			"desc":"Codes",
			"submenu":[
				{
					"icon":"",
					"routeUrl":['/app/configuration/codes/advertising'],
					"desc":"Advertising",
					"submenu":[]
				},
				{
					"icon":"",
					"routeUrl":['/app/configuration/codes/arfinance'],
					"desc":"A/R Finance",
					"submenu":[]
        },
        {
          "icon": "",
          "routeUrl": ['/app/configuration/codes/chargeback'],
          "desc": "Chargeback",
          "submenu": []
        },
        {
          "icon": "",
          "routeUrl": ['/app/configuration/codes/followup'],
          "desc": "Follow Up",
          "submenu": []
        },
        {
          "icon": "",
          "routeUrl": [],
          "desc": "Inventory",
          "submenu": [
            {
              "icon": "",
              "routeUrl": ['/app/configuration/codes/inventory/inventoryadj'],
              "desc": "Adjustment",
              "submenu": []
            },
            {
              "icon": "",
              "routeUrl": ['/app/configuration/codes/inventory/inventorystatus'],
              "desc": "Status",
              "submenu": []
            },
            {
              "icon": "",
              "routeUrl": ['/app/configuration/codes/inventory/inventorytran'],
              "desc": "Transfer",
              "submenu": []
            }
          ]
        },
        {
          "icon": "",
          "routeUrl": ['/app/configuration/codes/opportunity'],
          "desc": "Opportunity",
          "submenu": []
        },
        {
          "icon": "",
          "routeUrl": ['/app/configuration/codes/opportunityresult'],
          "desc": "Opportunity Result",
          "submenu": []
        },
        {
          "icon": "",
          "routeUrl": ['/app/configuration/codes/payablehold'],
          "desc": "Payable Hold",
          "submenu": []
        },
        {
          "icon": "",
          "routeUrl": [],
          "desc": "Model",
          "submenu": [
            {
              "icon": "",
              "routeUrl": ['/app/configuration/codes/modelcost'],
              "desc": "Cost",
              "submenu": []
            },
            {
              "icon": "",
              "routeUrl": ['/app/configuration/codes/modeldiscontd'],
              "desc": "Discontinued",
              "submenu": []
            },
            {
              "icon": "",
              "routeUrl": ['/app/configuration/codes/modelprice'],
              "desc": "Price",
              "submenu": []
            },
            {
              "icon": "",
              "routeUrl": ['/app/configuration/codes/modelpromo'],
              "desc": "Promotion",
              "submenu": []
            }
          ]
        },
        {
          "icon": "",
          "routeUrl": ['/app/configuration/codes/purchaseorder'],
          "desc": "Purchase Order",
          "submenu": []
        },
        {
          "icon": "",
          "routeUrl": ['/app/configuration/codes/purchaseorderdiscount'],
          "desc": "Purchase Order Discount",
          "submenu": []
        },
        {
          "icon": "",
          "routeUrl": ['/app/configuration/codes/sodiscount'],
          "desc": "Sales Order Discount",
          "submenu": []
        },
        {
          "icon": "",
          "routeUrl": ['/app/configuration/codes/soreferral'],
          "desc": "Sales Order Referral",
          "submenu": []
        },
        {
          "icon": "",
          "routeUrl": ['/app/configuration/codes/returnreason'],
          "desc": "Return Reason",
          "submenu": []
        },
        {
          "icon": "",
          "routeUrl": ['/app/configuration/codes/salesservicepersontype'],
          "desc": "Sales/Service Person",
          "submenu": []
        },
        {
          "icon": "",
          "routeUrl": ['/app/configuration/codes/serviceorder'],
          "desc": "Service Order",
          "submenu": []
        },
        {
          "icon": "",
          "routeUrl": ['/app/configuration/codes/serviceorderreason'],
          "desc": "Service Order Reason",
          "submenu": []
        }
	]
	}
	]
},
{
  "icon": "build",
  "routeUrl": [],
  "desc": "System",
  "submenu": []
}

  ];

  this.pages = [
    {
      "icon": "home",
      "routeUrl": ['/home'],
      "category": "Dashboard",
      "subs": []
    },
    {
      "icon": "shopping_cart",
      "routeUrl": [],
      "category": "Sales",
      "subs": []
    },
    {
      "icon": "label",
      "routeUrl": [],
      "category": "Inventory",
      "subs": []
    },
    {
      "icon": "layers",
      "routeUrl": [],
      "category": "Merchandising",
      "subs": []
    },
    {
      "icon": "inbox",
      "routeUrl": [],
      "category": "A/R",
      "subs": []
    },
    {
      "icon": "exposure",
      "routeUrl": [],
      "category": "Accounting",
      "subs": []
    },
    {
      "icon": "exposure",
      "routeUrl": [],
      "category": "Reports",
      "subs": []
    },
    {
      "icon": "settings",
      "routeUrl": [],
      "category": "Configuration",
      "subs": [
        {
          "icon": "",
          "routeUrl": [],
          "subcategory": "Codes",
          "manufactures": [
            {
              "icon": "",
              "routeUrl": ['/app/configuration/codes/advertising'],
              "manufacture": "Advertising",
              "subs": []
            },
            {
              "icon": "",
              "routeUrl": ['/app/configuration/codes/arfinance'],
              "manufacture": "A/R Finance",
              "subs": []
            },
            {
              "icon": "",
              "routeUrl": ['/app/configuration/codes/chargeback'],
              "manufacture": "Chargeback",
              "subs": []
            },
            {
              "icon": "",
              "routeUrl": ['/app/configuration/codes/followup'],
              "manufacture": "Follow Up",
              "subs": []
            },
            {
              "icon": "",
              "routeUrl": [],
              "manufacture": "Inventory",
              "subcat": [
                {
                  "icon": "",
                  "routeUrl": ['/app/configuration/codes/inventory/inventoryadj'],
                  "cat": "Adjustment",
                  "subs": []
                },
                {
                  "icon": "",
                  "routeUrl": ['/app/configuration/codes/inventory/inventorystatus'],
                  "cat": "Status",
                  "subs": []
                },
                {
                  "icon": "",
                  "routeUrl": ['/app/configuration/codes/inventory/inventorytran'],
                  "cat": "Transfer",
                  "subs": []
                }
              ]
            },
            {
              "icon": "",
              "routeUrl": ['/app/configuration/codes/opportunity'],
              "manufacture": "Opportunity",
              "subs": []
            },
            {
              "icon": "",
              "routeUrl": ['/app/configuration/codes/opportunityresult'],
              "manufacture": "Opportunity Result",
              "subs": []
            },
            {
              "icon": "",
              "routeUrl": ['/app/configuration/codes/payablehold'],
              "manufacture": "Payable Hold",
              "subs": []
            },
            {
              "icon": "",
              "routeUrl": [],
              "manufacture": "Model",
              "subcat": [
                {
                  "icon": "",
                  "routeUrl": ['/app/configuration/codes/modelcost'],
                  "cat": "Cost",
                  "subs": []
                },
                {
                  "icon": "",
                  "routeUrl": ['/app/configuration/codes/modeldiscontd'],
                  "cat": "Discontinued",
                  "subs": []
                },
                {
                  "icon": "",
                  "routeUrl": ['/app/configuration/codes/modelprice'],
                  "cat": "Price",
                  "subs": []
                },
                {
                  "icon": "",
                  "routeUrl": ['/app/configuration/codes/modelpromo'],
                  "cat": "Promotion",
                  "subs": []
                }
              ]
            },
            {
              "icon": "",
              "routeUrl": ['/app/configuration/codes/purchaseorder'],
              "manufacture": "Purchase Order",
              "subs": []
            },
            {
              "icon": "",
              "routeUrl": ['/app/configuration/codes/purchaseorderdiscount'],
              "manufacture": "Purchase Order Discount",
              "subs": []
            },
            {
              "icon": "",
              "routeUrl": ['/app/configuration/codes/sodiscount'],
              "manufacture": "Sales Order Discount",
              "subs": []
            },
            {
              "icon": "",
              "routeUrl": ['/app/configuration/codes/soreferral'],
              "manufacture": "Sales Order Referral",
              "subs": []
            },
            {
              "icon": "",
              "routeUrl": ['/app/configuration/codes/returnreason'],
              "manufacture": "Return Reason",
              "subs": []
            },
            {
              "icon": "",
              "routeUrl": ['/app/configuration/codes/salesservicepersontype'],
              "manufacture": "Sales/Service Person",
              "subs": []
            },
            {
              "icon": "",
              "routeUrl": ['/app/configuration/codes/serviceorder'],
              "manufacture": "Service Order",
              "subs": []
            },
            {
              "icon": "",
              "routeUrl": ['/app/configuration/codes/serviceorderreason'],
              "manufacture": "Service Order Reason",
              "subs": []
            }
          ]
        }
      ]
    },
    {
      "icon": "build",
      "routeUrl": [],
      "category": "System",
      "subs": []
    }

  ];


  }


  changeShowStatus(item)
  {
  //this.showMenu = !this.showMenu;
    return item = !item;
}

ngOnInit() {
}

  toggleLevel1(idx)
  {
    if (this.isLevel1Shown(idx)) {
       this.showLevel1 = null;
    }
    else
    {
      this.showLevel1 = idx;      
    }
};

  toggleLevel2(idx) {
  if (this.isLevel2Shown(idx))
  {
    this.showLevel1 = null;
    this.showLevel2 = null;
  }
  else
  {
    this.showLevel1 = idx;
    this.showLevel2 = idx;
    this.active = true;
  }

};

toggleLevel3(idx)
{
  console.log("Level3:: " + idx);
  if (this.isLevel3Shown(idx)) {
    this.showLevel1 = null;
    this.showLevel2 = null;
    this.showLevel3 = null;
  }
  else {
    this.showLevel1 = idx;
    this.showLevel2 = idx;
    this.showLevel3 = idx;
  }
}
  isLevel1Shown(idx)
  {
    
    return this.showLevel1 === idx;
  };

  isLevel2Shown(idx) {
  return this.showLevel2 === idx;
  };

  isLevel3Shown(idx) {
    //console.log("Level3:: " + this.showLevel3 === idx);
    return this.showLevel3 === idx;
  };
  select(item) {
    this.selected = (this.selected === item ? null : item);    
  }
  isActive(item) {
    //console.log("Item:: " + item + " :: " + this.selected === item);
    return this.selected === item;
  }
}
