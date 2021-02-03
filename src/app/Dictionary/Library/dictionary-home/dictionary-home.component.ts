import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../Shared/auth.service';
import {Router} from '@angular/router';


@Component({
  selector: 'app-product-home',
  templateUrl: './dictionary-home.component.html',
  styleUrls: ['./dictionary-home.component.css']
})
export class DictionaryHomeComponent implements OnInit {

  constructor(private router: Router, public authService: AuthService) {
  }

  ngOnInit(): void {

  }

  goToLoginForm(): void {
    this.router.navigate(['/Login']);
  }


}
