import BaseQuery from '../../models/common/BaseQuery';
import { IBookReq } from './interfaces/IBookReq';

export default class BookQuery extends BaseQuery {
  // FIXME: 뭔가 현재 방식이 지저분하다....
  // 고치고싶은데
  // 리팩토링의 시간이 있을지
  getBookQuery(params: IBookReq) {
    let query = `q=${params.title.split(' ').join('+')}`;

    if (params.inauthor) {
      query += `+inauthor:${params.inauthor}`;
    }
    if (params.inpublisher) {
      query += `+inpublisher:${params.inpublisher}`;
    }
    if (params.isbn) {
      query += `+isbn:${params.isbn}`;
    }

    if (params.startIndex) {
      query += `&startIndex=${params.startIndex}`;
    }

    if (params.maxResults) {
      query += `&maxResults=${params.maxResults}`;
    }

    return this.getAPIPath({ search: query });
  }
}
