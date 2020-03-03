import IBookInterfaceJSC from '../../schemas/IBookInterfaceJSC';
import BaseController from '../common/BaseController';
import BookQuery from './BookQuery';
import { IBookReq } from './interfaces/IBookReq';

export default class BookController extends BaseController<BookQuery> {
  async getBooks<T>(params: IBookReq) {
    return await this.call<T>(IBookInterfaceJSC, {
      url: this.query.getBookQuery(params),
      method: 'get',
      timeout: 10000
    });
  }
}
