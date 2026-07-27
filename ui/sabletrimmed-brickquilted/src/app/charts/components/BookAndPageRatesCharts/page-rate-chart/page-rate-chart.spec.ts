import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageRateChart } from './page-rate-chart';

describe('PageRateChart', () => {
  let component: PageRateChart;
  let fixture: ComponentFixture<PageRateChart>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PageRateChart],
    }).compileComponents();

    fixture = TestBed.createComponent(PageRateChart);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
