import { Component } from '@angular/core';

@Component({
  selector: 'app-hero-carousel',
  templateUrl: './hero-carousel.component.html',
  styleUrls: ['./hero-carousel.component.css']
})
export class HeroCarouselComponent {
  images = [
    '../../assets/Slide1.jpg',
    '../../assets/Slide2.jpg',
    '../../assets/Slide3.jpg',
  ];
}