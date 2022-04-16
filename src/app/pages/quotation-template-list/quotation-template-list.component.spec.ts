import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuotationTemplateListComponent } from './quotation-template-list.component';

describe('QuotationTemplateListComponent', () => {
  let component: QuotationTemplateListComponent;
  let fixture: ComponentFixture<QuotationTemplateListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuotationTemplateListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuotationTemplateListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
