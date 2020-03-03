import { action, computed, observable } from 'mobx';
import { createContext } from 'react';

import BookController from '../models/Book/BookController';
import BookQuery from '../models/Book/BookQuery';
import { IBookInterface } from '../models/Book/interfaces/IBookInterface';
import { IBookReq } from '../models/Book/interfaces/IBookReq';

export default class BookStore {
  @observable book: IBookInterface = { kind: '', totalItems: 0, items: [] };
  @observable params: IBookReq = { title: '' };

  private isLoading: boolean = false;
  private isAtBottom: boolean = false;
  private startIndex: number = 0;
  private maxResults: number = 10;

  @computed
  get Book() {
    return this.book;
  }

  set Title(title: IBookReq['title']) {
    this.params.title = title;
  }

  set Author(inauthor: IBookReq['inauthor']) {
    this.params.inauthor = inauthor;
  }

  set Publisher(inpublisher: IBookReq['inpublisher']) {
    this.params.inpublisher = inpublisher;
  }

  set ISBN(isbn: IBookReq['isbn']) {
    this.params.isbn = isbn;
  }

  @action.bound
  resetParams() {
    this.book = { kind: '', totalItems: 0, items: [] };
    this.params = { title: '' };
    this.startIndex = 0;
    this.maxResults = 10;
    this.isLoading = false;
  }

  @action.bound
  async onLoadBook() {
    if (this.isLoading || this.isAtBottom) {
      return;
    }

    const controller = new BookController(new BookQuery('/books/v1/volumes'));

    this.startIndex += this.maxResults;
    this.isLoading = true;

    const res = await controller.getBooks({
      ...this.params,
      maxResults: this.maxResults,
      startIndex: this.startIndex
    });
    const book = res.caseOf<null, IBookInterface>({
      left: () => null,
      right: r => r.data
    });

    this.isLoading = false;
    if (!book) {
      return;
    }

    if (book.items.length === 0) {
      this.isAtBottom = true;
      return;
    }

    this.book.kind = book.kind;
    this.book.totalItems = book.totalItems;
    this.book.items = this.book.items.concat(book.items);
  }
}

export const BookStoreCtx = createContext<BookStore>(null!);
