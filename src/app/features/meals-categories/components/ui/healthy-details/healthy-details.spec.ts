import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HealthyDetails } from './healthy-details';

describe('HealthyDetails', () => {
  let component: HealthyDetails;
  let fixture: ComponentFixture<HealthyDetails>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HealthyDetails],
    }).compileComponents();

    fixture = TestBed.createComponent(HealthyDetails);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
