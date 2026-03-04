import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MultiRowCarousel } from './multi-row-carousel';

describe('MultiRowCarousel', () => {
  let component: MultiRowCarousel;
  let fixture: ComponentFixture<MultiRowCarousel>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MultiRowCarousel],
    }).compileComponents();

    fixture = TestBed.createComponent(MultiRowCarousel);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
