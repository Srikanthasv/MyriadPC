import { Component ,OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css', 'bootstrap.css']
})
export class AppComponent implements OnInit {
  title = 'app';
  
  username: string;
  user: boolean = false;

  constructor() {
  	 //alert("root");


}
ngOnInit() {
 var obj1 = JSON.parse(localStorage.getItem('currentUser'));
 //alert(obj1);
 if(obj1 != 'undefined' && obj1!= null){
    this.username = obj1.username;
    this.user=true;
   }
 }
//  public urlForm: FormGroup;
//  username = new FormControl('', [Validators.required]);
//password = new FormControl('', [Validators.required]);
}
