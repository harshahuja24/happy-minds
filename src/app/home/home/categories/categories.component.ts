import { Component } from '@angular/core';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent {
  books = [
    {
      image: '../../assets/book1.jpg',
      title: 'Harry Potter',
      description: 'A magical journey through the wizarding world.'
    },
    {
      image: '../../assets/book2.jpg',
      title: 'Harry Potter 2',
      description: 'The adventure continues with new challenges.'
    }
  ];

  songs = [
    {
      image: '../../assets/song1.jpg',
      title: 'Song 1',
      description: 'An uplifting track to inspire your day.'
    },
    {
      image: '../../assets/song2.jpg',
      title: 'Song 2',
      description: 'A motivational anthem for achieving greatness.'
    }
  ];
}