export interface IAddBookRequestDto {
  date: Date;
  author: string;
  title: string;
  pages: number;
  note: string;
  nationality: string;
  originalLanguage: string;
  imageUrl: string;

  tags: string[];
  format: string;

  userId: string;
}
