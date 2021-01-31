import {Injectable} from '@angular/core';
import {InMemoryDbService} from 'angular-in-memory-web-api';
import { AuthorDetail, BookBase, GenresBase } from './essence';

// Сереверна сторона - описує 3 суті: authors, genres, books.

@Injectable({
  providedIn: 'root'
})
export class BackendService implements InMemoryDbService {

  constructor() {
  }

  createDb(): any {
    const authors = [
      {id: 1, name: 'Элиан', firstName: 'Т', lastName: 'А', birthday: '1990-01-01'},
      {id: 2, name: 'Текшин', firstName: 'А', lastName: 'С', birthday: '1990-01-02'},
      {id: 3, name: 'Delacruz', firstName: 'А', lastName: 'С', birthday: '1990-01-03'},
      {id: 4, name: 'Шни', firstName: 'А', lastName: 'П', birthday: '1990-01-04'},
      {id: 5, name: 'MrDog', firstName: 'А', lastName: 'G', birthday: '1990-01-05'},
      {id: 6, name: 'Sandlord', firstName: 'А', lastName: 'R', birthday: '1990-01-06'},
      {id: 7, name: 'Vector', firstName: 'D', lastName: 'R', birthday: '1990-01-07'},
      {id: 8, name: 'Nooby', firstName: 'S', lastName: 'W', birthday: '1990-01-08'},
      {id: 9, name: 'MARHUZ', firstName: 'F', lastName: 'R', birthday: '1990-01-09'},
      {id: 10, name: 'Trurle', firstName: 'W', lastName: 'R', birthday: '1990-01-10'},
      {id: 11, name: 'Северный', firstName: 'С', lastName: 'В', birthday: '1990-01-11'},
      {id: 12, name: 'NonSemper', firstName: 'C', lastName: 'E', birthday: '1990-01-12'},
      {id: 13, name: 'Findroid', firstName: 'A', lastName: 'E', birthday: '1990-01-14'}
    ];

    const genres = [
      {id: 1, name: 'Фэнтези'},
      {id: 2, name: 'Фантастика'},
      {id: 3, name: 'Боевик'},
      {id: 4, name: 'Историческая проза'},
      {id: 5, name: 'Эротика'}
    ];

    const books = [
      {id: 1, authorId: 1, genreId: 1, name: 'Тайные кланы'},
      {id: 2, authorId: 1, genreId: 1, name: 'Тайные кланы 2'},
      {id: 3, authorId: 2, genreId: 1, name: 'Волшебство не вызывает привыкания'},
      {id: 4, authorId: 3, genreId: 2, name: 'Варлорд. Темный пакт'},
      {id: 5, authorId: 3, genreId: 2, name: 'Варлорд. Врата Тартара'},
      {id: 6, authorId: 4, genreId: 2, name: 'Ram.Oliver'},
      {id: 7, authorId: 5, genreId: 2, name: 'Гражданин'},
      {id: 8, authorId: 6, genreId: 3, name: 'Хроники реалий / Том 1'},
      {id: 9, authorId: 7, genreId: 3, name: 'Инициализация'},
      {id: 10, authorId: 8, genreId: 3, name: 'Чемпион'},
      {id: 11, authorId: 9, genreId: 4, name: 'Старший царь Иоанн Пятый'},
      {id: 12, authorId: 10, genreId: 4, name: 'Триста пятидесятый год - перезагрузка'},
      {id: 13, authorId: 11, genreId: 5, name: 'ЛитРпг Строго 18+'},
      {id: 14, authorId: 12, genreId: 5, name: 'Некомант (18+)'},
      {id: 15, authorId: 13, genreId: 5, name: 'Защитник поневоле или ассасин с того света'}

    ];

    return {authors, books, genres};
  }


  genAuthorId(author: AuthorDetail[]): number {
    return author.length > 0 ? Math.max(...author.map(hero => hero.id)) + 1 : 14;
  }
  genGenreId(genre: GenresBase[]): number {
    return genre.length > 0 ? Math.max(...genre.map(hero => hero.id)) + 1 : 6;
  }
  genBookId(book: BookBase[]): number {
    return book.length > 0 ? Math.max(...book.map(hero => hero.id)) + 1 : 16;
  }

}
