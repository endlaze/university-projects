import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewStockPizzaComponent } from './new-stock-pizza.component';

describe('NewStockPizzaComponent', () => {
  let component: NewStockPizzaComponent;
  let fixture: ComponentFixture<NewStockPizzaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewStockPizzaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewStockPizzaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
