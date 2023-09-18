import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RelatedAccountsListComponent } from './related-accounts-list.component';

describe('RelatedAccountsListComponent', () => {
  let component: RelatedAccountsListComponent;
  let fixture: ComponentFixture<RelatedAccountsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RelatedAccountsListComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RelatedAccountsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
