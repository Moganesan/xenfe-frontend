import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnbilledProductsComponent } from './unbilled-products.component';

describe('UnbilledProductsComponent', () => {
  let component: UnbilledProductsComponent;
  let fixture: ComponentFixture<UnbilledProductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UnbilledProductsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UnbilledProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
