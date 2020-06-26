import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MySharesTableComponent } from './my-shares-table.component';

describe('MySharesTableComponent', () => {
  let component: MySharesTableComponent;
  let fixture: ComponentFixture<MySharesTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MySharesTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MySharesTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
