import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PagesPerBookChart } from './pages-per-book-chart';

describe('PagesPerBookChart', () => {
  let component: PagesPerBookChart;
  let fixture: ComponentFixture<PagesPerBookChart>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PagesPerBookChart],
    }).compileComponents();

    fixture = TestBed.createComponent(PagesPerBookChart);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
