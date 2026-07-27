import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OverallTalliesChart } from './overall-tallies-chart';

describe('OverallTalliesChart', () => {
  let component: OverallTalliesChart;
  let fixture: ComponentFixture<OverallTalliesChart>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OverallTalliesChart],
    }).compileComponents();

    fixture = TestBed.createComponent(OverallTalliesChart);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
