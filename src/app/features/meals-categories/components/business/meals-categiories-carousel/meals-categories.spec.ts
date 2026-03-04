import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MealsCategories } from './meals-categories';

describe('MealsCategories', () => {
  let component: MealsCategories;
  let fixture: ComponentFixture<MealsCategories>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MealsCategories],
    }).compileComponents();

    fixture = TestBed.createComponent(MealsCategories);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
