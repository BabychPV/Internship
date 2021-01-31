export class AuthorBase {
  constructor(
    public id: number,
    public name: string,
    public countBooks?: number) {
  }

}

export class AuthorDetail extends AuthorBase {
  constructor(
    id: number,
    name: string,
    public firstName: string,
    public lastName: string,
    public birthday: string,
    countBooks?: number) {
    super(id, name, countBooks);
  }

}

export class GenresBase {
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
    public name: string) {
  }
}
