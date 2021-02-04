import {Injectable} from '@angular/core';
import {InMemoryDbService} from 'angular-in-memory-web-api';
import {BookBase, GenreBase} from './essence';

// Сереверна сторона - описує 3 суті: authors, genres, books.

@Injectable({
  providedIn: 'root'
})
export class BackendService implements InMemoryDbService {

  constructor() {
  }

  createDb(): any {
    const authors = [
      {id: 1, firstName: 'Элиан', name: 'Том', lastName: 'Александр', birthday: '1990-01-01'},
      {id: 2, firstName: 'Текшин', name: 'Александр', lastName: 'Сергеевич', birthday: '1990-01-02'},
      {id: 3, firstName: 'Delacruz', name: 'Аlex', lastName: 'Сem', birthday: '1990-01-03'},
      {id: 4, firstName: 'Шни', name: 'Александр', lastName: 'Петрович', birthday: '1990-01-04'},
      {id: 5, firstName: 'MrDog', name: 'Аlex', lastName: 'Gerb', birthday: '1990-01-05'},
      {id: 6, firstName: 'Sandlord', name: 'Justin', lastName: 'Ray', birthday: '1990-01-06'},
      {id: 7, firstName: 'Vector', name: 'Dail', lastName: 'Rom', birthday: '1990-01-07'},
      {id: 8, firstName: 'Nooby', name: 'Sepr', lastName: 'Ween', birthday: '1990-01-08'},
      {id: 9, firstName: 'MARHUZ', name: 'Falk', lastName: 'Rav', birthday: '1990-01-09'},
      {id: 10, firstName: 'Trurle', name: 'Win', lastName: 'Rom', birthday: '1990-01-10'},
      {id: 11, firstName: 'Северный', name: 'Семен', lastName: 'Викторович', birthday: '1990-01-11'},
      {id: 12, firstName: 'NonSemper', name: 'Cent', lastName: 'Elit', birthday: '1990-01-12'},
      {id: 13, firstName: 'Findroid', name: 'Andul', lastName: 'Epil', birthday: '1990-01-14'}
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
      {id: 2, authorId: 1, genreId: 1, name: '1Тайные кланы 2'},
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

  genId<T extends GenreBase | GenreBase | BookBase>(myTable: T[]): number {
    return myTable.length > 0 ? Math.max(...myTable.map(t => t.id)) + 1 : 11;
  }

}
