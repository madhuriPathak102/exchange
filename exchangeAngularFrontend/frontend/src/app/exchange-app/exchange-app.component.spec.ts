import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExchangeAppComponent } from './exchange-app.component';

describe('ExchangeAppComponent', () => {
  let component: ExchangeAppComponent;
  let fixture: ComponentFixture<ExchangeAppComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ExchangeAppComponent]
    });
    fixture = TestBed.createComponent(ExchangeAppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
