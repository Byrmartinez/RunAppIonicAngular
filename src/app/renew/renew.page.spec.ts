import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RenewPage } from './renew.page';

describe('RenewPage', () => {
  let component: RenewPage;
  let fixture: ComponentFixture<RenewPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(RenewPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
