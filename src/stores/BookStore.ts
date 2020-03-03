import { action, computed, observable } from 'mobx';
import { createContext } from 'react';

import BookController from '../models/Book/BookController';
import BookQuery from '../models/Book/BookQuery';
import { IBook } from '../models/Book/interfaces/IBook';
import { IBookReq } from '../models/Book/interfaces/IBookReq';

export default class BookStore {
  @observable book: IBook = { kind: '', totalItems: 0, items: [] };

  private isLoading: boolean = false;
  private startIndex: number = 0;
  private maxResults: number = 10;

  @computed
  get Book() {
    return this.book;
  }

  @action.bound
  resetParams() {
    this.book = { kind: '', totalItems: 0, items: [] };
    this.startIndex = 0;
    this.maxResults = 10;
    this.isLoading = false;
  }

  @action.bound
  async onLoadBook(params: IBookReq) {
    if (this.isLoading) {
      return;
    }

    const controller = new BookController(new BookQuery('/books/v1/volumes'));

    this.startIndex += this.maxResults;
    this.isLoading = true;

    const res = await controller.getBooks({
      ...params,
      maxResults: this.maxResults,
      startIndex: this.startIndex
    });
    const book = res.caseOf<null, IBook>({
      left: () => null,
      right: r => r.data
    });

    this.isLoading = false;
    if (!book) {
      return;
    }

    this.book.kind = book.kind;
    this.book.totalItems = book.totalItems;
    this.book.items = this.book.items.concat(book.items);
  }
}

export const BookStoreCtx = createContext<BookStore>(null!);
