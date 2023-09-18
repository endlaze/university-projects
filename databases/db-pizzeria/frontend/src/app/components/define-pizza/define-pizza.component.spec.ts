import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DefinePizzaComponent } from './define-pizza.component';

describe('DefinePizzaComponent', () => {
  let component: DefinePizzaComponent;
  let fixture: ComponentFixture<DefinePizzaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DefinePizzaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DefinePizzaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
