import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBookStepper } from './add-book-stepper';

describe('AddBookStepper', () => {
  let component: AddBookStepper;
  let fixture: ComponentFixture<AddBookStepper>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddBookStepper],
    }).compileComponents();

    fixture = TestBed.createComponent(AddBookStepper);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
