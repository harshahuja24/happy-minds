import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReccomendTestComponent } from './reccomend-test/reccomend-test.component';
import { HomeComponent } from './home/home.component';



@NgModule({
  declarations: [
    ReccomendTestComponent,
    HomeComponent
  ],
  imports: [
    CommonModule
  ]
})
export class HomeModule { }
