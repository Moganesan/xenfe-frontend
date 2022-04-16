import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SimpleTestPageComponent } from './simple-test-page.component';

describe('SimpleTestPageComponent', () => {
  let component: SimpleTestPageComponent;
  let fixture: ComponentFixture<SimpleTestPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SimpleTestPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SimpleTestPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
