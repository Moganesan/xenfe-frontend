import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Invoice1Component } from './invoice1.component';

describe('Invoice1Component', () => {
  let component: Invoice1Component;
  let fixture: ComponentFixture<Invoice1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Invoice1Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Invoice1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
