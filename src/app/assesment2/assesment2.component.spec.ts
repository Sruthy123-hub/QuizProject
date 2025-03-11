import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Assesment2Component } from './assesment2.component';

describe('Assesment2Component', () => {
  let component: Assesment2Component;
  let fixture: ComponentFixture<Assesment2Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Assesment2Component]
    });
    fixture = TestBed.createComponent(Assesment2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
