import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FirstloadPage } from './firstload.page';

describe('FirstloadPage', () => {
  let component: FirstloadPage;
  let fixture: ComponentFixture<FirstloadPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(FirstloadPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
