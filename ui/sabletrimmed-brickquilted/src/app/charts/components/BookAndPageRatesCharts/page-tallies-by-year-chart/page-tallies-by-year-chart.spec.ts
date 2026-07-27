import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageTalliesByYearChart } from './page-tallies-by-year-chart';

describe('PageTalliesByYearChart', () => {
  let component: PageTalliesByYearChart;
  let fixture: ComponentFixture<PageTalliesByYearChart>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PageTalliesByYearChart],
    }).compileComponents();

    fixture = TestBed.createComponent(PageTalliesByYearChart);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
