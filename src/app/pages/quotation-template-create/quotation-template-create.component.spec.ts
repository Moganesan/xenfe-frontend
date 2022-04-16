import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuotationTemplateCreateComponent } from './quotation-template-create.component';

describe('QuotationTemplateCreateComponent', () => {
  let component: QuotationTemplateCreateComponent;
  let fixture: ComponentFixture<QuotationTemplateCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuotationTemplateCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuotationTemplateCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
