import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LibraryTabsComponent } from './library-tabs.component';

describe('LibraryTabsComponent', () => {
  let component: LibraryTabsComponent;
  let fixture: ComponentFixture<LibraryTabsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LibraryTabsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LibraryTabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
