import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllSharesTableComponent } from './all-shares-table.component';

describe('AllSharesTableComponent', () => {
  let component: AllSharesTableComponent;
  let fixture: ComponentFixture<AllSharesTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllSharesTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllSharesTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
