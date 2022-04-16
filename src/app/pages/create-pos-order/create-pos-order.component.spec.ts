import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePosOrderComponent } from './create-pos-order.component';

describe('CreatePosOrderComponent', () => {
  let component: CreatePosOrderComponent;
  let fixture: ComponentFixture<CreatePosOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreatePosOrderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatePosOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
