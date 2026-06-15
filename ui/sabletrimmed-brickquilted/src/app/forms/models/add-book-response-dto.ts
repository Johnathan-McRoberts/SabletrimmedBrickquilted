import { IReadBook } from '../../shared/models/books/iread-book';

export enum BookReadAddResponseCode {
  Success = 0,
  Duplicate,
  UnknownUser,
  InvalidItem,
  UnknownItem
};

export interface IAddBookResponseDto {

  newItem: IReadBook | null;

  errorCode: number;
  failReason: string;
  userId: string;
}
