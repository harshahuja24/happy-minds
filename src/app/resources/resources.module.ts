import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BooksComponent } from './books/books.component';
import { SongsComponent } from './songs/songs.component';
import { VideosComponent } from './videos/videos.component';

const routes: Routes = [
  { path: 'books', component: BooksComponent },
  { path: 'songs', component: SongsComponent },
  { path: 'videos', component: VideosComponent },
  { path: '', redirectTo: 'books', pathMatch: 'full' }, // Default page
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MediaRoutingModule { }
