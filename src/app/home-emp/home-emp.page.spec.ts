import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeEmpPage } from './home-emp.page';

describe('HomeEmpPage', () => {
  let component: HomeEmpPage;
  let fixture: ComponentFixture<HomeEmpPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeEmpPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
