import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BackorderViewComponent } from './backorder-view.component';

describe('BackorderViewComponent', () => {
  let component: BackorderViewComponent;
  let fixture: ComponentFixture<BackorderViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BackorderViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BackorderViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
