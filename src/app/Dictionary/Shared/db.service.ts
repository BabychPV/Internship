import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {AuthorBase, AuthorDetail, BookBase, GenresBase} from './essence';
import {Observable, throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {environment} from 'src/environments/environment';
import {BackendService} from './backend.service';

@Injectable({
  providedIn: 'root'
})
export class DbService {

  constructor(private http: HttpClient, private EssenceId: BackendService) {
  }

  // SELECT
  getAuthors(): Observable<any> {
    return this.http.get(environment.apiUrl + 'authors')
      .pipe(
        map(response => {
          const value = response as AuthorBase[];
          const result: AuthorBase[] = [];
          value.forEach(element => {
            result.push(new AuthorBase(element.id, element.name, 0));
          });

          return result;
        }), catchError(this.handleError)
      );
  }

  getAuthorDetail(authorId: number): Observable<any> {
    return this.http.get(`${environment.apiUrl + 'authors'}/${authorId}`)
      .pipe(
        map(response => {
          const value = response as AuthorDetail[];
          const result: AuthorDetail[] = [];
          value.forEach(element => {
            result.push(new AuthorDetail(element.id, element.name, element.firstName, element.lastName, element.birthday));
          });

          return result;
        }), catchError(this.handleError)
      );
  }

  getBooksForAuthor(authorId: number): Observable<any> {
    return this.http.get(`${environment.apiUrl + 'books'}/${authorId}`)
      .pipe(
        map(response => {
          return response as BookBase[];
        }), catchError(this.handleError)
      );
  }

  getBooks(): Observable<any> {
    return this.http.get(environment.apiUrl + 'books')
      .pipe(
        map(response => {
          return response as BookBase[];
        }), catchError(this.handleError)
      );
  }

  getGenres(): Observable<any> {
    return this.http.get(environment.apiUrl + 'genres')
      .pipe(
        map(response => {
          const value = response as GenresBase[];
          const result: GenresBase[] = [];
          value.forEach(element => {
            result.push(new GenresBase(element.id, element.name));
          });
          return result;
        }), catchError(this.handleError)
      );
  }

  getBooksForGenre(genreId: number): Observable<any> {
    return this.http.get(`${environment.apiUrl + 'books'}/${genreId}`)
      .pipe(
        map(response => {
          return response as BookBase[];
        }), catchError(this.handleError)
      );
  }

// UPDATE
  updateGenre(genre: GenresBase): Observable<any> {
    return this.http.put(`${environment.apiUrl + 'genres'}/${genre.id}`, genre)
      .pipe(catchError(this.handleError));
  }

  updateAuthor(author: AuthorDetail): Observable<any> {
    return this.http.put(`${environment.apiUrl + 'authors'}/${author.id}`, author)
      .pipe(catchError(this.handleError));
  }

  updateBook(book: BookBase): Observable<any> {
    return this.http.put(`${environment.apiUrl + 'books'}/${book.id}`, book)
      .pipe(catchError(this.handleError));
  }

// DELETE
  deleteGenre(genre: GenresBase): Observable<any> {
    return this.http.delete(`${environment.apiUrl + 'genres'}/${genre.id}`)
      .pipe(catchError(this.handleError));
  }

  deleteAuthor(author: AuthorDetail): Observable<any> {
    return this.http.delete(`${environment.apiUrl + 'authors'}/${author.id}`)
      .pipe(catchError(this.handleError));
  }

  deleteBook(book: BookBase): Observable<any> {
    return this.http.delete(`${environment.apiUrl + 'books'}/${book.id}`)
      .pipe(catchError(this.handleError));
  }

// Add
  addGenre(genre: GenresBase, genres: GenresBase[]): Observable<any> {
    genre.id = this.EssenceId.genGenreId(genres);
    return this.http.post(environment.apiUrl, genre)
      .pipe(catchError(this.handleError));
  }

  addAuthor(author: AuthorDetail, authors: AuthorDetail[]): Observable<any> {
    author.id = this.EssenceId.genAuthorId(authors);
    return this.http.post(environment.apiUrl, author)
      .pipe(catchError(this.handleError));
  }

  addBook(book: BookBase, books: BookBase[]): Observable<any> {
    book.id = this.EssenceId.genBookId(books);
    return this.http.post(environment.apiUrl, book)
      .pipe(catchError(this.handleError));
  }

  private handleError(httpError: HttpErrorResponse): any {
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


}
