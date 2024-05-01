import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RolelistComponent } from './rolelist.component';

describe('RolelistComponent', () => {
  let component: RolelistComponent;
  let fixture: ComponentFixture<RolelistComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RolelistComponent]
    });
    fixture = TestBed.createComponent(RolelistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
