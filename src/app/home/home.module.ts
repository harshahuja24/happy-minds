import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReccomendTestComponent } from './reccomend-test/reccomend-test.component';
import { HomeComponent } from './home/home.component';
import { QuizComponent } from './quiz/quiz.component';



@NgModule({
  declarations: [
    ReccomendTestComponent,
    HomeComponent,
    QuizComponent
  ],
  imports: [
    CommonModule
  ],
  exports:[
    QuizComponent
  ]
})
export class HomeModule { }
