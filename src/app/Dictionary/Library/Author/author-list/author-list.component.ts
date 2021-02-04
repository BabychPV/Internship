import {Component, OnInit} from '@angular/core';
import {AuthorBase, BookBase} from '../../../Shared/essence';
import {ActivatedRoute, Router} from '@angular/router';
import {DbService} from '../../../Shared/db.service';
import {AuthService} from '../../../Shared/auth.service';


@Component({
  selector: 'app-author-list',
  templateUrl: './author-list.component.html',
  styleUrls: ['./author-list.component.css']
})
export class AuthorListComponent implements OnInit {

  authors: AuthorBase[] = [];
  books: BookBase[] = [];
  errorMessage: string;
  arrow = [{up: true, down: true}, {up: true, down: true}];

  constructor(private router: Router,
              private service: DbService,
              private activatedRoute: ActivatedRoute, public authService: AuthService) {
  }

  ngOnInit(): void {
    this.getAuthors();
    this.getBooks();
  }

  getAuthors(): void {
    this.service
      .getAuthors()
      .subscribe(result => this.authors = result,
        error => this.errorMessage = error);
  }

  genreSort(prop: string, index: number): void {
    this.service.BaseSort(this.arrow, this.authors, prop, index);
  }


  getBooks(): void {
    this.service
      .getBooks()
      .subscribe(result => {
          this.books = result;
          this.authors.forEach((value, index, array) => {
            const curAuthorId = value.id;
            const newArr = this.books.filter(value1 => value1.authorId === curAuthorId);
            array[index].countBooks = newArr.length;
          });
        },
        error => this.errorMessage = error);
  }

  editAuthor(author: AuthorBase): void {
    this.router.navigate(['Edit', author.id], {relativeTo: this.activatedRoute});
  }

  deleteAuthor(author: AuthorBase): void {
    if (this.authService.isLoggedIn) {
      if (confirm('Вы уверены?')) {
        this.service.deleteAuthor(author).subscribe(
          () => this.getAuthors(),
          error => this.errorMessage = error);
      }
    } else {
      this.router.navigate(['/Login']);
    }
  }

  detailAuthor(author: AuthorBase): void {
    this.router.navigate(['Detail', author.id], {relativeTo: this.activatedRoute});
  }

  createAuthor(): void {
    this.router.navigate(['Edit'], {relativeTo: this.activatedRoute});
  }
}
