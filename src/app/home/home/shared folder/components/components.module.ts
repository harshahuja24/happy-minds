import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { HeroCarouselComponent } from '../../hero-carousel/hero-carousel.component';
import { BooksComponent } from '../../books/books.component';
import { SongsComponent } from '../../songs/songs.component';



@NgModule({
  declarations: [
    NavbarComponent,
    HeroCarouselComponent,
    BooksComponent,
    SongsComponent
  ],
  imports: [
    CommonModule
  ]
})
export class ComponentsModule { }
