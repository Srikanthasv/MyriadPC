import { Component, OnInit,NgZone } from '@angular/core';
import { AuthenticationServiceService } from '../_services/authentication-service.service';
import { Headers, Http, RequestOptions, Response } from '@angular/http';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
username: string;
user: boolean = false;
  
  constructor(private zone:NgZone,private authenticationService:AuthenticationServiceService ) {
    this.authenticationService.getLoggedIn.subscribe(name => this.changeName(name));
    
}
    private changeName(name: boolean): void {
        this.user = name;
    }

  ngOnInit() {
  	this.zone.run(() => {
  		//console.log('---');
var obj1 = JSON.parse(localStorage.getItem('currentUser'));
 //alert(obj1);
 if(obj1 != 'undefined' && obj1!= null){
    this.username = obj1.username;
    this.user=true;
   }
  	}); 
  }

}
