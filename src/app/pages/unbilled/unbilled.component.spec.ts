import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnbilledComponent } from './unbilled.component';

describe('UnbilledComponent', () => {
  let component: UnbilledComponent;
  let fixture: ComponentFixture<UnbilledComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UnbilledComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UnbilledComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
