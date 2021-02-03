import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {AuthorBase, BookBase, GenreBase} from './essence';
import {Observable, throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {environment} from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DbService {

  constructor(private http: HttpClient) {
  }

  static handleError(httpError: HttpErrorResponse): any {
    if (httpError.error instanceof ErrorEvent) {
      console.error('Произошла ошибка:', httpError.error.message);
    } else {
      console.error(
        `Код ответа ${httpError.status}, ` +
        `Тело ответа: ${httpError.error}`);
    }
    return throwError(
      'Произошла ошибка, попробуйте позже.');
  }

  // AuthorList: AuthorBase[] = [];
  // BookList: BookBase[] = [];
  // GenreList: GenreBase[] = [];
  // GenreListForBook: GenreBase[] = [];

  // SELECT
  getAuthors(): Observable<any> {
    return this.http.get(environment.apiUrl + 'authors')
      .pipe(
        map(response => {
          const value = response as AuthorBase[];
          const result: AuthorBase[] = [];
          value.forEach(element => {
            result.push(new AuthorBase(element.id,
              element.firstName + ' ' + element.name.substring(0, 1) + '.' + element.lastName.substring(0, 1),
              element.name,
              element.lastName,
              element.birthday));
          });
          // this.AuthorList = response as AuthorBase[];
          return result;
        }), catchError(DbService.handleError)
      );
  }

  getAuthorDetail(authorId: number): Observable<any> {
    return this.http.get(`${environment.apiUrl + 'authors'}/${authorId}`)
      .pipe(
        map(response => {
          const value = response as AuthorBase;
          return new AuthorBase(value.id, value.firstName, value.name, value.lastName, value.birthday);
        }), catchError(DbService.handleError)
      );
  }

  getBooksForAuthor(authorId: number): Observable<any> {
    return this.http.get(`${environment.apiUrl + 'books'}?authorId=^${authorId}$`)
      .pipe(
        map(response => {
          const value = response as BookBase[];
          const result: BookBase[] = [];

          this.getGenres().subscribe(newResult => {
            const newValue = newResult as GenreBase[];
            value.forEach(element => {

              result.push(new BookBase(
                element.id,
                element.authorId,
                element.genreId,
                element.name,
                newValue[newValue.findIndex(x => x.id === element.genreId)].name));
            });
          });
          return result;
        }), catchError(DbService.handleError)
      );
  }

  getBooks(): Observable<any> {
    return this.http.get(environment.apiUrl + 'books')
      .pipe(
        map(response => {
          // this.BookList = value;
          return response as BookBase[];
        }), catchError(DbService.handleError)
      );
  }

  getGenreDetail(genreId: number): Observable<any> {
    return this.http.get(`${environment.apiUrl + 'genres'}/${genreId}`)
      .pipe(
        map(response => {
          const value = response as GenreBase;
          return new GenreBase(value.id, value.name);
        }), catchError(DbService.handleError)
      );
  }


  getGenres(): Observable<any> {
    return this.http.get(environment.apiUrl + 'genres')
      .pipe(
        map(response => {
          // this.GenreList = value;
          return response as GenreBase[];
        }), catchError(DbService.handleError)
      );
  }

  getBooksForGenre(genreId: number): Observable<any> {
    return this.http.get(`${environment.apiUrl + 'books'}?genreId=^${genreId}$`)
      .pipe(
        map(response => {
          const value = response as BookBase[];
          const result: BookBase[] = [];
          this.getAuthors().subscribe(newResult => {
            const newValue = newResult as AuthorBase[];
            value.forEach(element => {
              const indexAuthor = newValue.findIndex(x => x.id === element.authorId);
              result.push(new BookBase(
                element.id,
                element.authorId,
                element.genreId,
                element.name,
                element.genreName,
                newValue[indexAuthor].firstName));
            });
          });
          return result;
        }), catchError(DbService.handleError)
      );
  }

// UPDATE
  updateGenre(genre: GenreBase): Observable<any> {
    return this.http.put(`${environment.apiUrl + 'genres'}/${genre.id}`, genre)
      .pipe(catchError(DbService.handleError));
  }

  updateAuthor(author: GenreBase): Observable<any> {
    return this.http.put(`${environment.apiUrl + 'authors'}/${author.id}`, author)
      .pipe(catchError(DbService.handleError));
  }

  updateBook(book: BookBase): Observable<any> {
    return this.http.put(`${environment.apiUrl + 'books'}/${book.id}`, book)
      .pipe(catchError(DbService.handleError));
  }

// DELETE
  deleteGenre(genre: GenreBase): Observable<any> {
    return this.http.delete(`${environment.apiUrl + 'genres'}/${genre.id}`)
      .pipe(catchError(DbService.handleError));
  }

  deleteAuthor(author: GenreBase): Observable<any> {
    return this.http.delete(`${environment.apiUrl + 'authors'}/${author.id}`)
      .pipe(catchError(DbService.handleError));
  }

  deleteBook(book: BookBase): Observable<any> {
    return this.http.delete(`${environment.apiUrl + 'books'}/${book.id}`)
      .pipe(catchError(DbService.handleError));
  }

// Add
  addGenre(genre: GenreBase): Observable<any> {
    const obj = {name: genre.name};
    return this.http.post(`${environment.apiUrl + 'genres'}`, obj)
      .pipe(catchError(DbService.handleError));
  }

  addAuthor(author: AuthorBase): Observable<any> {
    const obj = {firstName: author.firstName, name: author.name, lastName: author.lastName, birthday: author.birthday};
    return this.http.post(`${environment.apiUrl + 'authors'}`, obj)
      .pipe(catchError(DbService.handleError));
  }

  addBook(book: BookBase): Observable<any> {
    const obj = {authorId: book.authorId, genreId: book.genreId, name: book.name};
    return this.http.post(`${environment.apiUrl + 'books'}`, obj)
      .pipe(catchError(DbService.handleError));
  }


  dynamicSort(property): any {
    let sortOrder = 1;
    if (property[0] === '-') {
      sortOrder = -1;
      property = property.substr(1);
    }

    return (a, b) => {
      const result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
      return result * sortOrder;
    };
  }

  BaseSort(arrow: any [], inputArray: any [], prop: string, index: number): void {
    arrow.forEach((element, curindex, array) => {
      if (curindex !== index) {
        array[curindex].up = false;
        array[curindex].down = false;
      }
    });

    if (arrow[index].down || (!arrow[index].down && !arrow[index].up)) {
      arrow[index].up = true;
      arrow[index].down = false;
      inputArray.sort(this.dynamicSort(prop));
    } else {
      if (arrow[index].up) {
        arrow[index].up = false;
        arrow[index].down = true;
        inputArray.sort(this.dynamicSort('-' + prop));
      }
    }
  }

}
