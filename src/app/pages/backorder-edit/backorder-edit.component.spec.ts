import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BackorderEditComponent } from './backorder-edit.component';

describe('BackorderEditComponent', () => {
  let component: BackorderEditComponent;
  let fixture: ComponentFixture<BackorderEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BackorderEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BackorderEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
