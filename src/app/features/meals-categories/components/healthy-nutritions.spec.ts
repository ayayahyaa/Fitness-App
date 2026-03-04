import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HealthyNutritions } from './healthy-nutritions';

describe('HealthyNutritions', () => {
  let component: HealthyNutritions;
  let fixture: ComponentFixture<HealthyNutritions>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HealthyNutritions],
    }).compileComponents();

    fixture = TestBed.createComponent(HealthyNutritions);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
