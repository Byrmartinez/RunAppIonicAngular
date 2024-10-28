import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SignupRiderPage } from './signup-rider.page';

describe('SignupRiderPage', () => {
  let component: SignupRiderPage;
  let fixture: ComponentFixture<SignupRiderPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SignupRiderPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
