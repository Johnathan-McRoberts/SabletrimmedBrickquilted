import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookAndPageRates } from './book-and-page-rates';

describe('BookAndPageRates', () => {
  let component: BookAndPageRates;
  let fixture: ComponentFixture<BookAndPageRates>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookAndPageRates],
    }).compileComponents();

    fixture = TestBed.createComponent(BookAndPageRates);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
