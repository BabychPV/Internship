import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { Essence } from './essence';
import { DbService } from './db.service';

import { map } from "rxjs/operators";
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
    providedIn: 'root'
})
export class ProductDetailsResolveService implements Resolve<Essence> {

    constructor(private service: DbService,
        private router: Router) { }

    resolve(route: ActivatedRouteSnapshot): Observable<Essence> {

        let id = +route.params["id"];

        return this.service.getProduct(id).pipe(
            map(product => {
                if (product) {
                    return product;
                } else { // не удалось найти продукт по id
                    this.router.navigate(["/product-list"]);
                    return null;
                }
            }));
        }
    }
