import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Assesment1Component } from './assesment1.component';

describe('Assesment1Component', () => {
  let component: Assesment1Component;
  let fixture: ComponentFixture<Assesment1Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Assesment1Component]
    });
    fixture = TestBed.createComponent(Assesment1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
