import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrencyWarningComponent } from './currency-warning.component';

describe('CurrencyWarningComponent', () => {
  let component: CurrencyWarningComponent;
  let fixture: ComponentFixture<CurrencyWarningComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CurrencyWarningComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrencyWarningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
