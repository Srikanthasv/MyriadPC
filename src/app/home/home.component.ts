import { Component, OnInit } from '@angular/core';

@Component({

  templateUrl: './home.component.html',
  styleUrls: ['../app.component.css', '../bootstrap.css']
})

export class HomeComponent implements OnInit
{
  username: string;
  constructor()
  {
    //var obj1 = JSON.parse(localStorage.getItem('currentUser'));
    //this.username = obj1.username;
  }
  ngOnInit() { }

}
