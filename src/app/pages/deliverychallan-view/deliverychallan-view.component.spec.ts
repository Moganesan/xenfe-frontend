import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliverychallanViewComponent } from './deliverychallan-view.component';

describe('DeliverychallanViewComponent', () => {
  let component: DeliverychallanViewComponent;
  let fixture: ComponentFixture<DeliverychallanViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeliverychallanViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeliverychallanViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
