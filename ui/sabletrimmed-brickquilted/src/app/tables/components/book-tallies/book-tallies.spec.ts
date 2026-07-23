import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookTallies } from './book-tallies';

describe('BookTallies', () => {
  let component: BookTallies;
  let fixture: ComponentFixture<BookTallies>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookTallies],
    }).compileComponents();

    fixture = TestBed.createComponent(BookTallies);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
