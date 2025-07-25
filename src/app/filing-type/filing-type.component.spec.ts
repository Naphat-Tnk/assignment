import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilingTypeComponent } from './filing-type.component';

describe('FilingTypeComponent', () => {
  let component: FilingTypeComponent;
  let fixture: ComponentFixture<FilingTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FilingTypeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FilingTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
