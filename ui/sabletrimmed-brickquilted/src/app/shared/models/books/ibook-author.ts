import { IReadBook } from "./iread-book";

export interface IBookAuthor {
  Name: string;
  Nationality: string;
  Language: string;
  TotalBooksReadBy: number;
  TotalPages: number;
  Books: IReadBook[];
}
