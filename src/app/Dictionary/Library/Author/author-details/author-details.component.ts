import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {DbService} from '../../../Shared/db.service';
import {AuthorBase, BookBase} from '../../../Shared/essence';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-author-details',
  templateUrl: './author-details.component.html',
  styleUrls: ['./author-details.component.css']
})
export class AuthorDetailsComponent implements OnInit {
  authorDetail: AuthorBase;
  authorBooks: BookBase[];

  editBookFlag = false;
  errorMessage: string;

  authorForm: FormGroup;
  name: FormControl;
  firstName: FormControl;
  lastName: FormControl;
  birthday: FormControl;


  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private service: DbService) {
  }

  ngOnInit(): void {
    this.createFormControls();
    this.createForm();
    this.activatedRoute.params.forEach((params: Params) => {
      const id = +params.id;
      if (id === 0) {
      }
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
    });
  }

  // Форма
  createFormControls(): void {
    // Автор
    this.name = new FormControl('', [Validators.required, Validators.minLength(2)]);
    this.firstName = new FormControl('', [Validators.required, Validators.minLength(2)]);
    this.lastName = new FormControl('', [Validators.required, Validators.minLength(2)]);
    this.birthday = new FormControl('', Validators.required);
  }

  createForm(): void {
    // Автор
    this.authorForm = new FormGroup({
      name: this.name,
      firstName: this.firstName,
      lastName: this.lastName,
      birthday: this.birthday
    });

  }

  getClass(control: FormControl): any {
    return {
      'is-invalid': control.invalid && control.dirty,
      'is-valid': control.valid && control.dirty
    };
  }


  getBooks(id: number): void {
    this.service
      .getBooksForAuthor(id)
      .subscribe(result => {
          this.authorBooks = result;
        }, error => this.errorMessage = error
      );
  }


  goToAuthorList(): void {
    this.router.navigate(['/Authors']);
  }


}
