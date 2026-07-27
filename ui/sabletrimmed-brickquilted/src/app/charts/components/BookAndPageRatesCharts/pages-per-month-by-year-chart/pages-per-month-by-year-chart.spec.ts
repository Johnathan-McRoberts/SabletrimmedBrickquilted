import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PagesPerMonthByYearChart } from './pages-per-month-by-year-chart';

describe('PagesPerMonthByYearChart', () => {
  let component: PagesPerMonthByYearChart;
  let fixture: ComponentFixture<PagesPerMonthByYearChart>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PagesPerMonthByYearChart],
    }).compileComponents();

    fixture = TestBed.createComponent(PagesPerMonthByYearChart);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
