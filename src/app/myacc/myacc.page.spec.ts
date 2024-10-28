import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MyaccPage } from './myacc.page';

describe('MyaccPage', () => {
  let component: MyaccPage;
  let fixture: ComponentFixture<MyaccPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(MyaccPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
