import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliverychallanListComponent } from './deliverychallan-list.component';

describe('DeliverychallanListComponent', () => {
  let component: DeliverychallanListComponent;
  let fixture: ComponentFixture<DeliverychallanListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeliverychallanListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeliverychallanListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
