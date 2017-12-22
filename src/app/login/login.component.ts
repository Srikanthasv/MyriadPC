import { Component, OnInit, Input, AfterContentInit, AfterViewInit, Renderer, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';
import { Headers, Http, RequestOptions, Response } from '@angular/http';
import { User } from './user';
import { LoginService } from '../_services/login.service';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map'


@Component({
  moduleId: module.id,
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['../app.component.css','../bootstrap.css']
})


export class LoginComponent implements OnInit {
  public loginForm: FormGroup;
formSubmitted: boolean = false;
  public user = new User('', '');
  public token: string;
  public errorMsg = '';
  
  constructor(private route: ActivatedRoute,
    private router: Router,
    private loginService: LoginService,
    private http: Http,
    private fb: FormBuilder) {
    this.errorMsg = '';
  }

  ngOnInit() {
    this.loginForm = this.fb.group({
      'username' : [null, Validators.compose([Validators.required])],
      'password' : [null, Validators.compose([Validators.required])],
    });
    this.loginService.logout();
  }
  onSubmit(form:any) {
    if (this.loginForm.valid)
    {
      let link = ['/home'];
    if (form.username != '' || form.password != '') {
      this.loginService.login(form.username, form.password)
        .subscribe(res => {
          this.router.navigate(link);
        },
        err => {
          this.errorMsg = "Login Unsuccessful. Invalid Username or Password. Please try again.";
          console.log("error:" + err);
        },
        () => this.router.navigate(link)
        );
    }
  }
}

}
