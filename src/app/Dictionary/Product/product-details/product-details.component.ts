import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {ProductService} from '../../Shared/product.service';
import {ProductFull} from '../../Shared/product';
import {CanComponentDeactivate} from '../../Shared/auth.guard.service';
import {AuthService} from "../../Shared/auth.service";
import {Location} from "@angular/common";

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit, CanComponentDeactivate {

  product: ProductFull | undefined;
  id: number;
  saved = true;

  // ActivatedRoute - содержит информацию о маршруте связанную с компонентом, который загружен в outlet
  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private service: ProductService, private location: Location) {
  }

  ngOnInit(): void {
    // params - параметры текущего маршрута. Данное свойство является Observable объектом
    // Если параметры будут изменены - произойдет событие и компонент узнает о изменениях.

    // OBSERVABLE PARAMS
    // forEach - устанавливаем обработчик на каждое изменение params
    this.activatedRoute.params.forEach((params: Params) => {
      const id = +params.id; // конвертируем значение параметра id в тип number
      this.service
        .getProduct(id)  // обращаемся к сервису и запрашиваем фразу по id. Получаем Observable<Product>
        .subscribe(result => this.product = result);  // как только получаем событие от потока присваиваем его значение свойству phrase
    });
  }

  canDeactivate(): Promise<boolean> | boolean {
    if (!this.product) {
      return true;
    }

    if (this.saved) {
      return true;
    } else {
      return confirm('Your changes will be lost if you don\'t save them.');
    }
  }

  save(): void {
    this.service.putProduct(this.product).subscribe(() => {
      this.saved = true;
      this.goToProductList();
    });

  }

  goToProductList(): void {
      this.location.back();
  }

  changed(): void {
    this.saved = false;
  }
}
