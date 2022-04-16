import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuotationTemplateViewComponent } from './quotation-template-view.component';

describe('QuotationTemplateViewComponent', () => {
  let component: QuotationTemplateViewComponent;
  let fixture: ComponentFixture<QuotationTemplateViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuotationTemplateViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuotationTemplateViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
