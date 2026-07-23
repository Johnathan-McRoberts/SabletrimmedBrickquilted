import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormsOverview } from './forms-overview';

describe('FormsOverview', () => {
  let component: FormsOverview;
  let fixture: ComponentFixture<FormsOverview>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsOverview],
    }).compileComponents();

    fixture = TestBed.createComponent(FormsOverview);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
