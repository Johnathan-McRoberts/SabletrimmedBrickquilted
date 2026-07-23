export class NewBook {
  constructor(
    public date: Date,
    public author: string,
    public title: string,
    public pages: number,
    public nationality: string,
    public originalLanguage: string,
    public format: string,

    public imageUrl: string,

    public notes: string,
    public tags: string[],

    public userId: string,
  ) {}
}
