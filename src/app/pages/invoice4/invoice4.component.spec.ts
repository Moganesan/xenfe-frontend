import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Invoice4Component } from './invoice4.component';

describe('Invoice4Component', () => {
  let component: Invoice4Component;
  let fixture: ComponentFixture<Invoice4Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Invoice4Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Invoice4Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
