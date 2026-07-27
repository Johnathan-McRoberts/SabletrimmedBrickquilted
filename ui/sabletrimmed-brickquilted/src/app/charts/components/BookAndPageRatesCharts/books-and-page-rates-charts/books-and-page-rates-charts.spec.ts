import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BooksAndPageRatesCharts } from './books-and-page-rates-charts';

describe('BooksAndPageRatesCharts', () => {
  let component: BooksAndPageRatesCharts;
  let fixture: ComponentFixture<BooksAndPageRatesCharts>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BooksAndPageRatesCharts],
    }).compileComponents();

    fixture = TestBed.createComponent(BooksAndPageRatesCharts);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
