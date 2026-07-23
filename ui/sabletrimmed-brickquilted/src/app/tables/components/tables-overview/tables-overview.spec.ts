import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablesOverview } from './tables-overview';

describe('TablesOverview', () => {
  let component: TablesOverview;
  let fixture: ComponentFixture<TablesOverview>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TablesOverview],
    }).compileComponents();

    fixture = TestBed.createComponent(TablesOverview);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
