import {Component, OnInit} from '@angular/core';
import {Location} from '@angular/common';
import {AuthService} from '../Shared/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  password: string;
  userLogin: string;
  message: string;

  constructor(public router: Router, public authService: AuthService, private location: Location) {
  }

  ngOnInit(): void {
  }

  goToBack(): void {
    this.location.back();
  }

  setMessage(): void {
    this.message = 'Повторите попытку';
  }

  login(): void {
    this.message = 'Ожидайте ...';
    this.authService.login(this.userLogin, this.password).subscribe(() => {
      this.setMessage();
      if (this.authService.isLoggedIn) {
        const redirect = this.authService.redirectUrl ? this.authService.redirectUrl : '/Authors';
        this.router.navigate([redirect]);
      }
    });
  }

  logout(): void {
    this.authService.logout();
    this.setMessage();
  }

}
