import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {DbService} from '../../../Shared/db.service';
import {BookBase, GenreBase} from '../../../Shared/essence';
import {CanComponentDeactivate} from '../../../Shared/auth.guard.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';


@Component({
  selector: 'app-genre-edit',
  templateUrl: './genre-edit.component.html',
  styleUrls: ['./genre-edit.component.css']
})

export class GenreEditComponent implements OnInit, CanComponentDeactivate {


  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private service: DbService) {
  }

  generDetail: GenreBase = new GenreBase(0, '', 0);
  generBooks: BookBase[];
  generBook: BookBase = new BookBase(0, 0, 0, '');
  genersList: GenreBase[];
  formGenerHeader = '';

  const;
  People = [
    {Name: 'BBB', Surname: 'Surname'},
    {Name: 'AAA', Surname: 'ZZZ'},
    {Name: 'CCC', Surname: 'AAA'}
  ];

  saved = true;
  editBookFlag = false;
  createGenerFlag = false;
  formBookHeader = '';
  errorMessage: string;

  generForm: FormGroup;
  name: FormControl;

  bookForm: FormGroup;
  nameBook: FormControl;
  genresBook: FormControl;

  ngOnInit(): void {
    this.createFormControls();
    this.createForm();
    this.activatedRoute.params.forEach((params: Params) => {
      const id = +params.id;
      if (!isNaN(id)) {
        this.formGenerHeader = 'Детально про жанр';
        // Отримати автора
        this.service
          .getGenreDetail(id)
          .subscribe(result => {
              this.generDetail = result;
              this.generForm.patchValue(this.generDetail);
            }, error => this.errorMessage = error
          );
        // Отримати книги
        this.getBooks(id);
      } else {
        this.createGenerFlag = true;
        this.formGenerHeader = 'Внести в базу жанр';
      }
    });
  }

  // Форма
  createFormControls(): void {
    // Автор
    this.name = new FormControl('', [Validators.required, Validators.minLength(2)]);
    // Книга
    this.nameBook = new FormControl('', [Validators.required, Validators.minLength(2)]);
    this.genresBook = new FormControl('', Validators.required);
  }

  createForm(): void {
    // Автор
    this.generForm = new FormGroup({
      name: this.name
    });
    // Книга
    this.bookForm = new FormGroup({
      nameBook: this.nameBook,
      genresBook: this.genresBook
    });
  }

  getClass(control: FormControl): any {
    return {
      'is-invalid': control.invalid && control.dirty,
      'is-valid': control.valid && control.dirty
    };
  }


  changed(): void {
    this.saved = false;
  }

  // Мршрут
  canDeactivate(): Promise<boolean> | boolean {
    if (!this.generDetail) {
      return true;
    }

    if (this.saved) {
      return true;
    } else {
      return confirm('Ваши изменения будут потеряны, если вы их не сохраните.');
    }
  }

  // Жанр
  modifyGener(form: FormGroup): void {
    this.generDetail.name = form.value.name;
    if (!this.createGenerFlag) {
      this.service.updateGenre(this.generDetail).subscribe(() => {
        this.saved = true;
        this.goToGenreList();
      });
    } else {
      this.service.addGenre(this.generDetail).subscribe(() => {
        this.saved = true;
        this.goToGenreList();
      });
    }
  }

  // Книга

  viewFormBook(book: BookBase): void {
    this.getGenres();
    this.generBook = book;
    this.bookForm.patchValue({
      nameBook: book.name
    });
    this.formBookHeader = 'Редактировать книгу - ' + this.generBook.name;

    this.editBookFlag = true;
  }


  getBooks(id: number): void {
    this.service
      .getBooksForGenre(id)
      .subscribe(result => {
          this.generBooks = result;
        }, error => this.errorMessage = error
      );
  }

  addBook(): void {
    this.service.addBook(this.generBook).subscribe(() => {
      this.saved = true;
    });
  }

  modifyBook(bookForm: FormGroup): void {
    if (confirm('Вы уверены?')) {
      this.generBook.name = bookForm.value.nameBook;
      this.generBook.genreId = +bookForm.value.genresBook;
      this.service.updateBook(this.generBook).subscribe(
        () => {
          this.getBooks(this.generDetail.id);
          this.editBookFlag = false;
        },
        error => this.errorMessage = error
      );

    }
  }

  cancelEditBook(): void {
    this.editBookFlag = false;
  }


  deleteBook(book: BookBase): void {
    if (confirm('Вы уверены?')) {
      this.service.deleteBook(book).subscribe(
        () => this.getBooks(this.generDetail.id),
        error => this.errorMessage = error);
    }
  }

  // Жанр
  getGenres(): void {
    this.service
      .getGenres()
      .subscribe(result => {
          this.genersList = result;
        }, error => this.errorMessage = error
      );
  }

  goToGenreList(): void {
    this.router.navigate(['/Genres']);
  }


}
