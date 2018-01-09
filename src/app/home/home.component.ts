import { Component, OnInit } from '@angular/core';

@Component({

  templateUrl: './home.component.html',
  styleUrls: ['../app.component.css']
})

export class HomeComponent implements OnInit
{
  username: string;
  user:boolean=false;
    constructor()
  {
    var obj1 = JSON.parse(localStorage.getItem('currentUser'));
    this.username = obj1.username;
    this.user=true;
  }
  ngOnInit() { 

  }

}
