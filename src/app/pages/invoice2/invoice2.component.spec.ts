import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Invoice2Component } from './invoice2.component';

describe('Invoice2Component', () => {
  let component: Invoice2Component;
  let fixture: ComponentFixture<Invoice2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Invoice2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Invoice2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
