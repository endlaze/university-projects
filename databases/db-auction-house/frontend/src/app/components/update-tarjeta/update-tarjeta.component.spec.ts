import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateTarjetaComponent } from './update-tarjeta.component';

describe('UpdateTarjetaComponent', () => {
  let component: UpdateTarjetaComponent;
  let fixture: ComponentFixture<UpdateTarjetaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateTarjetaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateTarjetaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
