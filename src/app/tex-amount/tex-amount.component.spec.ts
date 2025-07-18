import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TexAmountComponent } from './tex-amount.component';

describe('TexAmountComponent', () => {
  let component: TexAmountComponent;
  let fixture: ComponentFixture<TexAmountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TexAmountComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TexAmountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
