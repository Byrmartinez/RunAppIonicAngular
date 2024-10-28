import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WalletEmpPage } from './wallet-emp.page';

describe('WalletEmpPage', () => {
  let component: WalletEmpPage;
  let fixture: ComponentFixture<WalletEmpPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(WalletEmpPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
