import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Caursoul } from './caursoul';

describe('Caursoul', () => {
  let component: Caursoul;
  let fixture: ComponentFixture<Caursoul>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Caursoul],
    }).compileComponents();

    fixture = TestBed.createComponent(Caursoul);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
