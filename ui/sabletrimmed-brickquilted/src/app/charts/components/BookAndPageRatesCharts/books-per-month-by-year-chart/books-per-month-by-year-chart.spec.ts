import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BooksPerMonthByYearChart } from './books-per-month-by-year-chart';

describe('BooksPerMonthByYearChart', () => {
  let component: BooksPerMonthByYearChart;
  let fixture: ComponentFixture<BooksPerMonthByYearChart>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BooksPerMonthByYearChart],
    }).compileComponents();

    fixture = TestBed.createComponent(BooksPerMonthByYearChart);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
