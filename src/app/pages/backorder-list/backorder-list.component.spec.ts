import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BackorderListComponent } from './backorder-list.component';

describe('BackorderListComponent', () => {
  let component: BackorderListComponent;
  let fixture: ComponentFixture<BackorderListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BackorderListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BackorderListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
