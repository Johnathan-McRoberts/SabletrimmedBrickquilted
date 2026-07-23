export class NewBookBasics {
  public Date: Date = new Date('1999-12-31T23:59:00');
  public Author = '';
  public Title = '';
  public Pages = 0;
  public Nationality = '';
  public OriginalLanguage = '';
  public Format = '';

  public isValid(): boolean {
    if (this.Date.getFullYear() <= 2000) return false;

    if (this.Author.length < 1) return false;

    if (this.Title.length < 1) return false;

    if (this.Nationality.length < 1) return false;

    if (this.OriginalLanguage.length < 1) return false;

    if (this.Format != 'Book' && this.Format != 'Comic' && this.Format != 'Audio') return false;

    if (this.Pages < 1 && this.Format != 'Audio') return false;

    return true;
  }
}
