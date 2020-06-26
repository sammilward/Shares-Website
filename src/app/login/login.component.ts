import { Component, OnInit } from '@angular/core';
import { UserServiceService } from '../userservice/user-service.service';
import { SingleUserResponse } from '../userservice/single-user-response';
import { Router } from '@angular/router';
import { NewUserRequest } from '../userservice/new-user-request';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginUsername: string;
  loginPassword: string;

  registerUsername: string;
  registerPassword: string;
  registerPrefferedCurrency: string;

  currentUser: SingleUserResponse;
  loginErrorMessage: string;
  registerErrorMessage: string;

  apiDown: boolean = false;

  constructor(private userservice: UserServiceService,
              private router: Router) { }

  ngOnInit() {
  }

  login(): void {
    this.userservice.login(this.loginUsername, this.loginPassword).subscribe({
      next: result => {
        this.currentUser = result;
        this.userservice.setCurrentUser(this.currentUser);
        this.userservice.setIsAdmin(this.currentUser.result.isAdmin);
        if (this.currentUser.result.isAdmin)
        {
          this.router.navigate(['/admin/allshares']);
        }
        else
        {
          this.router.navigate(['/general/news']);
        }
      },
      error: err => {
        if (err.error.type == "error") this.apiDown = true;
        else this.loginErrorMessage = err.error;       
      }
    });
  }

  register(): void {
    let newUser: NewUserRequest = new NewUserRequest();
    newUser.username = this.registerUsername;
    newUser.password = this.registerPassword;
    newUser.preferredCurrency = this.registerPrefferedCurrency;
    newUser.isAdmin = false;
    this.userservice.register(newUser).subscribe({
      next: result => {
        this.registerErrorMessage = "User created. Log in"
        this.registerUsername = null;
        this.registerPassword = null;
        this.registerPrefferedCurrency = null;
      },
      error: err => {
        if (err.error.type == "error") this.apiDown = true;
        else this.registerErrorMessage = err.error;
      }
    });
  }
}
