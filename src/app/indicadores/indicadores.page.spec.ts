import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IndicadoresPage } from './indicadores.page';

describe('IndicadoresPage', () => {
  let component: IndicadoresPage;
  let fixture: ComponentFixture<IndicadoresPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(IndicadoresPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
