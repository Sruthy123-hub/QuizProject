import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Assesment5Component } from './assesment5.component';

describe('Assesment5Component', () => {
  let component: Assesment5Component;
  let fixture: ComponentFixture<Assesment5Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Assesment5Component]
    });
    fixture = TestBed.createComponent(Assesment5Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
