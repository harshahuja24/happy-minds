import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeroCarouselComponent } from './hero-carousel.component';

describe('HeroCarouselComponent', () => {
  let component: HeroCarouselComponent;
  let fixture: ComponentFixture<HeroCarouselComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HeroCarouselComponent] // Ensure the component is declared here
    });
    fixture = TestBed.createComponent(HeroCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy(); // Fix typo: `toBeTruth()` -> `toBeTruthy()`
  });
});
