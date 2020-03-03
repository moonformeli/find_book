export interface IBookReq {
  title: string;
  inauthor?: string;
  inpublisher?: string;
  isbn?: string;
  startIndex?: number;
  maxResults?: number;
}
