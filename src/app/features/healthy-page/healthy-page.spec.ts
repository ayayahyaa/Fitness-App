import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HealthyPage } from './healthy-page';

describe('HealthyPage', () => {
  let component: HealthyPage;
  let fixture: ComponentFixture<HealthyPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HealthyPage],
    }).compileComponents();

    fixture = TestBed.createComponent(HealthyPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
