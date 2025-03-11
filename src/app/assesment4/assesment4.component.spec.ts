import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Assesment4Component } from './assesment4.component';

describe('Assesment4Component', () => {
  let component: Assesment4Component;
  let fixture: ComponentFixture<Assesment4Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Assesment4Component]
    });
    fixture = TestBed.createComponent(Assesment4Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
