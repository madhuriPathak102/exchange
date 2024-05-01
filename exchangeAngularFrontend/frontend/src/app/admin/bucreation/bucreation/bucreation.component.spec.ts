import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BucreationComponent } from './bucreation.component';

describe('BucreationComponent', () => {
  let component: BucreationComponent;
  let fixture: ComponentFixture<BucreationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BucreationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BucreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
