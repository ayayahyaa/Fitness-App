import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CtrlError } from './ctrl-error';

describe('CtrlError', () => {
  let component: CtrlError;
  let fixture: ComponentFixture<CtrlError>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CtrlError],
    }).compileComponents();

    fixture = TestBed.createComponent(CtrlError);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
