import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SignupEmpPage } from './signup-emp.page';

describe('SignupEmpPage', () => {
  let component: SignupEmpPage;
  let fixture: ComponentFixture<SignupEmpPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SignupEmpPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
