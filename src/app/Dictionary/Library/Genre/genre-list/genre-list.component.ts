import {Component, OnInit} from '@angular/core';
import {BookBase, GenreBase} from '../../../Shared/essence';
import {ActivatedRoute, Router} from '@angular/router';
import {DbService} from '../../../Shared/db.service';
import {AuthService} from '../../../Shared/auth.service';


@Component({
  selector: 'app-genre-list',
  templateUrl: './genre-list.component.html',
  styleUrls: ['./genre-list.component.css']
})
export class GenreListComponent implements OnInit {

  genres: GenreBase[] = [];
  books: BookBase[] = [];
  errorMessage: string;
  arrow = [{up: true, down: true}, {up: true, down: true}];

  constructor(private router: Router,
              private service: DbService,
              private activatedRoute: ActivatedRoute, public authService: AuthService) {
  }

  ngOnInit(): void {
    this.getGenres();
    this.getBooks();
  }

  genreSort(prop: string, index: number): void {
    this.service.BaseSort(this.arrow, this.genres, prop, index);
  }

  getGenres(): void {
    this.service
      .getGenres()
      .subscribe(result => this.genres = result,
        error => this.errorMessage = error);
  }

  getBooks(): void {
    this.service
      .getBooks()
      .subscribe(result => {
          this.books = result;
          this.genres.forEach((value, index, array) => {
            const curGenreId = value.id;
            const newArr = this.books.filter(value1 => value1.genreId === curGenreId);
            array[index].countBooks = newArr.length;
          });
        },
        error => this.errorMessage = error);
  }

  editGenre(genre: GenreBase): void {
    this.router.navigate(['Edit', genre.id], {relativeTo: this.activatedRoute});
  }

  deleteGenre(genre: GenreBase): void {
    if (this.authService.isLoggedIn) {
      if (confirm('Вы уверены?')) {
        this.service.deleteGenre(genre).subscribe(
          () => this.getGenres(),
          error => this.errorMessage = error);
      }
    } else {
      this.router.navigate(['/Login']);
    }
  }

  detailGenre(genre: GenreBase): void {
    this.router.navigate(['Detail', genre.id], {relativeTo: this.activatedRoute});
  }

  createGenre(): void {
    this.router.navigate(['Edit'], {relativeTo: this.activatedRoute});
  }
}
