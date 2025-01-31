import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReccomendTestComponent } from './reccomend-test.component';

describe('ReccomendTestComponent', () => {
  let component: ReccomendTestComponent;
  let fixture: ComponentFixture<ReccomendTestComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReccomendTestComponent]
    });
    fixture = TestBed.createComponent(ReccomendTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
