import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadBooks } from './read-books';

describe('ReadBooks', () => {
  let component: ReadBooks;
  let fixture: ComponentFixture<ReadBooks>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReadBooks],
    }).compileComponents();

    fixture = TestBed.createComponent(ReadBooks);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
