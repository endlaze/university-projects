import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewSaladComponent } from './new-salad.component';

describe('NewSaladComponent', () => {
  let component: NewSaladComponent;
  let fixture: ComponentFixture<NewSaladComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewSaladComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewSaladComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
