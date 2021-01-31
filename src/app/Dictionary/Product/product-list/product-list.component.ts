import {Component, OnInit} from '@angular/core';
import {ProductBase} from '../../Shared/product';
import {ActivatedRoute, Router} from '@angular/router';
import {ProductService} from '../../Shared/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products: ProductBase[] = [];

  constructor(private router: Router,
              private phraseService: ProductService,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.phraseService   // обращаемся к сервису
      .getProducts()   // получаем Observable<Product[]>
      .subscribe(result => this.products = result); // как только поток выдаст событие результат присваиваем свойству phrases
  }

  onSelect(selected: ProductBase): void {
    // При клике по элементу списка перенаправляем пользователя по адресу /products-list/id
    // адрес с обязательным параметром указан в настройках маршрутизации в файле app-routing.module.ts
    this.router.navigate([selected.id], {relativeTo: this.activatedRoute});
  }
}
