import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgFor } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgFor, RouterModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  currentSlideIndex = 0;

  slides = [
    { image: 'carousel/borda.jpg' },
    { image: 'carousel/hamburger.jpg' },
    { image: 'carousel/husvetital.jpg' },
    { image: 'carousel/pizza.jpg' },
    { image: 'carousel/sultestal.jpg' },
  ];

  private slideInterval: any;

  ngOnInit() {
    this.slideInterval = setInterval(() => {
      this.nextSlide();
    }, 3000);
  }

  ngOnDestroy() {
    if (this.slideInterval) {
      clearInterval(this.slideInterval);
    }
  }

  prevSlide() {
    this.currentSlideIndex =
      this.currentSlideIndex > 0
        ? this.currentSlideIndex - 1
        : this.slides.length - 1;
  }

  nextSlide() {
    this.currentSlideIndex =
      this.currentSlideIndex < this.slides.length - 1
        ? this.currentSlideIndex + 1
        : 0;
  }
}
