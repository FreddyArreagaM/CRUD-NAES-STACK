import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TarjetacreditoComponent } from './tarjetacredito.component';

describe('TarjetacreditoComponent', () => {
  let component: TarjetacreditoComponent;
  let fixture: ComponentFixture<TarjetacreditoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TarjetacreditoComponent]
    });
    fixture = TestBed.createComponent(TarjetacreditoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
