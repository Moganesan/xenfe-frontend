import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Invoice3Component } from './invoice3.component';

describe('Invoice3Component', () => {
  let component: Invoice3Component;
  let fixture: ComponentFixture<Invoice3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Invoice3Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Invoice3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
