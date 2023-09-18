import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MoviesLibraryComponent } from './movies-library.component';

describe('MoviesLibraryComponent', () => {
  let component: MoviesLibraryComponent;
  let fixture: ComponentFixture<MoviesLibraryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MoviesLibraryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MoviesLibraryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
