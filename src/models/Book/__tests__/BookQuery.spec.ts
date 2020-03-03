import IBookInterfaceJSC from '../../../schemas/IBookInterfaceJSC';
import { extendJSC } from '../../../utils/jest';
import BookController from '../BookController';
import BookQuery from '../BookQuery';
import { IBookInterface } from '../interfaces/IBookInterface';
extendJSC();

describe('BookQuery test', () => {
  describe('기능 테스트', () => {
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

      const res = await controller.getBooks<IBookInterface>({
        title: 'flower algeron',
        inauthor: 'keyes',
        inpublisher: 'uk'
      });

      const books = res.caseOf<void, IBookInterface>({
        left: () => {},
        right: r => r.data
      });

      expect(books).toMatchSnapshot();
      done();
    });
  });

  describe('JSC 테스트', () => {
    const query = new BookQuery('/books/v1/volumes');
    const controller = new BookController(query);

    it.only('예상된 응답 값으로 값을 받아온다', async done => {
      const res = await controller.getBooks<IBookInterface>({
        title: 'flower algeron',
        inauthor: 'keyes',
        inpublisher: 'uk'
      });
      const books = res.do<null, IBookInterface>({ right: r => r.data });

      expect(books).toMatchJSC(IBookInterfaceJSC);
      done();
    });

    it('응답 값이 올바르지 않으면 JSC에 실패한다', async done => {
      const res = await controller.getBooks<IBookInterface>({
        title: 'flower algeron',
        inauthor: 'keyes',
        inpublisher: 'uk'
      });
      const books = res.do<null, IBookInterface>({ left: () => null });

      expect(books).not.toMatchJSC(IBookInterfaceJSC);
      done();
    });

    it.skip('실패 케이스 - 응답이 올바르지 않은 경우', async done => {
      const res = await controller.getBooks<IBookInterface>({
        title: 'flower algeron',
        inauthor: 'keyes',
        inpublisher: 'uk'
      });
      const books = res.do<null, IBookInterface>({ left: () => null });

      /* 실패한다. */
      expect(books).toMatchJSC(IBookInterfaceJSC);
      done();
    });
  });
});
