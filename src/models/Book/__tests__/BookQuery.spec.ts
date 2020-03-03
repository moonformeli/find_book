import BookController from '../BookController';
import BookQuery from '../BookQuery';
import { IBook } from '../interfaces/IBook';

describe('BookQuery test', () => {
  it('인스턴스를 생성할 수 있다', () => {
    expect(new BookQuery('/books/v1/volumes')).toBeTruthy();
  });

  it('조건을 충족하면 쿼리를 생성할 수 있다', () => {
    const query = new BookQuery('/books/v1/volumes');
    const href = query.getBookQuery({
      title: 'hello',
      inauthor: 'jake'
    });

    expect(href).toBe(
      'https://www.googleapis.com/books/v1/volumes?q=hello+inauthor:jake&key=AIzaSyDZ71VzRW5oKBMhvC0UZNr-Q4UfezyeAnA'
    );
  });

  it('api 를 호출하면 데이터를 받아올 수 있다', async done => {
    const query = new BookQuery('/books/v1/volumes');
    const controller = new BookController(query);

    const res = await controller.getBooks<IBook>({
      title: 'flower algeron',
      inauthor: 'keyes',
      inpublisher: 'uk'
    });

    const books = res.caseOf<void, IBook>({
      left: () => {},
      right: r => r.data
    });

    expect(books).toMatchSnapshot();
    done();
  });
});
