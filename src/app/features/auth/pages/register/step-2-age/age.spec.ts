import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Age } from './age';

describe('Age', () => {
  let component: Age;
  let fixture: ComponentFixture<Age>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Age],
    }).compileComponents();

    fixture = TestBed.createComponent(Age);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
