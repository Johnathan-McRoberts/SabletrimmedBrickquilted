import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExportToDoc } from './export-to-doc';

describe('ExportToDoc', () => {
  let component: ExportToDoc;
  let fixture: ComponentFixture<ExportToDoc>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExportToDoc],
    }).compileComponents();

    fixture = TestBed.createComponent(ExportToDoc);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
