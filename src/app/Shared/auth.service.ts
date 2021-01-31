import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {delay} from 'rxjs/internal/operators';
import {tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoggedIn = false;

  // URL для перенаправления после авторизации
  redirectUrl: string;

  login(login: string, password: string): Observable<boolean> {
    return of(true).pipe(   // создание Observable объекта
      delay(1000),        // задержка на 1 сек.
      tap(val => {        // выполнение действия для каждого элемента в последовательности
        if (login === 'admin' && password === 'qwerty') {
          this.isLoggedIn = true;
        }
        return this.isLoggedIn;
      }));
  }

  logout(): void {
    this.isLoggedIn = false;
  }
}
