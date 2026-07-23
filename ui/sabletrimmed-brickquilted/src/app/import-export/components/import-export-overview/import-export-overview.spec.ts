import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportExportOverview } from './import-export-overview';

describe('ImportExportOverview', () => {
  let component: ImportExportOverview;
  let fixture: ComponentFixture<ImportExportOverview>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImportExportOverview],
    }).compileComponents();

    fixture = TestBed.createComponent(ImportExportOverview);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
