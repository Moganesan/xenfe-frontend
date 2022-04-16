import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExcelImportTestComponent } from './excel-import-test.component';

describe('ExcelImportTestComponent', () => {
  let component: ExcelImportTestComponent;
  let fixture: ComponentFixture<ExcelImportTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExcelImportTestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExcelImportTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
