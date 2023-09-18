import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewPizzaComponent } from './new-pizza.component';

describe('NewPizzaComponent', () => {
  let component: NewPizzaComponent;
  let fixture: ComponentFixture<NewPizzaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewPizzaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewPizzaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
