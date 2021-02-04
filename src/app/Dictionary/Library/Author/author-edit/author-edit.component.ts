import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {DbService} from '../../../Shared/db.service';
import {AuthorBase, BookBase, GenreBase} from '../../../Shared/essence';
import {CanComponentDeactivate} from '../../../Shared/auth.guard.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';


@Component({
  selector: 'app-author-edit',
  templateUrl: './author-edit.component.html',
  styleUrls: ['./author-edit.component.css']
})
export class AuthorEditComponent implements OnInit, CanComponentDeactivate {


  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private service: DbService) {
  }

  authorDetail: AuthorBase = new AuthorBase(0, '', '', '', '');
  authorBooks: BookBase[];
  authorTempBooks: BookBase[];
  authorBook: BookBase = new BookBase(0, 0, 0, '');
  genersList: GenreBase[];
  formAuthorHeader = '';

  saved = true;
  editBookFlag = false;
  addBookFlag = false;
  createAuthorFlag = false;
  formBookHeader = '';
  errorMessage: string;
  arrow = [{up: true, down: true}, {up: true, down: true}];

  authorForm: FormGroup;
  name: FormControl;
  firstName: FormControl;
  lastName: FormControl;
  birthday: FormControl;

  bookForm: FormGroup;
  nameBook: FormControl;
  genresBook: FormControl;


  ngOnInit(): void {
    this.createFormControls();
    this.createForm();
    this.activatedRoute.params.forEach((params: Params) => {
      const id = +params.id;
      if (!isNaN(id)) {
        this.formAuthorHeader = 'Редактировать данные про автора';
        // Отримати автора
        this.service
          .getAuthorDetail(id)
          .subscribe(result => {
              this.authorDetail = result;
              this.authorForm.patchValue(this.authorDetail);
            }, error => this.errorMessage = error
          );
        // Отримати книги
        this.getBooks(id);
      } else {
        this.createAuthorFlag = true;
        this.formAuthorHeader = 'Внести в базу автора';
      }
    });
  }

  // Форма
  createFormControls(): void {
    // Автор
    this.name = new FormControl('', [Validators.required, Validators.minLength(2)]);
    this.firstName = new FormControl('', [Validators.required, Validators.minLength(2)]);
    this.lastName = new FormControl('', [Validators.required, Validators.minLength(2)]);
    this.birthday = new FormControl('', Validators.required);
    // Книга
    this.nameBook = new FormControl('', [Validators.required, Validators.minLength(2)]);
    this.genresBook = new FormControl('', Validators.required);
  }

  createForm(): void {
    // Автор
    this.authorForm = new FormGroup({
      name: this.name,
      firstName: this.firstName,
      lastName: this.lastName,
      birthday: this.birthday
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
    if (!this.authorDetail) {
      return true;
    }

    if (this.saved) {
      return true;
    } else {
      return confirm('Ваши изменения будут потеряны, если вы их не сохраните.');
    }
  }

  // Автор
  modifyAuthor(form: FormGroup): void {
    this.authorDetail.name = form.value.name;
    this.authorDetail.firstName = form.value.firstName;
    this.authorDetail.lastName = form.value.lastName;
    this.authorDetail.birthday = form.value.birthday;
    if (!this.createAuthorFlag) {
      this.service.updateAuthor(this.authorDetail).subscribe(() => {
        this.saved = true;
        this.goToAuthorList();
      });
    } else {
      this.service.addAuthor(this.authorDetail).subscribe(() => {
        this.saved = true;
        this.goToAuthorList();
      });
    }
  }

  // Книга

  authorSearch($event: any): void {
    const curVal = $event.target as HTMLInputElement;
    if (curVal.value === '') {
      this.authorBooks = this.authorTempBooks;
    } else {
      const pattern = new RegExp('^' + curVal.value);
      this.authorBooks = this.authorTempBooks.filter(word => pattern.test(word.name));
    }

  }

  authorSort(prop: string, index: number): void {
    this.service.BaseSort(this.arrow, this.authorBooks, prop, index);
  }

  viewFormBook(book: BookBase): void {
    this.getGenres();
    if (!this.addBookFlag) {
      this.authorBook = book;
      this.bookForm.patchValue({
        nameBook: book.name
      });
      this.formBookHeader = 'Редактировать книгу - ' + this.authorBook.name;
    } else {
      this.formBookHeader = 'Добавить книгу';
      this.bookForm.patchValue({
        nameBook: '',
        genresBook: ''
      });
    }
    this.editBookFlag = true;
  }

  getBooks(id: number): void {
    this.service
      .getBooksForAuthor(id)
      .subscribe(result => {
          this.authorBooks = result;
          this.authorTempBooks = result;
        }, error => this.errorMessage = error
      );
  }

  modifyBook(bookForm: FormGroup): void {
    if (confirm('Вы уверены?')) {
      this.authorBook.name = bookForm.value.nameBook;
      this.authorBook.genreId = +bookForm.value.genresBook;
      if (!this.addBookFlag) {
        this.service.updateBook(this.authorBook).subscribe(
          () => {
            this.getBooks(this.authorDetail.id);
            this.editBookFlag = false;
          },
          error => this.errorMessage = error
        );
      } else {
        this.authorBook.authorId = this.authorDetail.id;
        this.service.addBook(this.authorBook).subscribe(
          () => {
            this.getBooks(this.authorDetail.id);
            this.editBookFlag = false;
            this.addBookFlag = false;
          },
          error => this.errorMessage = error
        );
      }
    }
  }

  cancelEditBook(): void {
    this.editBookFlag = false;
  }

  deleteBook(book: BookBase): void {
    if (confirm('Вы уверены?')) {
      this.service.deleteBook(book).subscribe(
        () => this.getBooks(this.authorDetail.id),
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

  goToAuthorList(): void {
    this.router.navigate(['/Authors']);
  }


}
