export class AuthorBase {
  constructor(
    public id: number,
    public firstName: string,
    public name: string,
    public lastName: string,
    public birthday: string,
    public countBooks?: number) {
  }

}

export class GenreBase {
  constructor(
    public id: number,
    public name: string,
    public countBooks?: number) {
  }
}


export class BookBase {
  constructor(
    public id: number,
    public authorId: number,
    public genreId: number,
    public name: string,
    public genreName?: string,
    public authorName?: string) {
  }

}
