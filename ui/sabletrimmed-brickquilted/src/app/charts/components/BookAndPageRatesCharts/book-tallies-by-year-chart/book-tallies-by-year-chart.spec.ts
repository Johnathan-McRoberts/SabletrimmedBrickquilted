import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookTalliesByYearChart } from './book-tallies-by-year-chart';

describe('BookTalliesByYearChart', () => {
  let component: BookTalliesByYearChart;
  let fixture: ComponentFixture<BookTalliesByYearChart>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookTalliesByYearChart],
    }).compileComponents();

    fixture = TestBed.createComponent(BookTalliesByYearChart);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
