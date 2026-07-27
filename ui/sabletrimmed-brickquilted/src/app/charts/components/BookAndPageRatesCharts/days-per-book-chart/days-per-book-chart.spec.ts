import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DaysPerBookChart } from './days-per-book-chart';

describe('DaysPerBookChart', () => {
  let component: DaysPerBookChart;
  let fixture: ComponentFixture<DaysPerBookChart>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DaysPerBookChart],
    }).compileComponents();

    fixture = TestBed.createComponent(DaysPerBookChart);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
