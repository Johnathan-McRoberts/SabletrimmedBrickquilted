import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartsOverview } from './charts-overview';

describe('ChartsOverview', () => {
  let component: ChartsOverview;
  let fixture: ComponentFixture<ChartsOverview>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChartsOverview],
    }).compileComponents();

    fixture = TestBed.createComponent(ChartsOverview);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
