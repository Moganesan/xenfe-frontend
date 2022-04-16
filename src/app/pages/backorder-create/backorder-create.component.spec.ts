import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BackorderCreateComponent } from './backorder-create.component';

describe('BackorderCreateComponent', () => {
  let component: BackorderCreateComponent;
  let fixture: ComponentFixture<BackorderCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BackorderCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BackorderCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
