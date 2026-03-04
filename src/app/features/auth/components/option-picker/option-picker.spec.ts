import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OptionPicker } from './option-picker';

describe('OptionPicker', () => {
  let component: OptionPicker;
  let fixture: ComponentFixture<OptionPicker>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OptionPicker],
    }).compileComponents();

    fixture = TestBed.createComponent(OptionPicker);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
